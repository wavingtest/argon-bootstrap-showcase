import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar({
  onToggleSidebar,
  onToggleCollapse,
  isSidebarCollapsed,
}) {
  const [openUser, setOpenUser] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="app-navbar">
      <button
        type="button"
        className="navbar-toggler-btn"
        onClick={onToggleSidebar}
        aria-label="Abrir menu"
      >
        <i className="fa-solid fa-bars" />
      </button>
      <button
        type="button"
        className="navbar-collapse-btn"
        onClick={onToggleCollapse}
        aria-label="Colapsar menu lateral"
        title={isSidebarCollapsed ? 'Expandir menu' : 'Colapsar menu'}
      >
        <i
          className={`fa-solid ${
            isSidebarCollapsed ? 'fa-angles-right' : 'fa-angles-left'
          }`}
        />
      </button>

      <div className="navbar-search">
        <i className="fa-solid fa-magnifying-glass" />
        <input
          type="search"
          className="form-control"
          placeholder="Buscar componentes, páginas, ações…"
        />
      </div>

      <div className="navbar-actions">
        <Dropdown isOpen={openNotif} toggle={() => setOpenNotif((v) => !v)}>
          <DropdownToggle tag="button" className="icon-btn" caret={false}>
            <i className="fa-regular fa-bell" />
            <span className="dot" />
          </DropdownToggle>
          <DropdownMenu end style={{ minWidth: 280 }}>
            <DropdownItem header>Notificações</DropdownItem>
            <DropdownItem>
              <strong>Novo pedido recebido</strong>
              <div className="text-muted small">há 4 minutos</div>
            </DropdownItem>
            <DropdownItem>
              <strong>Relatório mensal disponível</strong>
              <div className="text-muted small">há 1 hora</div>
            </DropdownItem>
            <DropdownItem>
              <strong>3 usuários aguardando aprovação</strong>
              <div className="text-muted small">ontem</div>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem className="text-center">Ver todas</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <button type="button" className="icon-btn" aria-label="Mensagens">
          <i className="fa-regular fa-comments" />
        </button>

        <Dropdown isOpen={openUser} toggle={() => setOpenUser((v) => !v)}>
          <DropdownToggle tag="div" className="user-menu" caret={false}>
            <span className="avatar">AM</span>
            <span className="user-name">Alex Morgan</span>
            <i className="fa-solid fa-chevron-down text-muted small" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem header>Conta</DropdownItem>
            <DropdownItem onClick={() => navigate('/profile')}>
              <i className="fa-solid fa-user me-2" /> Meu perfil
            </DropdownItem>
            <DropdownItem>
              <i className="fa-solid fa-gear me-2" /> Configurações
            </DropdownItem>
            <DropdownItem>
              <i className="fa-regular fa-circle-question me-2" /> Ajuda
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => navigate('/login')}>
              <i className="fa-solid fa-arrow-right-from-bracket me-2" /> Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
