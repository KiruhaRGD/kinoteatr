import { useState, useEffect } from 'react';
import '../admin/AdminHalls.css';

function AdminHalls() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    number: ''
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

  const handleAddHall = async (e) => {
    e.preventDefault();

    if (!form.number) {
      alert('Номер зала обязателен!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/halls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: form.number })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(`Зал №${form.number} успешно создан!`);
        setForm({ number: '' });
        fetchHalls();
      } else {
        alert(data.message || 'Ошибка при создании зала');
      }
    } catch (err) {
      alert('Ошибка соединения с сервером');
    }
  };

  return (
    <div className="admin-halls">
      <h2 className="page-title">Управление залами</h2>

      <div className="add-form">
        <h3>Добавить новый зал</h3>
        <form onSubmit={handleAddHall}>
          <input
            type="text"
            name="number"
            placeholder="Номер зала (например: 1, 2, 5)"
            value={form.number}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Создать зал</button>
        </form>
      </div>

      <h3>Существующие залы ({halls.length})</h3>

      <div className="halls-list">
        {halls.map(hall => (
          <div key={hall.id} className="hall-card">
            <h4>Зал №{hall.number}</h4>
          </div>
        ))}

        {halls.length === 0 && !loading && (
          <p>Пока нет залов. Создайте первый зал.</p>
        )}
      </div>
    </div>
  );
}

export default AdminHalls;