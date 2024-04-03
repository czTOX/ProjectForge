import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './styles/styles.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user">
          <Route path="/user/projects" element={<LoginPage />} />
          <Route path="/user/new" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
