import '../admin/AdminStat.css';

function AdminStat() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Статистика сегодня</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">?</div>
          <div className="stat-label">Сеансов сегодня</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">?</div>
          <div className="stat-label">Билетов продано</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">? ₽</div>
          <div className="stat-label">Выручка сегодня</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">? </div>
          <div className="stat-label">Активных кассира</div>
        </div>
      </div>

      <div className="recent-section">
        <h3>Последние продажи</h3>
        <p style={{color: '#94a3b8'}}>Здесь позже будет таблица последних броней</p>
      </div>
    </div>
  );
}

export default AdminStat;