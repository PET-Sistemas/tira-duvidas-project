import React, { useState } from 'react';
import './Cadastro.css';
import tiraDuvidasLogo from '../Logo-Tira-Dúvidas-removebg.png';
import ufmsLogo from '../ufms-logo.png';
import { createUser } from '../../services/user.service.ts';

function Cadastro() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'questioner',  // valor padrão
    provider: 'email',  // valor padrão
    status: 'active'
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await createUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        provider: formData.provider,
        status: formData.status
      });
      
      const data = await response.json();
      
      if (data.message) {
        setSuccessMessage(data.message);
        // Limpar o formulário após sucesso
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          role: 'questioner',
          provider: 'email',
          status: 'active'
        });
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
            <label className="label-cadastro">Nome:</label>
            <input 
              type="text" 
              name="firstName" 
              placeholder="Nome" 
              className="input-cadastro"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label className="label-cadastro">Sobrenome:</label>
            <input 
              type="text" 
              name="lastName" 
              placeholder="Sobrenome" 
              className="input-cadastro"
              value={formData.lastName}
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
          <img src={ufmsLogo} alt="UFMS Logo" className="signup-ufms-logo-cadastro" />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;