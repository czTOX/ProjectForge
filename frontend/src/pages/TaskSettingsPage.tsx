import { useMutation, useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TasksApi } from '../services';
import { useForm } from 'react-hook-form';
import { EditTask } from '../models';


const TaskSettingsPage: FC = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: task } = useQuery({
    queryKey: ['getTask', id],
    queryFn: () => TasksApi.getSingle(id!),
    enabled: !!id,
  });

  const { mutate: editSettings } = useMutation({
    mutationFn: (body: EditTask) => TasksApi.editSingle({...body, id: id || '', active: !body.active}),
    onSuccess: (res) => {
      navigate(`/tasks/${res.data.id}`);
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const { register, handleSubmit } = useForm<EditTask>({defaultValues: {
    name: task?.data.name,
    description: task?.data.description,
    deadline: (task?.data.deadline && new Date(task?.data.deadline)),
    userId: task?.data.user && task?.data.user.id || null,
  }});
  
  const onSubmit = (data: EditTask) => editSettings(data);

  return (
    <div className="container task__page">
      <h1 className="heading"><Link to={`/tasks/${id}`} className="heading">{task?.data.name}</Link> settings</h1>
      <div className="divider"></div>
      <h2 className="heading">Edit settings</h2>
      <div className="divider--small"></div>
      <div className="settings__form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__input">
            <label htmlFor="name" className="text-regular">Name:</label>
            <input key='name' type='text' placeholder='Name' defaultValue={task?.data.name} {...register('name', { required: true })} />
          </div>
          <div className="form__input">
            <label htmlFor="desc" className="text-regular">Description:</label>
            <input key='desc' type='text' placeholder='Description' defaultValue={task?.data.description} {...register('description', { required: false })} />
          </div>
          <div className="form__input">
            <label htmlFor="deadline" className="text-regular">Deadline:</label>
            <input key='deadline' type='date' placeholder='Name' defaultValue={task?.data.deadline && new Date(task?.data.deadline).toISOString()} {...register('deadline', { required: false })} />
          </div>
          <div className="form__input">
            <label htmlFor="assignee" className="text-regular">Assigned to:</label>
            <div className="custom__select">
              <select {...register('userId', { required: false })}>
                <option value={undefined}>None</option>
                {task?.data.project.team.users.map((work) => (
                  <option value={work.user.id}>
                    {(work.user.firstName + ' ' + work.user.lastName)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form__input">
          <label htmlFor="deadline" className="text-regular">Finnished:</label>
          <div className="switch__input">
            <label className="switch">
              <input key='deadline' type='checkbox' placeholder='active' defaultChecked={!task?.data.active} {...register('active', { required: false })} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
          <div className="settings__submit">
            <button className='form__button text-bold' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskSettingsPage;