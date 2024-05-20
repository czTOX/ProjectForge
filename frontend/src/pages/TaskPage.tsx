import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TasksApi } from '../services';
import TimeController from '../components/TimeController';
import { TaskWorkWithUser } from '../models';
import TaskWorkLine from '../components/TaskWorkLine';
import { calcutalTotalTime, readableDate } from '../functions/project';
import NewWorkForm from '../components/NewWorkForm';
import { SERVER_URL } from '../variables';


const TaskPage: FC = () => {
  const { id } = useParams();

  const { data: task } = useQuery({
    queryKey: ['getTask', id],
    queryFn: () => TasksApi.getSingle(id!),
    enabled: !!id,
  });

  const [workHistory, setWorkHistory] = useState<TaskWorkWithUser[]>([]);
  const [timeSpent, setTimeSpent] = useState<string>('');

  useEffect(() => {
    if (task?.data.workHistory) {
      setWorkHistory(task?.data.workHistory);
      setTimeSpent(calcutalTotalTime(task?.data.workHistory || []))
    }
  }, [task]);

  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className="main">
      {opened && 
        <NewWorkForm taskId={task?.data.id || ''} workHistory={workHistory} setWorkHistory={setWorkHistory} setTimeSpent={setTimeSpent} setOpened={setOpened} />
      }
      <div className="container project__page task__page">
      <div className="subPage__header">
        <div>
          <h1 className="heading">{task?.data.name}</h1>
          <Link to={`/projects/${task?.data.project.id}`} className="text-regular header__team">{task?.data.project.name}</Link>
        </div>
        <div className="subPage__buttons">
          <Link to={`settings`} className='subPage__header--addNew text-bold'>Settings</Link>
        </div>
      </div>
      <div className="divider"></div>
      <div className="task__info">
        <div className="task__asignee">
          <span className="text-regular">Assigned to: </span>
          {task?.data.user ?
            <div className="avatar--small" style={task?.data.user.profilePic ? {background: `url('${SERVER_URL}/profilePics/${task?.data.user.profilePic}')`} : {}}>
              {task?.data.user.profilePic ? '' : (task?.data.user.firstName[0] + task?.data.user.lastName[0])}
            </div>
            :
            <Link to={`settings`} className="avatar--small avatar--empty">+</Link>
          }
        </div>
        <span className="text-regular">Deadline: <strong className="taskLine__deadline--red">{task?.data.deadline ? readableDate(task?.data.deadline) : 'None'}</strong></span>
        <span className="text-regular">Total time spent: <i>{timeSpent}</i></span>
        <p className="project__notes text-regular">
          {task?.data.description}
        </p>
      </div>
      <div className="task__subheader">
        <h2 className="heading">Latest work</h2>
        <TimeController taskId={task?.data.id || ''} workHistory={workHistory} setWorkHistory={setWorkHistory} setTimeSpent={setTimeSpent} setOpened={setOpened} />
      </div>
      <div className="divider--small"></div>
      <div className="divider--long"></div>
      <div className="task__workHistory">
        {workHistory.map((work) => (
          <TaskWorkLine key={`workLine-${work.id}`} taskWork={work} workHistory={workHistory} setWorkHistory={setWorkHistory} setTimeSpent={setTimeSpent}></TaskWorkLine>
        ))}
      </div>
      </div>
    </div>
  );
};

export default TaskPage;