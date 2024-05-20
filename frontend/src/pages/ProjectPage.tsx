import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProjectsApi } from '../services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isClose, projectProgress, projectTotalTime, readableDate } from '../functions/project';
import TaskLine from '../components/TaskLine';
import NewTaskForm from '../components/NewTaskForm';
import { CustomFile, Message, Task } from '../models';
import ProjectFileLine from '../components/ProjectFileLine';
import MessageBox from '../components/MessageBox';


/**
 * Project Page
 *
 * @returns {*}
 */
const ProjectPage: FC = () => {
  const { id } = useParams();
  const [ opened, setOpened ] = useState(false);

  const { data: project } = useQuery({
    queryKey: ['getProject', id],
    queryFn: () => ProjectsApi.getSingle(id!),
    enabled: !!id,
  });

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      let formData = new FormData();
      formData.append('projectId', id || '');
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('files', e.target.files[i], e.target.files[i].name);
      }
      sendFiles(formData);
    }
  };

  const { mutate: sendFiles } = useMutation({
    mutationFn: (body: FormData) => ProjectsApi.addFiles(body),
    onSuccess: (res) => {
      setFiles(res.data.files);
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (project?.data.files) {
      setFiles(project.data.files);
    }
    if (project?.data.tasks) {
      setTasks(project.data.tasks);
    }
    if (project?.data.messages) {
      setMessages(project.data.messages);
    }
  }, [project?.data]);

  useEffect(() => {
    let box = document.getElementById('messageLog');
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  }, [messages]);


  return (
    <div className="main">
      {opened && <NewTaskForm projectId={project?.data.id || ''} setOpened={setOpened} />}
      <div className="container project__page">
        <div className="subPage__header">
          <div>
            <h1 className="heading">{project?.data.name}</h1>
            <Link to={`/teams/${project?.data.team.id}`} className="text-regular header__team">{project?.data.team.name}</Link>
          </div>
          <div className="subPage__buttons">
            <button className='subPage__header--addNew text-bold' onClick={() => {setOpened(true);}}>+ Add new task</button>
            <Link to={`settings`} className='subPage__header--addNew text-bold'>Settings</Link>
          </div>
        </div>
        <div className="divider"></div>
        <div className="project__container">
          <div className="project__main">
            <p className="project__notes">
              {project?.data.description}
            </p>
            <div className="project__basicInfo">
              <span className="text-regular">Progress: <strong>{projectProgress(tasks)}%</strong></span>
              <span className="text-regular">Total time: <strong>{projectTotalTime(tasks)}</strong></span>
              <span className="text-regular">Budget: <strong>{project?.data.budget} Kč</strong></span>
              <span className='text-regular'>Deadline: <strong className={`${isClose(project?.data.deadline) && 'deadline--close'}`}>{project?.data.deadline ? readableDate(project?.data.deadline) : 'None'}</strong></span>
            </div>
            <h2 className="heading">Tasks</h2>
            <div className="divider--small"></div>
            <div className="divider--long"></div>
            <div className="project__tasks">
              {tasks.map((task) => (
                <TaskLine  key={`taskLine-${task.id}`} task={task} tasks={tasks} setTasks={setTasks} />
              ))}
            </div>
            <div className="files__heading">
              <h2 className="heading">Files</h2>
              <div>
                <label htmlFor="project__newFile" className="newFile__button text-bold">+ Upload files</label>
                <input id='project__newFile' name='files' type='file' multiple className="team__newFiles" onChange={handleFilesChange}/>
              </div>
            </div>
            <div className="divider--small"></div>
            <div className="project__files">
              {files.map((file) => (
                <ProjectFileLine file={file} files={files} setFiles={setFiles} />
              ))}
            </div>
          </div>
          <div className="project__sidebar">
            <MessageBox projectId={project?.data.id || ''} messages={messages} setMessages={setMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;