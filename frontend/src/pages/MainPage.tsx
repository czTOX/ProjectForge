import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UsersApi } from '../services';
import TaskLine from '../components/TaskLine';
import ProjectTile from '../components/ProjectTile';
import { Task } from '../models';


const MainPage: FC = () => {

  const { data: myAll } = useQuery({
    queryKey: ['myAll'],
    queryFn: () => UsersApi.getMyAll(),
  });

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (myAll?.data.assignedTo) {
      setTasks(myAll.data.assignedTo);
    }
  }, [myAll?.data]);

  return (
    <div className="container main__page">
      <h1 className="heading">My Page</h1>
      <div className="divider"></div>
      <h2 className="heading">My active tasks</h2>
      <div className="divider--small"></div>
      <div className="main__tasks">
        {tasks.map((task) => (
          <TaskLine task={task} tasks={tasks} setTasks={setTasks} key={`taskLine-${task.id}`} />
        ))}
      </div>
      <h2 className="heading">Active Projects</h2>
      <div className="divider--small"></div>
      <div className="main__projects">
        {myAll?.data.worksAt.map((work) => (
          work.team.projects.map((project) => (
            <ProjectTile teamName={work.team.name} key={`projectTile-${project.id}`} {...project} />
          ))
        ))}
      </div>
      <h2 className="heading">Teams</h2>
      <div className="divider--small"></div>
      <div className="main__teams">
        {myAll?.data.worksAt.map((work) => (
          <Link key={`team-${work.team.id}`} to={`/teams/${work.team.id}`} className="teamTile">
            <h4 className="text-bold">{work.team.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;