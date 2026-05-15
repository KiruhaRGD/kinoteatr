import { useState, useEffect } from 'react';
import '../Admin/AdminSessions.css';

function AdminSessions() {
  const [sessions, setSessions] = useState([]);
  const [films, setFilms] = useState([]);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    filmId: '',
    hallId: '',
    date: '',
    timeStart: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sRes, fRes, hRes] = await Promise.all([
        fetch('http://localhost:5000/api/sessions'),
        fetch('http://localhost:5000/api/films'),
        fetch('http://localhost:5000/api/halls')
      ]);

      const sData = await sRes.json();
      const fData = await fRes.json();
      const hData = await hRes.json();

      if (sData.success) setSessions(sData.data);
      if (fData.success) setFilms(fData.data);
      if (hData.success) setHalls(hData.data);
    } catch (err) {
      console.error(err);
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

    const handleCreateSession = async (e) => {
    e.preventDefault();

    if (!form.filmId || !form.hallId || !form.date || !form.timeStart) {
      return alert('Заполните все поля!');
    }

    try {
      const res = await fetch('http://localhost:5000/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filmId: parseInt(form.filmId),
          hallId: parseInt(form.hallId),
          date: form.date,
          timeStart: form.timeStart
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Сеанс успешно создан!');
        setForm({ filmId: '', hallId: '', date: '', timeStart: '' });
        fetchData();
      } else {
        alert(data.message || 'Ошибка создания сеанса');
      }
    } catch (err) {
      alert('Ошибка соединения с сервером');
      console.error(err);
    }
  };

  const deleteSession = async (sessionId, filmName) => {
    if (!window.confirm(`Удалить сеанс "${filmName}"?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/sessions/${sessionId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('Сеанс удалён');
        fetchData();
      } else {
        alert('Ошибка удаления');
      }
    } catch (err) {
      alert('Ошибка соединения');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';

    try {
      const date = new Date(dateStr);
      
      if (isNaN(date.getTime())) return dateStr;

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    } 
    catch (e) {
      return dateStr;
    }
  };
  
  return (
    <div className="admin-sessions">
      <h2 className="page-title">Управление сеансами</h2>

      <div className="add-form">
        <h3>Добавить новый сеанс</h3>
        <form onSubmit={handleCreateSession}>
          <select name="filmId" value={form.filmId} onChange={handleInputChange} required>
            <option value="">Выберите фильм</option>
            {films.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>

          <select name="hallId" value={form.hallId} onChange={handleInputChange} required>
            <option value="">Выберите зал</option>
            {halls.map(h => <option key={h.id} value={h.id}>Зал №{h.number}</option>)}
          </select>

          <input type="date" name="date" value={form.date} onChange={handleInputChange} required />
          <input type="time" name="timeStart" value={form.timeStart} onChange={handleInputChange} required />

          <button type="submit">Создать сеанс</button>
        </form>
      </div>

      <h3>Существующие сеансы ({sessions.length})</h3>

      <div className="sessions-list">
        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <h4>{session.filmName}</h4>
            <div className="session-info">
              <p><strong>Зал:</strong> №{session.hallNumber}</p>
              <p><strong>Дата:</strong> {formatDate(session.date)}</p>
              <p><strong>Время:</strong> {session.timeStart}</p>
            </div>

            <button 
              className="delete-btn"
              onClick={() => deleteSession(session.id, session.filmName)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSessions;