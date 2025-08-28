import React, { useState } from 'react';
import './EsqueciMinhaSenha.css';
import tiraDuvidasLogo from '../../utils/images/Logo-Tira-Dúvidas-removebg.png';
import ufmsLogo from '../../utils/images/ufms-logo.png';
import arroba from '../../utils/images/arroba.png';
import { useNavigate, Link } from 'react-router-dom';

function EsqueciMinhaSenha() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          // enviar email para o serviço de recuperação de senha  
        } catch (err) {

        };
    }

  return (
    <div className='body-esqueci-minha-senha'>
      <div className="container-esqueci-minha-senha">
        <div className="left-panel-esqueci-minha-senha">
          <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="logo-esqueci-minha-senha" />
          <p className="description-text-esqueci-minha-senha">
            <em>
              Tire suas dúvidas relacionadas à<br />
              TIC's com estudantes da UFMS
            </em>
          </p>
          <p class="footer-text-esqueci-minha-senha">Projeto de ensino - PET-Sistemas</p>
        </div>
        <div className="divider-esqueci-minha-senha"></div> {/* Linha divisória */}
        
        <div className="right-panel-esqueci-minha-senha">
          <h2>Recuperar Senha</h2> 
          {error && <div className="error-message-esqueci-minha-senha">{error}</div>}
          {successMessage && <div className="success-message-esqueci-minha-senha">{successMessage}</div>}
          <form className='form-esqueci-minha-senha' onSubmit={handleSubmit}>
            <div className="input-field-esqueci-minha-senha">
              <span className="input-icon-esqueci-minha-senha">
                <img src={arroba} alt="arroba" />
              </span>  
              <input
                type="email"
                id="email"
                name="email"
                className='input-esqueci-minha-senha'
                placeholder="Insira seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='button-group-esqueci-minha-senha'>
              <button className="button-esqueci-minha-senha" type="submit">Enviar</button>
              <button className="button-esqueci-minha-senha" onClick={() => navigate('/login')}>Cancelar</button>
            </div>
          </form>        
          <img src={ufmsLogo} alt="UFMS Logo" className="ufms-logo-esqueci-minha-senha" />
        </div>
      </div>
    </div>
  );
}

export default EsqueciMinhaSenha;