import { useState } from 'react';
import { Link } from 'react-router';
import './Login.css';

function Login() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert('Попытка входа... (пока без бэкенда)');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="block1">
      <div className="block2">
        <div className="block3">Войти в систему</div>
        <div className="block4">Введите логин и пароль</div>

        <form onSubmit={handleSubmit} className="block5">
          <input
            type="login"
            placeholder="Логин"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="block6"
            required
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block6"
            required
          />

          <button type="submit" disabled={loading} className="block7">
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <div className="block8">
          <Link to="/CashierMenu" className="block9">Пропустить - Кассир</Link>
          <div></div>
          <Link to="/admin" className="block9">Пропустить - Администратор</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;