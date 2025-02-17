import React from 'react';
import './Logar.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png'; // Logo do Tira Dúvidas
import ufmsLogo from '../ufms-logo.png'; // Logo da UFMS
import { useNavigate } from 'react-router-dom';

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
          <form>
            <label className='label-login'>Email:</label>
            <input type="email" name="email" placeholder="email@email.com" />
            <label className='label-login'>Senha:</label>
            <input type="password" name="password" placeholder="••••••••" />
            {/*<button type="submit">Entrar</button> */}
            <button className="btn-submit" onClick={() => navigate('/minhas-duvidas')} >Entrar</button>
          </form>
          <img src={ufmsLogo} alt="UFMS Logo" className="ufms-logo" /> {/* Logo UFMS */}
        </div>
      </div>
    </div>
  );
}

export default Logar;
