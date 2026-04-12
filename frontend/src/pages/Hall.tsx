import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import './Hall.css';

function Hall() {
  const { showingId } = useParams();        // в будущем будем передавать id сеанса
  const navigate = useNavigate();

  // Заглушка данных о сеансе
  const [showing] = useState({
    id: showingId || 1,
    movieTitle: "Дюна: Часть вторая",
    date: "15 апреля 2026",
    time: "19:30",
    hallNumber: "Зал 5",
    hallId: 5
  });

  const [seats, setSeats] = useState([
    { id: 1, row: 1, number: 1, status: 'available', type: 'standard' },
    { id: 2, row: 1, number: 2, status: 'available', type: 'standard' },
    { id: 3, row: 1, number: 3, status: 'taken', type: 'standard' },
    { id: 4, row: 1, number: 4, status: 'available', type: 'standard' },
  ]);

  const rows = 7;
  const seatsPerRow = 10;

  const handleSeatClick = (seat) => {
    if (seat.status === 'taken') {
      alert('Это место уже занято!');
      return;
    }
    alert(`Вы выбрали место: Ряд ${seat.row}, Место ${seat.number}`);
  };

  const goBack = () => {
    navigate('/CashierMenu');
  };

  return (
    <div className="hall-container">
      <div className="hall-header">
        <button onClick={goBack} className="back-button">← Назад к сеансам</button>
        
        <div className="hall-info">
          <h1>{showing.movieTitle}</h1>
          <p>{showing.date} • {showing.time} • {showing.hallNumber}</p>
        </div>
      </div>

      <div className="hall-screen">
        <div className="screen">ЭКРАН</div>
      </div>

      <div className="seats-container">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <div className="row-label">Ряд {rowIndex + 1}</div>
            
            <div className="seats">
              {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                const seatNumber = seatIndex + 1;
                const isTaken = (rowIndex + seatIndex) % 3 === 0;
                
                return (
                  <div
                    key={seatNumber}
                    className={`seat ${isTaken ? 'taken' : 'available'}`}
                    onClick={() => handleSeatClick({
                      row: rowIndex + 1,
                      number: seatNumber,
                      status: isTaken ? 'taken' : 'available'
                    })}
                  >
                    {seatNumber}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="legend">
        <div className="legend-item">
          <div className="seat available"></div>
          <span>Свободно</span>
        </div>
        <div className="legend-item">
          <div className="seat taken"></div>
          <span>Занято</span>
        </div>
      </div>
    </div>
  );
}

export default Hall;