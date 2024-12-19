import React, { useState } from 'react';
import './Logar.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png';
import ufmsLogo from '../ufms-logo.png';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/user.service.ts';

function Logar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await login({ email, password });
      const data = await response.json();

      if (data.message === "Incorrect username or password") {
        setError(data.message);
      } else {
        setSuccessMessage(data.message);

        sessionStorage.setItem('id', data.user.id);
        sessionStorage.setItem('username', data.user.firstName);

        setTimeout(() => {
          navigate('/'); 
        }, 1000); 
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro durante o login');
    }
  };

  return (
    <div className='body-login'>
      <div className="container">
        <div className="left-panel">
          <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo" />
        </div>
        <div className="divider"></div> {/* Linha divisória */}
        
        <div className="right-panel">
          <h2>Entrar</h2>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <label className='label-login'>Email:</label>
            <input 
              type="email" 
              name="email" 
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className='label-login'>Senha:</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn-submit">Entrar</button>
          </form>
          <img src={ufmsLogo} alt="UFMS Logo" className="ufms-logo" />
        </div>
      </div>
    </div>
  );
}

export default Logar;