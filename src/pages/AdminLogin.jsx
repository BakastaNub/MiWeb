import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: users, error: fetchError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (fetchError) throw fetchError;

      if (!users || users.length === 0) {
        setError('Credenciales inválidas');
        setLoading(false);
        return;
      }

      const user = users[0];
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        setError('Credenciales inválidas');
        setLoading(false);
        return;
      }

      sessionStorage.setItem('adminUser', JSON.stringify({ id: user.id, email: user.email }));
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError('Error al iniciar sesión');
    }
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <h1>Panel de Administración</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
