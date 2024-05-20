import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserSettingsForm, UserSettings } from '../models';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UsersApi } from '../services';


const SettingsPage: FC = () => {
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => UsersApi.getSingle(),
  });

  const { mutate: editSettings } = useMutation({
    mutationFn: (body: UserSettings) => UsersApi.editSingle(body),
    onSuccess: (res) => {
      reset({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
      });
      navigate(`/user`);
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const { register, handleSubmit, reset } = useForm<UserSettingsForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    values: {
      firstName: user?.data.firstName || '',
      lastName: user?.data.lastName || '',
    }
  });
  
  const onSubmit = (data: UserSettingsForm) => {
    editSettings({
      firstName: data.firstName,
      lastName: data.lastName,
      profilePic: (data.picture ? data.picture[0] : undefined),
    })
  };

  return (
    <div className='main'>
      <div className="container task__page">
        <h1 className="heading">Profile settings</h1>
        <div className="divider"></div>
        <h2 className="heading">Edit settings</h2>
        <div className="divider--small"></div>
        <div className="settings__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input">
              <label htmlFor="firstName" className="text-regular">First name:</label>
              <input key='firstName' type='text' placeholder='First name' defaultValue={user?.data.firstName} {...register('firstName', { required: true, minLength: 1 })} />
            </div>
            <div className="form__input">
              <label htmlFor="lastName" className="text-regular">Last name:</label>
              <input key='lastName' type='text' placeholder='Last name' defaultValue={user?.data.lastName} {...register('lastName', { required: true, minLength: 1 })} />
            </div>
            <div className="form__input">
              <label htmlFor="profilePic" className="text-regular">Profile picture: </label>
              <input
                accept="image/*"
                key='picture'
                type="file"
                { ...register('picture', { required: false })}
              />
            </div>
            <div className="settings__submit">
              <button className='form__button text-bold' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;