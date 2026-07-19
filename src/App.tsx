import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import QuestionPage from './pages/QuestionPage';
import CareerPage from './pages/CareerPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/questions" element={<QuestionPage />} />
      <Route path="/career/:slug" element={<CareerPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
