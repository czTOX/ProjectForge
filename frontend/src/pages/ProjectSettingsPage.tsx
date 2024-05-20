import { useMutation, useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProjectsApi } from '../services';
import { useForm } from 'react-hook-form';
import { EditProject } from '../models';


const ProjectSettingPage: FC = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: project } = useQuery({
    queryKey: ['getProject', id],
    queryFn: () => ProjectsApi.getSingle(id!),
    enabled: !!id,
  });

  const { mutate: editSettings } = useMutation({
    mutationFn: (body: EditProject) => ProjectsApi.editProject(id || '', {...body}),
    onSuccess: (res) => {
      navigate(`/projects/${res.data.id}`);
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const { register, handleSubmit } = useForm<EditProject>({defaultValues: {
    name: project?.data.name,
    description: project?.data.description,
    budget: project?.data.budget,
    deadline: (project?.data.deadline && new Date(project?.data.deadline)),
    active: project?.data.active,
  }});
  const onSubmit = (data: EditProject) => editSettings(data);

  return (
    <div className="container task__page">
    <h1 className="heading"><Link to={`/projects/${id}`} className="heading">{project?.data.name}</Link> settings</h1>
    <div className="divider"></div>
    <h2 className="heading">Edit settings</h2>
    <div className="divider--small"></div>
    <div className="settings__form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input">
          <label htmlFor="name" className="text-regular">Name:</label>
          <input key='name' type='text' placeholder='Name' defaultValue={project?.data.name} {...register('name', { required: true })} />
        </div>
        <div className="form__input">
          <label htmlFor="desc" className="text-regular">Description:</label>
          <input key='desc' type='text' placeholder='Description' defaultValue={project?.data.description} {...register('description', { required: false })} />
        </div>
        <div className="form__input">
          <label htmlFor="budget" className="text-regular">Budget:</label>
          <input key='budget' type='number' placeholder='Budget' defaultValue={project?.data.budget} {...register('budget', { required: false })} />
        </div>
        <div className="form__input">
          <label htmlFor="deadline" className="text-regular">Deadline:</label>
          <input key='deadline' type='date' placeholder='Name' defaultValue={project?.data.deadline && new Date(project?.data.deadline).toISOString().split('T')[0]} {...register('deadline', { required: false })} />
        </div>
        <div className="form__input">
          <label htmlFor="deadline" className="text-regular">Active:</label>
          <div className="switch__input">
            <label className="switch">
              <input key='deadline' type='checkbox' placeholder='active' defaultChecked={project?.data.active} {...register('active', { required: false })} />
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

export default ProjectSettingPage;