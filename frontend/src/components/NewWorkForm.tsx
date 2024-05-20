import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { NewTaskWork, NewTaskWorkData, TaskWorkWithUser } from '../models';
import { TasksApi } from '../services';
import { calcutalTotalTime } from '../functions/project';

interface NewWorkFormInterface {
  taskId: string,
  workHistory: TaskWorkWithUser[],
  setWorkHistory: Function,
  setTimeSpent: Function,
  setOpened: Function,
}


const NewWorkForm: FC<NewWorkFormInterface> = (props: NewWorkFormInterface) => {
  const { mutate: postTaskWork } = useMutation({
    mutationFn: (body: NewTaskWork) => TasksApi.postTaskWork(body),
    onSuccess: (res) => {
      props.setWorkHistory([res.data, ...props.workHistory]);
      props.setTimeSpent(calcutalTotalTime([res.data, ...props.workHistory]));
      props.setOpened(false);
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const { register, handleSubmit } = useForm<NewTaskWorkData>();
  const onSubmit = (data: NewTaskWorkData) => ((data.hours + data.minutes) > 0 ?
    postTaskWork({
      taskId: props.taskId,
      secondsSpent: (data.hours * 3600 + data.minutes * 60)
    })
    :
    alert('Please input a valid time!')
  );

  return (
    <div className="fullscreanBG">
      <div className="newProjectPopup">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__joinedInput">
            <input type='text' pattern="[0-9]{0,2}" placeholder='hh' {...register('hours', { required: false, min: 0, max: 99 })}/>
            <span className="text-regular">:</span>
            <input type='text' pattern="[0-9]{0,2}" placeholder='mm' {...register('minutes', { required: false, min: 0, max: 99 })}/>
          </div>
          <div className="newProjectPopup__buttons">
            <button className='form__button text-bold' onClick={() => {props.setOpened(false);}}>Back</button>
            <button className='form__button text-bold' type='submit'>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default NewWorkForm;