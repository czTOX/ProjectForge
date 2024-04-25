import { FC } from 'react';


const MainPage: FC = () => {

  return (
    <div className="container main__page">
      <h1 className="heading">My Page</h1>
      <div className="divider"></div>
      <h2 className="heading">Projects</h2>
      <div className="divider--small"></div>
      <div className="main__projects"></div>
      <h2 className="heading">Teams</h2>
      <div className="divider--small"></div>
      <div className="main__teams"></div>
    </div>
  );
};

export default MainPage;