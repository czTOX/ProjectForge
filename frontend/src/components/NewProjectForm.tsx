import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewProject } from '../models';
import { ProjectsApi } from '../services';
import { useForm } from 'react-hook-form';

interface NewProjectFormInterface {
  teamId: string,
  setOpened: Function,
}


const NewProjectFrom: FC<NewProjectFormInterface> = (props: NewProjectFormInterface) => {
  const navigate = useNavigate();

  const { mutate: createProject } = useMutation({
    mutationFn: (body: NewProject) => ProjectsApi.createProject({...body, teamId: props.teamId}),
    onSuccess: (res) => {
      navigate(`/projects/${res.data.id}`);
    },
  });

  const { register, handleSubmit } = useForm<NewProject>();
  const onSubmit = (data: NewProject) => createProject(data);

  return (
    <div className="fullscreanBG">
      <div className="newProjectPopup">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__input">
            <input type='text' placeholder='Name' maxLength={16} {...register('name', { required: true })}/>
          </div>
          <div className="form__input">
            <input type='text' placeholder='Description' {...register('description', { required: false })}/>
          </div>
          <div className="form__input">
            <input type='number' placeholder='Budget' {...register('budget', { required: false })}/>
          </div>
          <div className="form__input form__input--date">
            <input type='date' placeholder='Deadline' {...register('deadline', { required: false })}/>
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


export default NewProjectFrom;