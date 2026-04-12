import { useState } from 'react';
import '../admin/AdminFilms.css';

function AdminFilms() {
  const [films, setFilms] = useState([
    {
      id: 1,
      name: "Дюна: Часть вторая",
      duration: "166 мин",
      ageRestriction: "16+",
      poster: "https://via.placeholder.com/300x450?text=ДЮНА"
    },
    {
      id: 2,
      name: "Внутри Лапенко",
      duration: "95 мин",
      ageRestriction: "12+",
      poster: "https://via.placeholder.com/300x450?text=ЛАПЕНКО"
    }
  ]);

  const [form, setForm] = useState({
    name: '',
    duration: '',
    ageRestriction: '',
    poster: ''
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddFilm = (e) => {
    e.preventDefault();
    if (!form.name || !form.duration) return;

    const newFilm = {
      id: Date.now(),
      ...form
    };

    setFilms([...films, newFilm]);
    setForm({ name: '', duration: '', ageRestriction: '', poster: '' });
    alert('Фильм добавлен!');
  };

  return (
    <div className="admin-films">
      <h2 className="page-title">Управление фильмами</h2>

      {/* Форма добавления фильма */}
      <div className="add-form">
        <h3>Добавить новый фильм</h3>
        <form onSubmit={handleAddFilm}>
          <input
            type="text"
            name="name"
            placeholder="Название фильма"
            value={form.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Длительность (например: 166 мин)"
            value={form.duration}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="ageRestriction"
            placeholder="Возрастное ограничение (12+, 16+, 18+)"
            value={form.ageRestriction}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="poster"
            placeholder="Ссылка на постер (опционально)"
            value={form.poster}
            onChange={handleInputChange}
          />
          <button type="submit">Добавить фильм</button>
        </form>
      </div>

      {/* Список фильмов */}
      <h3>Существующие фильмы ({films.length})</h3>
      <div className="films-list">
        {films.map(film => (
          <div key={film.id} className="film-card">
            <img src={film.poster} alt={film.name} className="film-poster" />
            <div className="film-info">
              <h4>{film.name}</h4>
              <p>Длительность: {film.duration}</p>
              <p>Ограничение: {film.ageRestriction || '—'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminFilms;