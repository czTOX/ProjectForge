import { FC, useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';


const LoginPage: FC = () => {
  const [hasAccount, setHasAccount] = useState<Boolean>(true);

  return (
    <div className='main__container'>
      <div className='login center'>
        <h1 className='heading'>ProjectForge</h1>
        <div className='login-container'>
          <div className='options'>
            <div className={'options__login ' + (hasAccount ? 'option--active' : 'option--inactive')} onClick={ () => {setHasAccount(true);} }>
              <h2 className='heading'>Login</h2>
            </div>
            <div className={'options__register ' + (hasAccount ? 'option--inactive' : 'option--active')} onClick={ () => {setHasAccount(false);} }>
              <h2 className='heading'>Register</h2>
            </div>
          </div>
          {hasAccount ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;