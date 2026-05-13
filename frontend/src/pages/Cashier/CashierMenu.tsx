import { useState, useEffect } from 'react';
import './CashierMenu.css';

function CashierMenu() {
  const [mode, setMode] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFilmId, setSelectedFilmId] = useState('');

  const [sessions, setSessions] = useState([]);
  const [films, setFilms] = useState([]);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/films')
      .then(res => res.json())
      .then(data => {
        if (data.success) setFilms(data.data);
      });
  }, []);

  const loadSessions = async () => {
    setLoading(true);
    let url = 'http://localhost:5000/api/sessions';

    if (mode === 'date' && selectedDate) {
      url += `?date=${selectedDate}`;
    } else if (mode === 'film' && selectedFilmId) {
      url += `?filmId=${selectedFilmId}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setSessions(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [mode, selectedDate, selectedFilmId]);

  return (
    <div className="cashier-page">
      <h1 className="page-title">Панель кассира</h1>

      <div className="mode-switch">
        <button className={mode === 'date' ? 'active' : ''} onClick={() => setMode('date')}>
          По дате
        </button>
        <button className={mode === 'film' ? 'active' : ''} onClick={() => setMode('film')}>
          По фильму
        </button>
      </div>

      <div className="filter-panel">
        {mode === 'date' && (
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
          />
        )}

        {mode === 'film' && (
          <select 
            value={selectedFilmId} 
            onChange={(e) => setSelectedFilmId(e.target.value)}
          >
            <option value="">Выберите фильм</option>
            {films.map(film => (
              <option key={film.id} value={film.id}>
                {film.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="sessions-list">
        {loading && <p className="loading">Загрузка сеансов...</p>}

        {!loading && sessions.length === 0 && (
          <p className="no-sessions">
            {mode === 'date' 
              ? `На выбранную дату (${selectedDate}) сеансов нет` 
              : 'По выбранному фильму сеансов нет'}
          </p>
        )}

        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <h3>{session.filmName}</h3>
            
            <div className="session-info">
              <p><strong>Зал:</strong> №{session.hallNumber}</p>
              <p><strong>Дата:</strong> {session.date}</p>
              <p><strong>Время:</strong> {session.timeStart}</p>
            </div>

            <button className="sell-btn">Продать билет</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CashierMenu;