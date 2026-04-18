import { useState, useEffect } from 'react';
import '../admin/AdminFilms.css';

function AdminFilms() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: '',
    duration: '',
    ageRestriction: '',
    description: '',
    poster: ''
  });

  // Загрузка списка фильмов с бэкенда
  const fetchFilms = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/films');
      const data = await res.json();

      if (data.success) {
        setFilms(data.data);
      } else {
        setError(data.message || 'Ошибка загрузки фильмов');
      }
    } catch (err) {
      setError('Не удалось подключиться к серверу');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем фильмы при монтировании компонента
  useEffect(() => {
    fetchFilms();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddFilm = async (e) => {
    e.preventDefault();

    if (!form.name || !form.duration) {
      alert('Название и длительность фильма обязательны!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/films', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          duration: form.duration,
          ageRestriction: form.ageRestriction,
          description: form.description,
          poster: form.poster || null
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Фильм успешно добавлен!');
        setForm({ name: '', duration: '', ageRestriction: '', description: '', poster: '' });
        fetchFilms(); // Обновляем список
      } else {
        alert(data.message || 'Ошибка при добавлении фильма');
      }
    } catch (err) {
      alert('Ошибка соединения с сервером');
      console.error(err);
    }
  };

  return (
    <div className="admin-films">
      <h2 className="page-title">Управление фильмами</h2>

      {/* Форма добавления */}
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

          <textarea
            name="description"
            placeholder="Описание фильма (необязательно)"
            value={form.description}
            onChange={handleInputChange}
            rows="3"
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

      {loading && <p>Загрузка фильмов...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="films-list">
        {films.map(film => (
          <div key={film.id} className="film-card">
            {film.poster && (
              <img src={film.poster} alt={film.name} className="film-poster" />
            )}
            <div className="film-info">
              <h4>{film.name}</h4>
              <p><strong>Длительность:</strong> {film.duration}</p>
              <p><strong>Ограничение:</strong> {film.ageRestriction || '—'}</p>
              {film.description && <p>{film.description}</p>}
            </div>
          </div>
        ))}

        {films.length === 0 && !loading && (
          <p>Пока нет фильмов. Добавьте первый фильм выше.</p>
        )}
      </div>
    </div>
  );
}

export default AdminFilms;