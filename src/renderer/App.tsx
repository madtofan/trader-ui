import { Providers } from '@/modules/components';
import './output.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '@/modules/auth/login';
import DashboardPage from '@/modules/dashboard';
import WorkflowPage from '@/modules/workflow';
import NotificationPage from '@/modules/notifications';
import RolesPermissionsPage from '@/modules/roles-permissions';
import TemplatesPage from '@/modules/templates';
import UsersPage from '@/modules/users';
import DocumentationsPage from '@/modules/docs';
import RegisterPage from '@/modules/auth/register';
import PendingPage from '@/modules/auth/register/pending';
import VerifyPage from '@/modules/auth/register/verify/[token]';
import Logout from '@/modules/auth/logout';

export default function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/config" element={<WorkflowPage />} />
          <Route
            path="/dashboard/config/notifications"
            element={<NotificationPage />}
          />
          <Route
            path="/dashboard/config/roles-permissions"
            element={<RolesPermissionsPage />}
          />
          <Route
            path="/dashboard/config/templates"
            element={<TemplatesPage />}
          />
          <Route path="/dashboard/config/users" element={<UsersPage />} />
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
