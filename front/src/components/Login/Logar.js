import React from 'react';
import './Logar.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png'; // Logo do Tira Dúvidas
import ufmsLogo from '../ufms-logo.png'; // Logo da UFMS
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/user.service.ts';

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccessMessage('');
  
  try {
    const response = await login({ email, password });
    const data = await response.json();
    
    if (data.status == "success") {
      setSuccessMessage(data.message);
    }else
      setError(data.message);
  } catch (err) {
    setError(err.message || 'Ocorreu um erro durante o login');
  }
};

function Logar() {
  const navigate = useNavigate();

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
            <input type="email" name="email" placeholder="email@email.com" />
            <label className='label-login'>Senha:</label>
            <input type="password" name="password" placeholder="••••••••" />
            {/*<button type="submit">Entrar</button> */}
            <button onClick={() => navigate('/minhas-duvidas')} className="btn-submit">Entrar</button>
          </form>
          <img src={ufmsLogo} alt="UFMS Logo" className="ufms-logo" /> {/* Logo UFMS */}
        </div>
      </div>
    </div>
  );
}

export default Logar;
