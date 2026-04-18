import { useState, useEffect } from 'react';
import '../admin/AdminSessions.css';

function AdminSessions() {
  const [sessions, setSessions] = useState([]);
  const [films, setFilms] = useState([]);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    filmId: '',
    hallId: '',
    date: '',
    time: ''
  });

  // Загрузка данных
  const fetchData = async () => {
  try {
    setLoading(true);
    
    const [sessionsRes, filmsRes] = await Promise.all([
      fetch('http://localhost:5000/api/sessions'),
      fetch('http://localhost:5000/api/films')
    ]);

    const sessionsData = await sessionsRes.json();
    const filmsData = await filmsRes.json();

    if (sessionsData.success) setSessions(sessionsData.data);
    if (filmsData.success) {
      setFilms(filmsData.data);
      console.log('Фильмы загружены:', filmsData.data);   // для отладки
    } else {
      console.error('Ошибка загрузки фильмов:', filmsData.message);
    }

  } catch (err) {
    console.error('Ошибка fetchData:', err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSession = async (e) => {
    e.preventDefault();

    if (!form.filmId || !form.hallId || !form.date || !form.time) {
      alert('Заполните все поля!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Сеанс успешно добавлен!');
        setForm({ filmId: '', hallId: '', date: '', time: '' });
        fetchData();
      } else {
        alert(data.message || 'Ошибка при добавлении сеанса');
      }
    } catch (err) {
      alert('Ошибка соединения с сервером');
    }
  };

  return (
    <div className="admin-sessions">
      <h2 className="page-title">Управление сеансами</h2>

      <div className="add-form">
        <h3>Добавить новый сеанс</h3>
        <form onSubmit={handleAddSession}>
          <select name="filmId" value={form.filmId} onChange={handleInputChange} required>
            <option value="">Выберите фильм</option>
            {films.map(film => (
              <option key={film.id} value={film.id}>
                {film.name}
              </option>
            ))}
          </select>

          <select name="hallId" value={form.hallId} onChange={handleInputChange} required>
            <option value="">Выберите зал</option>
            {halls.map(hall => (
              <option key={hall.id} value={hall.id}>
                {hall.name}
              </option>
            ))}
          </select>

          <input type="date" name="date" value={form.date} onChange={handleInputChange} required />
          <input type="time" name="time" value={form.time} onChange={handleInputChange} required />

          <button type="submit">Добавить сеанс</button>
        </form>
      </div>

      <h3>Существующие сеансы ({sessions.length})</h3>

      <div className="sessions-list">
        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <h4>{session.filmName}</h4>
            <p><strong>Зал:</strong> {session.hallName}</p>
            <p><strong>Дата:</strong> {session.date}</p>
            <p><strong>Время:</strong> {session.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSessions;