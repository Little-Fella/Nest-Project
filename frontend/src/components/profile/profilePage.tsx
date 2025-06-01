import React from 'react';
import { Link } from 'react-router-dom';
import "./profilePage.css"
import logo from "./img/DENT.svg";

const UserProfilePage: React.FC = () => {
  return (
    <div>
      <header>
        <Link to="/#" className="back-button">Вернуться на главную</Link>
        <img src={logo} alt="DENT Logo" />
      </header>
      
      <div className="sections-container">
        {/* Секция с данными пользователя */}
        <section>
          <h2 className="your-data-header">Ваши Данные:</h2>
          <div className="your-data-container">
            <div className="your-data-item">
              <p>Имя: </p>
              <button className="change-button">Сменить</button>
            </div>
            <div className="your-data-item">
              <p>Фамилия: </p>
              <button className="change-button">Сменить</button>
            </div>
            <div className="your-data-item">
              <p>Электронная почта: </p>
              <button className="change-button">Сменить</button>
            </div>
            <div className="your-data-item">
              <p>Пароль: </p>
              <button className="change-button">Сменить</button>
            </div>
            <div className="your-data-item">
              <p>Номер телефона: </p>
              <button className="change-button">Сменить</button>
            </div>
            <div className="your-data-item">
              <p>Дата рождения: </p>
              <button className="change-button">Сменить</button>
            </div>
            <div className="your-data-item">
              <p>Последнее обновления профиля: </p>
            </div>
          </div>
        </section>

        {/* Секция с записями пользователя */}
        <section>
          <h2 className="your-data-header">Ваши Записи:</h2>
          <div className="filter-section">
            <button className="filter-button">Активные</button>
            <button className="filter-button">Завершённые</button>  
          </div>
          <div className="appointments-section">
            <p className="appointment-item"> ID name appoitment_date:appointment_time status</p>
          </div>
          <div className="controll-section">
            <button className="controll-button">Назад</button>
            <button className="controll-button">Вперёд</button> 
          </div>
        </section> 
      </div>
      
      <button className="exit-button">Выйти из аккаунта</button>
    </div>
  );
};

export default UserProfilePage;