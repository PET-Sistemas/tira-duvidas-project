import React, { useState } from 'react';
import './Cadastro.css';
import tiraDuvidasLogo from '../../utils/images/Logo-Tira-Dúvidas-removebg.png';
import ufmsLogo from '../../utils/images/ufms-logo.png';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/user.service.ts';
import { splitName } from '../../utils/nomeSobrenome.js';

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validação de senha
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      ;
      const response = await register({
        email: formData.email,
        password: formData.password,
        provider: "email",
        firstName: splitName(formData.name).firstName,
        lastName: splitName(formData.name).lastName,
        phone: formData.phone,
        role: "questioner",
        status: "active"
      });
      const data = await response.json();

      if (data.message) {
        setSuccessMessage(data.message);
        console.log(data)
        // Opcional: redirecionar após cadastro bem-sucedido
        // navigate('/login');
      } else {
        console.log(data)
        setError(data.message);
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro durante o cadastro');
    }
  };

  return (
    <div className="body-cadastro">
      <div className="signup-container-cadastro">
        <div className="signup-left-panel-cadastro">
          <img src={tiraDuvidasLogo} alt="Tira Dúvidas Logo" className="signup-logo-cadastro" />
        </div>
        <div className="signup-divider-cadastro"></div>
        <div className="signup-right-panel-cadastro">
          <h2 className="signup-title-cadastro">Cadastrar-se</h2>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          <form className="form-cadastro" onSubmit={handleSubmit}>
            <label className="label-cadastro">Nome Completo:</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Nome Completo" 
              className="input-cadastro"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label className="label-cadastro">Email:</label>
            <input 
              type="email" 
              name="email" 
              placeholder="email@email.com" 
              className="input-cadastro"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="label-cadastro">Telefone:</label>
            <input 
              type="tel" 
              name="phone" 
              placeholder="(XX) XXXXX-XXXX" 
              className="input-cadastro"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label className="label-cadastro">Senha:</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              className="input-cadastro"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className="label-cadastro">Confirmar Senha:</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="••••••••" 
              className="input-cadastro"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="button-cadastro">Cadastrar</button>
          </form>
          <span style={
            {
              display: "flex",
              justifyContent: "center"
            }
          }>
            <a 
              onClick={() => navigate("/login")} 
              style={{
                margin: "5px 0", 
                color: "black",
                fontSize: "12px",
                textAlign: "center"
              }}
            >
              Fazer login...
            </a>
          </span>

          <img src={ufmsLogo} alt="UFMS Logo" className="signup-ufms-logo-cadastro" />
        </div>
        
      </div>
    </div>
  );
}

export default Cadastro;