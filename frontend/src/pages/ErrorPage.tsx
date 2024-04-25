import { FC } from 'react';
import { Link } from 'react-router-dom';


const ErrorPage: FC = () => {

  return (
    <main className="error center">
      <h1 className="heading">Error 404 Page not found</h1>
      <Link to='/' className='text-regular'>Try to login first</Link>
    </main>
  );
};

export default ErrorPage;