import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import './Hall.css';

function Hall() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка сеанса и мест
  useEffect(() => {
    fetch(`http://localhost:5000/api/sessions/${sessionId}/seats`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSession(data.session);
          setSeats(data.seats);
        }
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  const toggleSeat = (seat) => {
    if (seat.status === 'taken') return;

    setSelectedSeats(prev => 
      prev.some(s => s.id === seat.id)
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  // Бронирование выбранных мест
  const confirmBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Выберите хотя бы одно место!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: parseInt(sessionId),
          seats: selectedSeats.map(seat => ({
            row: seat.row,
            number: seat.number
          }))
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(`✅ Успешно забронировано ${selectedSeats.length} мест!`);
        setSelectedSeats([]);
        // Обновляем схему зала
        window.location.reload();
      } else {
        alert(data.message || 'Ошибка бронирования');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка соединения с сервером');
    }
  };

  if (loading) return <div className="loading">Загрузка схемы зала...</div>;
  if (!session) return <div>Сеанс не найден</div>;

  return (
    <div className="hall-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Назад к сеансам</button>

      <div className="hall-header">
        <h1>{session.filmName}</h1>
        <p>Зал №{session.hallNumber} • {session.date} • {session.timeStart}</p>
      </div>

      <div className="screen">ЭКРАН</div>

      <div className="seats-grid">
        {Array.from({ length: session.rows || 10 }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <div className="row-label">Ряд {rowIndex + 1}</div>
            <div className="seats">
              {Array.from({ length: session.seats || 20 }).map((_, seatIndex) => {
                const seat = seats.find(s => 
                  s.row === rowIndex + 1 && s.number === seatIndex + 1
                );
                const isSelected = selectedSeats.some(s => s.id === seat?.id);

                return (
                  <div
                    key={seatIndex}
                    className={`seat ${seat?.status || 'available'} ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSeat(seat)}
                  >
                    {seatIndex + 1}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <div className="booking-bar">
          <span>Выбрано: <strong>{selectedSeats.length}</strong> мест</span>
          <button className="confirm-btn" onClick={confirmBooking}>
            Забронировать
          </button>
        </div>
      )}

      <div className="legend">
        <div><span className="seat available"></span> Свободно</div>
        <div><span className="seat taken"></span> Занято</div>
        <div><span className="seat selected"></span> Выбрано</div>
      </div>
    </div>
  );
}

export default Hall;