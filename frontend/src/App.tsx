import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import './styles/styles.scss';
import { useRecoilState } from 'recoil';
import Header from './components/Header';
import { loggedInAtom } from './state/atoms';
import Footer from './components/Footer';
import ErrorPage from './pages/ErrorPage';
import TeamsPage from './pages/TeamsPage';
import ProjectsPage from './pages/ProjectsPage';
import SettingsPage from './pages/SettingsPage';
import ProjectPage from './pages/ProjectPage';
import TeamPage from './pages/TeamPage';
import TaskPage from './pages/TaskPage';
import TeamSettingsPage from './pages/TeamSettingsPage';
import ProjectSettingsPage from './pages/ProjectSettingsPage';
import TaskSettingsPage from './pages/TaskSettingsPage';

function App() {
  const isLoggedIn = useRecoilState(loggedInAtom);
  
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route index path="*" element={<ErrorPage />} />
        { isLoggedIn[0] && <Route path="/user" element={<MainPage />} /> }
        { isLoggedIn[0] && <Route path="/teams" element={<TeamsPage />} /> }
        { isLoggedIn[0] && <Route path="/teams/:id" element={<TeamPage />} /> }
        { isLoggedIn[0] && <Route path="/teams/:id/settings" element={<TeamSettingsPage />} /> }
        { isLoggedIn[0] && <Route path="/projects" element={<ProjectsPage />} /> }
        { isLoggedIn[0] && <Route path="/projects/:id" element={<ProjectPage />} /> }
        { isLoggedIn[0] && <Route path="/projects/:id/settings" element={<ProjectSettingsPage />} /> }
        { isLoggedIn[0] && <Route path="/tasks/:id" element={<TaskPage />} /> }
        { isLoggedIn[0] && <Route path="/tasks/:id/settings" element={<TaskSettingsPage />} /> }
        { isLoggedIn[0] && <Route path="/settings/" element={<SettingsPage />} /> }
      </Routes>
      <Footer />
    </>
  )
}

export default App;
