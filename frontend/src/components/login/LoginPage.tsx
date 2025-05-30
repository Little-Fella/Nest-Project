import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginPage.css';
import logo from "./img/logo.png";
import vkIcon from "./img/icons8-вконтакте.svg";
import telegramIcon from "./img/logos_telegram.svg";

const LoginPage = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Отправляем данные на бэкенд
      const response = await axios.post("http://localhost:3000/patients/login", formData);

      // Обрабатываем успешный ответ
      console.log("Успешный вход:", response.data);
      alert("Успешный вход!")
      
      // Сохраняем токен, если нужно
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        
        // Если стоит галочка "Запомнить меня", сохраняем токен долгосрочно
        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
      }

      navigate("/registration"); // Замените на нужный вам защищенный маршрут

    } catch (err) {
      // Правильная обработка ошибок для TypeScript
      if (axios.isAxiosError(err)) {
        // Ошибка Axios (HTTP ошибка)
        setError(err.response?.data?.message || "Произошла ошибка при входе");
        console.error("Ошибка Axios:", err.response?.data);
        alert("Неправильный пароль!")
      } else if (err instanceof Error) {
        // Нативная ошибка JavaScript
        setError(err.message);
        console.error("Ошибка:", err.message);
      } else {
        // Неизвестная ошибка
        setError("Произошла неизвестная ошибка");
        console.error("Неизвестная ошибка:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="logo logo-login">
          <img src={logo} alt="Tooth" />
        </div>
        <h2>Вход в личный кабинет</h2>
        <form onSubmit={handleSubmit}>
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

          <div className="options">
            <label>
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              /> 
              Запомнить меня
            </label>
            <a href="#" className="forgot-password">Забыли пароль?</a>
          </div>

          <button type="submit" className="btn">Войти</button>

          <div className="socials">
            <a href="#">
              <img src={vkIcon} alt="VK" />
            </a>
            <a href="https://t.me/yourtelegram">
              <img src={telegramIcon} alt="Telegram" />
            </a>
          </div>

          <p className="already-have-account">
            Нет аккаунта?{' '}
            <Link to="/registration" className="log-link">
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;