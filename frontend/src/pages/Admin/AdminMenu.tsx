import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import '../admin/AdminMenu.css';

function AdminMenu() {
  const location = useLocation();
  const navigate = useNavigate();

const menuItems = [
    { path: '/admin', label: 'Статистика'},
    { path: '/admin/films', label: 'Фильмы'},
    { path: '/admin/sessions', label: 'Сеансы'},
    { path: '/admin/halls', label: 'Залы'},
    { path: '/admin/cashiers', label: 'Кассиры'},
  ];

  const handleLogout = () => {
    if (window.confirm('Выйти из админ-панели?')) {
      navigate('/');
    }
  };

  return (
    <div className="admin-container">
      {/* Боковое меню */}
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>КиноАдмин</h2>
        </div>

        <nav className="admin-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-logout">
          <button onClick={handleLogout} className="logout-button">
            Выйти из Админ Панели
          </button>
        </div>
      </div>

      {/* Основная область */}
      <div className="admin-content">
        <div className="admin-header">
          <h1>Админ панель</h1>
        </div>

        <div className="admin-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;