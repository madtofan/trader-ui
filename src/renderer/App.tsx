import './output.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import ConfigPage from './pages/dashboard/config';
import TemplatesPage from './pages/dashboard/config/templates';
import DocumentationsPage from './pages/dashboard/docs';
import LoginPage from './pages/login';
import Logout from './pages/logout';
import Providers from './components/layouts/providers';
import RegisterPage from './pages/register';
import PendingPage from './pages/register/pending';
import VerifyPage from './pages/register/verify/[token]';

export default function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/config" element={<ConfigPage />} />
          <Route path="/dashboard/config/templates" element={<TemplatesPage />} />
          <Route path="/dashboard/docs" element={<DocumentationsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/pending" element={<PendingPage />} />
          <Route path="/register/verify/:token" element={<VerifyPage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </Providers>
  );
}
