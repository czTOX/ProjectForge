import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { UserLogin } from '../models';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UsersApi } from '../services';


const LoginPage: FC = () => {
  const { mutate: loginUser } = useMutation({
    mutationFn: (body: UserLogin) => UsersApi.loginUser(body),
    onSuccess: () => {
      console.log('User login successful!');
      navigate(`/`);
    },
  });

  const { register, handleSubmit } = useForm<UserLogin>();
  const onSubmit = (data: UserLogin) => loginUser(data);
  const navigate = useNavigate();

  return (
    <>
      <div className="only-block__container">
        <div className="only-block">
          <h1 className="text-semibold">ProjectForge</h1>
          <div className="header-divider"></div>

        </div>
      </div>
    </>
  );
};


const loginForm: FC = () => {
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="nickname">Nickname:</label>
      <input type='text' name='nickname'></input>
      <br />
      <label htmlFor="password">Password:</label>
      <input type='text' name='password'></input>
    </form>
  );
}

const registerForm: FC = () => {
  return (
    <>
    </>
  );
}

export default LoginPage;