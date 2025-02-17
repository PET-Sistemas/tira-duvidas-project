import React from 'react';
import './Cadastro.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png'; // Logo do Tira Dúvidas
import ufmsLogo from '../ufms-logo.png'; // Logo da UFMS

function Cadastro() {
  return (
    <div className="body-cadastro">
      <div className="signup-container-cadastro">
        <div className="signup-left-panel-cadastro">
          <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="signup-logo-cadastro" />
        </div>
        <div className="signup-divider-cadastro"></div>
        <div className="signup-right-panel-cadastro">
          <h2 className="signup-title-cadastro">Cadastrar-se</h2>
          <form className="form-cadastro">
            <label className="label-cadastro">Nome Completo:</label>
            <input type="text" name="name" placeholder="Nome Completo" className="input-cadastro" />
            <label className="label-cadastro">Email:</label>
            <input type="email" name="email" placeholder="email@email.com" className="input-cadastro" />
            <label className="label-cadastro">Telefone:</label>
            <input type="tel" name="phone" placeholder="(XX) XXXXX-XXXX" className="input-cadastro" />
            <label className="label-cadastro">Senha:</label>
            <input type="password" name="password" placeholder="••••••••" className="input-cadastro" />
            <label className="label-cadastro">Confirmar Senha:</label>
            <input type="password" name="confirm-password" placeholder="••••••••" className="input-cadastro" />
            <button type="submit" className="button-cadastro">Cadastrar</button>
          </form>
          <img src={ufmsLogo} alt="UFMS Logo" className="signup-ufms-logo-cadastro" />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
