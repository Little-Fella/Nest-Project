import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './RegisterPage.css'; 
import logo from './img/logo.png';
import vkIcon from './img/icons8-вконтакте.svg';
import telegramIcon from './img/logos_telegram.svg';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    phone: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Отправляем данные на бекенд
      const response = await axios.post('http://localhost:3000/patients', formData);
    
      // Обработка успешного ответа
      console.log('Registration successful:', response.data);
      setSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Registration failed');
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card2">
        <div className="logo logo-register">
          <img src={logo} alt="Tooth" />
        </div>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="first_name"
              placeholder="Имя"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="last_name"
              placeholder="Фамилия"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="date"
              name="birth_date"
              placeholder="Дата рождения"
              value={formData.birth_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Электронная почта"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
          <div className="socials">
            <a href="#">
              <img src={vkIcon} alt="VK" />
            </a>
            <a href="https://t.me/yourtelegram">
              <img src={telegramIcon} alt="Telegram" />
            </a>
          </div>
          <p className="already-have-account">Уже есть аккаунт? <Link className="log-link" to="/login">Войти</Link></p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
