import { useState } from 'react';
import '../admin/AdminSessions.css';

function AdminSessions() {
  const [films] = useState([
    { id: 1, name: "Дюна: Часть вторая" },
    { id: 2, name: "Внутри Лапенко" },
    { id: 3, name: "Человек-паук: Возвращение домой" },
    { id: 4, name: "Оппенгеймер" },
  ]);

  const [halls] = useState([
    { id: 1, name: "Зал 1" },
    { id: 2, name: "Зал 2" },
    { id: 3, name: "Зал 3" },
    { id: 4, name: "Зал 5" },
  ]);

  const [sessions, setSessions] = useState([
    {
      id: 101,
      filmName: "Дюна: Часть вторая",
      hallName: "Зал 5",
      date: "2026-04-15",
      time: "19:30",
      price: 450
    },
    {
      id: 102,
      filmName: "Внутри Лапенко",
      hallName: "Зал 3",
      date: "2026-04-15",
      time: "17:00",
      price: 380
    }
  ]);

  const [form, setForm] = useState({
    filmId: '',
    hallId: '',
    date: '',
    time: '',
    price: ''
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSession = (e) => {
    e.preventDefault();

    if (!form.filmId || !form.hallId || !form.date || !form.time || !form.price) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const selectedFilm = films.find(f => f.id === parseInt(form.filmId));
    const selectedHall = halls.find(h => h.id === parseInt(form.hallId));

    const newSession = {
      id: Date.now(),
      filmName: selectedFilm.name,
      hallName: selectedHall.name,
      date: form.date,
      time: form.time,
      price: parseInt(form.price)
    };

    setSessions([...sessions, newSession]);

    setForm({ filmId: '', hallId: '', date: '', time: '', price: '' });

    alert('Сеанс успешно добавлен!');
  };

  return (
    <div className="admin-sessions">
      <h2 className="page-title">Управление сеансами</h2>

      {/* Форма добавления сеанса */}
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

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            required
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleInputChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Цена билета (руб)"
            value={form.price}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Добавить сеанс</button>
        </form>
      </div>

      <h3>Существующие сеансы ({sessions.length})</h3>
      <div className="sessions-list">
        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <div className="session-info">
              <h4>{session.filmName}</h4>
              <p><strong>Зал:</strong> {session.hallName}</p>
              <p><strong>Дата:</strong> {session.date}</p>
              <p><strong>Время:</strong> {session.time}</p>
              <p><strong>Цена:</strong> {session.price} ₽</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSessions;