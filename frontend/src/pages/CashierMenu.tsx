import { useState } from 'react';
import { useNavigate } from 'react-router';
import './CashierMenu.css';


function CashierMenu() {
  const [sessions] = useState([
    {
      id: 1,
      movieTitle: "Дюна: Часть вторая",
      poster: "https://th.bing.com/th/id/R.6d4d190537edf38cf2500266f620feda?rik=BvdukRTTOUt3NQ&pid=ImgRaw&r=0",
      duration: "166 мин",
      ageRating: "16+",
      date: "15 апреля 2026",
      time: "19:30",
      hall: "5"
    },
    {
      id: 2,
      movieTitle: "Внутри Лапенко",
      poster: "https://resizer.mail.ru/p/aaabf70e-e015-503a-a14d-c503e707f96e/AQACkWzWbhxIuU5Tdm6spc1TIqDA1A9cpOxASvuCM6UYAChIuSNQO8OmCeDqZYfpoAtlpZgxTUXqPlAc_1wZF7fNgFw.jpg",
      duration: "95 мин",
      ageRating: "12+",
      date: "15 апреля 2026",
      time: "17:00",
      hall: "3"
    },
    {
      id: 3,
      movieTitle: "Человек-паук: Возвращение домой",
      poster: "https://via.placeholder.com/300x400/1e40af/ffffff?text=СПАЙДЕРМЕН",
      duration: "133 мин",
      ageRating: "12+",
      date: "16 апреля 2026",
      time: "14:20",
      hall: "1"
    },
    {
      id: 4,
      movieTitle: "Оппенгеймер",
      poster: "https://via.placeholder.com/300x400/475569/ffffff?text=ОППЕНГЕЙМЕР",
      duration: "180 мин",
      ageRating: "16+",
      date: "16 апреля 2026",
      time: "21:00",
      hall: "2"
    }
  ]);
const navigate = useNavigate();

const handleSessionClick = (session) => {
  navigate(`/cashier/hall/${session.id}`);
};

  return (
    <div className="cashier-container">
      <div className="cashier-header">
        <h1 className="cashier-title">Меню кассира</h1>
        <p className="cashier-subtitle">Все доступные сеансы</p>
      </div>

      <div className="sessions-list">
        {sessions.map((session) => (
          <div 
            key={session.id} 
            className="session-card"
            onClick={() => handleSessionClick(session)}
          >
            <img 
              src={session.poster} 
              alt={session.movieTitle}
              className="session-poster"
            />
            <div className="session-info">
              <h2 className="session-title">{session.movieTitle}</h2>
              
              <div className="session-details">
                <span className="session-duration">{session.duration}</span>
                <span className="session-age">{session.ageRating}</span>
              </div>

              <div className="session-time-info">
                <div>Дата: {session.date}</div>
                <div>Время: {session.time}</div>
                <div>Зал {session.hall}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CashierMenu;