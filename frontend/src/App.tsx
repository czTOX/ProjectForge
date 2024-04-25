import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import './styles/styles.scss';
import { useRecoilState } from 'recoil';
import Header from './components/Header';
import { loggedInAtom } from './state/atoms';
import Footer from './components/Footer';
import ErrorPage from './pages/ErrorPage';

function App() {
  const isLoggedIn = useRecoilState(loggedInAtom);
  
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        {isLoggedIn[0] &&
          <Route path="/user" element={<MainPage />}>
            <Route path="/user/teams" element={<LoginPage />} />
            <Route path="/user/projects" element={<LoginPage />} />
            <Route path="/user/settings" element={<LoginPage />} />
          </Route>
        }
        <Route index path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
