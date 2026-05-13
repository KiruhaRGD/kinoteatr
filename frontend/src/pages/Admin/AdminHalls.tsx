import { useState, useEffect } from 'react';
import '../Admin/AdminHalls.css';

function AdminHalls() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    number: '',
    rows: '',
    seats: ''
  });

  const fetchHalls = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/halls');
      const data = await res.json();
      if (data.success) setHalls(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateHall = async (e) => {
    e.preventDefault();

    if (!form.number || !form.rows || !form.seats) {
      return alert('Заполните все поля!');
    }

    try {
      const res = await fetch('http://localhost:5000/api/halls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: form.number,
          rows: parseInt(form.rows),
          seats: parseInt(form.seats)
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(`Зал №${form.number} успешно создан!`);
        setForm({ number: '', rows: '', seats: '' });
        fetchHalls();
      } else {
        alert(data.message || 'Ошибка создания зала');
      }
    } catch (err) {
      alert('Ошибка соединения с сервером');
    }
  };

  const deleteHall = async (hallId, hallNumber) => {
    if (!window.confirm(`Удалить зал №${hallNumber}?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/halls/${hallId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert(`Зал №${hallNumber} удалён`);
        fetchHalls();
      } else {
        alert('Ошибка удаления');
      }
    } catch (err) {
      alert('Ошибка соединения с сервером');
    }
  };

  return (
    <div className="admin-halls">
      <h2 className="page-title">Управление залами</h2>

      <div className="add-form">
        <h3>Создать новый зал</h3>
        <form onSubmit={handleCreateHall}>
          <input
            type="text"
            name="number"
            placeholder="Номер зала"
            value={form.number}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="rows"
            placeholder="Количество рядов"
            value={form.rows}
            onChange={handleInputChange}
            min="1"
            required
          />
          <input
            type="number"
            name="seats"
            placeholder="Мест в одном ряду"
            value={form.seats}
            onChange={handleInputChange}
            min="1"
            required
          />
          <button type="submit">Создать зал</button>
        </form>
      </div>

      <h3>Существующие залы ({halls.length})</h3>

      <div className="halls-grid">
        {halls.map(hall => (
          <div key={hall.id} className="hall-card">
            <h4>Зал №{hall.number}</h4>
            <p><strong>Рядов:</strong> {hall.rows || '—'}</p>
            <p><strong>Мест в ряду:</strong> {hall.seats || '—'}</p>
            <p><strong>Всего мест:</strong> {(hall.rows && hall.seats) ? hall.rows * hall.seats : '—'}</p>

            <button 
              className="delete-btn"
              onClick={() => deleteHall(hall.id, hall.number)}
            >
              Удалить
            </button>
          </div>
        ))}

        {halls.length === 0 && !loading && <p>Пока нет залов.</p>}
      </div>
    </div>
  );
}

export default AdminHalls;