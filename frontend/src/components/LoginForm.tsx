import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { UserLogin } from '../models';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UsersApi } from '../services';
import { useSetRecoilState } from 'recoil';
import { loggedInAtom } from '../state/atoms';

/**
 * LoginForm component
 *
 * @returns {*}
 */
const LoginForm: FC = () => {
  const setLoggedIn = useSetRecoilState(loggedInAtom);
  const navigate = useNavigate();

  const { mutate: loginUser } = useMutation({
    mutationFn: (body: UserLogin) => UsersApi.loginUser(body),
    onSuccess: () => {
      console.log('User login successful!');
      setLoggedIn(true);
      navigate('/user');
    },
    onError: () => {
      alert("Invalid email or password!")
    },
  });
  
  const { register, handleSubmit } = useForm<UserLogin>();
  const onSubmit = (data: UserLogin) => loginUser(data);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__input">
        <input type='email' placeholder='Email' {...register('email', { required: true })}/>
      </div>
      <div className="form__input">
        <input type='password' placeholder='Password' {...register('hashedPassword', { required: true })}/>
      </div>
      <button className='form__button text-bold' type='submit'>Login</button>
    </form>
  );
}


export default LoginForm;