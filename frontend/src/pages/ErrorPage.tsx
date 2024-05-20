import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedInAtom } from '../state/atoms';


/**
 * Error Page
 *
 * @returns {*}
 */
const ErrorPage: FC = () => {

  const isLoggedIn = useRecoilState(loggedInAtom);

  return (
    <div className="main__container">
      <div className="error center">
        <h1 className="heading">Error 404 Page not found</h1>
        {!isLoggedIn[0] && <Link to='/' className='text-regular'>Try to login first</Link>}
      </div>
    </div>
  );
};

export default ErrorPage;