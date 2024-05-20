import { FC, useState } from 'react';
import { NewTaskWork, TaskWorkWithUser } from '../models';
import { TasksApi } from '../services';
import { useMutation } from '@tanstack/react-query';
import { useStopwatch } from 'react-timer-hook';
import { addLeadingZeros } from '../functions/timerController';
import { calcutalTotalTime } from '../functions/project';

/**
 * Interface for TimeController component
 *
 * @interface TimeControllerInterface
 * @typedef {TimeControllerInterface}
 */
interface TimeControllerInterface {
  taskId: string;
  workHistory: TaskWorkWithUser[];
  setWorkHistory: Function;
  setTimeSpent: Function;
  setOpened: Function;
}

/**
 * TimeController component
 *
 * @param {TimeControllerInterface} props
 * @returns {*}
 */
const TimeController: FC<TimeControllerInterface> = (props: TimeControllerInterface) => {

  function timerStop() {
    setTracking(false);
    timer.pause();
    timer.reset(undefined, false);
    postTaskWork({taskId: props.taskId, secondsSpent: timer.totalSeconds})
  }

  function timerPlayPause() {
    if (tracking) {
      if (timer.isRunning) {
        timer.pause();
      } else {
        timer.start();
      }
    } else {
      setTracking(true);
      timer.start();
    }
  }

  const timer = useStopwatch();

  const { mutate: postTaskWork } = useMutation({
    mutationFn: (body: NewTaskWork) => TasksApi.postTaskWork(body),
    onSuccess: (res) => {
      props.setWorkHistory([res.data, ...props.workHistory]);
      props.setTimeSpent(calcutalTotalTime([res.data, ...props.workHistory]))
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const [tracking, setTracking] = useState<boolean>(false);

  return (
    <div className="time__controller">
        <div className="controller__playPause" onClick={() => (timerPlayPause())}>
          {timer.isRunning ? 
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19M16 5V19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            :
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="#E5E5E5" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#000000" stroke-width="2" stroke-linejoin="round"/>
            </svg> 
          }
        </div>
        <button className={`controller__stop ${tracking ? 'controller__stop--active' : ''}`} disabled={!tracking} onClick={() => (timerStop())}></button>
        <span className="text-regular controller__time">{addLeadingZeros(timer.hours, 2) + ':' + addLeadingZeros(timer.minutes, 2) + ':' + addLeadingZeros(timer.seconds, 2)}</span>
        <div className="controller__addManually" onClick={() => (props.setOpened(true))}>
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
  );
}


export default TimeController;