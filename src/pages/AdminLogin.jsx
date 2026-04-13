import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'Wilsolution2024';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', ADMIN_PASSWORD);
      navigate('/admin');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <h1>Panel de Administración</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
