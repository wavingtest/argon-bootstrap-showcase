import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'is-sidebar-collapsed' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="app-main">
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
          isSidebarCollapsed={sidebarCollapsed}
        />
        <main className="app-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
