import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Badge } from 'reactstrap';

const NAV_SECTIONS = [
  {
    title: 'Geral',
    items: [
      { to: '/', icon: 'fa-chart-line', label: 'Dashboard', end: true },
      { to: '/profile', icon: 'fa-user', label: 'Perfil' },
      { to: '/components', icon: 'fa-cube', label: 'Componentes', badge: 'NEW' },
    ],
  },
  {
    title: 'Operações',
    items: [
      { to: '#orders', icon: 'fa-box', label: 'Pedidos' },
      { to: '#customers', icon: 'fa-users', label: 'Clientes' },
      { to: '#reports', icon: 'fa-file-lines', label: 'Relatórios' },
      { to: '#settings', icon: 'fa-gear', label: 'Configurações' },
    ],
  },
];

export default function Sidebar({ isOpen, isCollapsed, onClose }) {
  return (
    <>
      <div
        className={classNames('sidebar-backdrop', { 'is-open': isOpen })}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={classNames('app-sidebar', {
          'is-open': isOpen,
          'is-collapsed': isCollapsed,
        })}
      >
        <div className="app-sidebar__brand">
          <span className="brand-mark">DD</span>
          <span className="brand-name">Demo Dashboard</span>
        </div>

        <nav className="app-sidebar__nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="nav-section-title">{section.title}</p>
              {section.items.map((item) => {
                const isHash = item.to.startsWith('#');
                if (isHash) {
                  return (
                    <a
                      key={item.label}
                      href={item.to}
                      className="app-sidebar__link"
                      onClick={onClose}
                    >
                      <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge color="light" pill>
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  );
                }
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      classNames('app-sidebar__link', { 'is-active': isActive })
                    }
                  >
                    <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge color="light" pill>
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="app-sidebar__footer">
          <span className="avatar">AM</span>
          <div className="user-meta">
            <div className="user-name">Alex Morgan</div>
            <div className="user-role">Administrador</div>
          </div>
        </div>
      </aside>
    </>
  );
}
