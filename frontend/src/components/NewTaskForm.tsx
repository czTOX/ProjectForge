import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { NewTask } from '../models';
import { TasksApi } from '../services';

/**
 * Interface for NewTaskForm component
 *
 * @interface NewTaskFormInterface
 * @typedef {NewTaskFormInterface}
 */
interface NewTaskFormInterface {
  projectId: string,
  setOpened: Function,
}


/**
 * NewTaskForm component
 *
 * @param {NewTaskFormInterface} props
 * @returns {*}
 */
const NewTaskForm: FC<NewTaskFormInterface> = (props: NewTaskFormInterface) => {
  const navigate = useNavigate();

  const { mutate: createTask } = useMutation({
    mutationFn: (body: NewTask) => TasksApi.createTask({...body, projectId: props.projectId}),
    onSuccess: (res) => {
      navigate(`/tasks/${res.data.id}`);
    },
  });

  const { register, handleSubmit } = useForm<NewTask>();
  const onSubmit = (data: NewTask) => createTask(data);

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


export default NewTaskForm;