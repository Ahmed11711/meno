import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainWebsitePage from './components/layout/MainLayout';
import AdminDashboard from './pages/admin/Dashboard';
import MenuManagement from './pages/admin/MenuManagement';
import AdminLayout from './components/layout/AdminLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainWebsitePage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="menu" element={<MenuManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

 

export default App;
