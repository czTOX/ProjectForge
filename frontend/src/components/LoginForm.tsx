import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { UserLogin } from '../models';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UsersApi } from '../services';

const LoginForm: FC = () => {
  const navigate = useNavigate();

  const { mutate: loginUser } = useMutation({
    mutationFn: (body: UserLogin) => UsersApi.loginUser(body),
    onSuccess: () => {
      console.log('User login successful!');
      navigate(`/`);
    },
  });
  
  const { register, handleSubmit } = useForm<UserLogin>();
  const onSubmit = (data: UserLogin) => loginUser(data);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__input">
        <input type='text' name='user' placeholder='Username' />
      </div>
      <div className="form__input">
        <input type='text' name='password' placeholder='Password' />
      </div>
      <button className='form__button text-bold' type='submit'>Login</button>
    </form>
  );
}


export default LoginForm;