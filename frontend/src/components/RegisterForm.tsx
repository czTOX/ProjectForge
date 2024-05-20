import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { UserRegistration } from '../models';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UsersApi } from '../services';
import { useSetRecoilState } from 'recoil';
import { loggedInAtom } from '../state/atoms';

const RegisterForm: FC = () => {
  const setLoggedIn = useSetRecoilState(loggedInAtom);
  const navigate = useNavigate();

  const { mutate: registerUser } = useMutation({
    mutationFn: (body: UserRegistration) => UsersApi.registerUser(body),
    onSuccess: () => {
      console.log('User registration successful!');
      setLoggedIn(true);
      navigate('/user');
    },
    onError: () => {
      alert("Email is already taken!");
    },
  });
  
  const { register, handleSubmit } = useForm<UserRegistration>();
  const onSubmit = (data: UserRegistration) => registerUser(data);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__input">
        <input type='text' placeholder='First name' {...register('firstName', { required: true })}/>
      </div>
      <div className="form__input">
        <input type='text' placeholder='Last name' {...register('lastName', { required: true })}/>
      </div>
      <div className="form__input">
        <input type='email' placeholder='Email' {...register('email', { required: true })}/>
      </div>
      <div className="form__input">
        <input type='password' placeholder='Password' name='password'/>
      </div>
      <div className="form__input">
        <input type='password' placeholder='Confirm password' {...register('hashedPassword', { required: true })}/>
      </div>
      <button className='form__button text-bold' type='submit'>Register</button>
    </form>
  );
}


export default RegisterForm;