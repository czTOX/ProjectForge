import { FC } from 'react';
import { Task, TaskMin } from '../models';
import { Link } from 'react-router-dom';
import { calcutalTotalTime, readableDate } from '../functions/project';
import { TasksApi } from '../services';
import { useMutation } from '@tanstack/react-query';
import { SERVER_URL } from '../variables';


interface NewProjectFormInterface {
  task: Task,
  tasks: Task[] | undefined,
  setTasks: Function | undefined,
}

const TaskLine: FC<NewProjectFormInterface> = (props: NewProjectFormInterface) => {
  const { mutate: taskDone } = useMutation({
    mutationFn: () => TasksApi.checkedTask(props.task.id, !props.task.active),
    onSuccess: (res) => {
      let taskData: TaskMin = {
        id: res.data.id,
        name: res.data.name,
        active: res.data.active,
        deadline: res.data.deadline,
        workHistory: res.data.workHistory,
        user: res.data.user,
      };
      
      let newTasks: TaskMin[] = [];
      if (props.tasks && props.setTasks) {
        for (let i = 0; i < props.tasks.length; i++) {
          const x = props.tasks[i];
          if (x.id === taskData.id) {
            newTasks.push(taskData);
          } else {
            newTasks.push(x);
          }
        }
        props.setTasks(newTasks);
      }
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const hangleOnChange = () => taskDone();

  return (
    <div className="taskLine">
      <div className="taskLine__checkmark">
        <label className="customCheckbox">
          <input type="checkbox" checked={!props.task.active} onChange={hangleOnChange} />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="taskLine__taskName">
        <Link to={`/tasks/${props.task.id}`} className="text-bold">{props.task.name}</Link>
      </div>
      <div className="taskLine__asignee">
        <span className="text-regular">Assigned to: </span>
        {props.task.user ?
          <div className="avatar--small" style={props.task.user.profilePic ? {background: `url('${SERVER_URL}/profilePics/${props.task.user.profilePic}')`} : {}}>
            {props.task.user.profilePic ? '' : (props.task.user.firstName[0] + props.task.user.lastName[0])}
          </div>
          :
          <div className="avatar--small avatar--empty"></div>
        }
      </div>
      <div className="taskLine__time">
        <span className="text-regular">{calcutalTotalTime(props.task.workHistory)}</span>
      </div>
      <div className="taskLine__deadline">
        <span className="text-regular">Deadline: <strong className="taskLine__deadline--red">{props.task.deadline ? readableDate(props.task.deadline) : 'None'}</strong></span>
      </div>
    </div>
  );
}


export default TaskLine;