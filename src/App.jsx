import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import Inicio from './views/Inicio';
import Showcase from './views/Showcase';
import Profile from './views/Profile';
import Login from './views/Login';

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/components" element={<Showcase />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
