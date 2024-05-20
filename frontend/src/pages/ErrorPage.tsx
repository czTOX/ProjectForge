import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedInAtom } from '../state/atoms';


const ErrorPage: FC = () => {

  const isLoggedIn = useRecoilState(loggedInAtom);

  return (
    <main className="error center">
      <h1 className="heading">Error 404 Page not found</h1>
      {!isLoggedIn[0] && <Link to='/' className='text-regular'>Try to login first</Link>}
    </main>
  );
};

export default ErrorPage;