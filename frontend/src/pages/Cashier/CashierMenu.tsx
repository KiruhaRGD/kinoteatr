import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './CashierMenu.css';

function CashierMenu() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFilmId, setSelectedFilmId] = useState('');

  const [sessions, setSessions] = useState([]);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/films')
      .then(r => r.json())
      .then(d => d.success && setFilms(d.data));
  }, []);

  const loadSessions = async () => {
    setLoading(true);
    let url = 'http://localhost:5000/api/sessions';

    const params = new URLSearchParams();
    if (selectedDate) params.append('date', selectedDate);
    if (selectedFilmId) params.append('filmId', selectedFilmId);

    if (params.toString()) url += '?' + params.toString();

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setSessions(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [selectedDate, selectedFilmId]);

  const goToBooking = (session) => {
  if (!session.id) {
    alert('Ошибка: ID сеанса не найден');
    return;
  }
  navigate(`/cashier/hall/${session.id}`);
};

  const handleLogout = () => {
    if (window.confirm('Выйти из панели кассира?')) {
      navigate('/');
    }
  };

  return (
    <div className="cashier-page">
      <div className="header">
        <h1 className="page-title">Панель кассира</h1>
        <button className="logout-btn" onClick={handleLogout}>Выход</button>
      </div>
      <div className="filter-panel">
        <div className="filter-group">
          <label>Дата</label>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
          />
        </div>

        <div className="filter-group">
          <label>Фильм</label>
          <select 
            value={selectedFilmId} 
            onChange={(e) => setSelectedFilmId(e.target.value)}
          >
            <option value="">Все фильмы</option>
            {films.map(film => (
              <option key={film.id} value={film.id}>
                {film.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="sessions-list">
        {loading && <p className="loading">Загрузка сеансов...</p>}

        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <h3>{session.filmName}</h3>
            
            <div className="session-info">
              <p><strong>Зал:</strong> №{session.hallNumber}</p>
              <p><strong>Дата:</strong> {session.date}</p>
              <p><strong>Время:</strong> {session.timeStart}</p>
            </div>

            <button className="sell-btn" onClick={() => goToBooking(session)}>
              Продать билет
            </button>
          </div>
        ))}

        {!loading && sessions.length === 0 && (
          <p className="no-sessions">Сеансов не найдено по выбранным фильтрам</p>
        )}
      </div>
    </div>
  );
}

export default CashierMenu;