import logoFooter from "./logo-footer.png";
import "./footer.css";
import { useNavigate } from "react-router-dom";
export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <section className="footer">
        <img src={logoFooter} alt="Логотип" />
        <div className="footer-text">
          <h4>Навигация</h4>
          <a href="#services">Услуги</a>
          <a href="#doctors">Врачи</a>
          <a href="#works">Наши работы</a>
          <a href="#asks">Ваши вопросы</a>
        </div>
        <div id="contacts" className="footer-text">
          <h4>Контакты</h4>
          <p>
            Адрес: ул. Генерала Белова 6<br />
            Телефон: +7 999 999 99 99
            <br />
            Почта: zybu@gmail.com
          </p>
        </div>
        <button className="record" onClick={() => navigate("/appointment")}>
          Записаться на прием
        </button>
      </section>
    </footer>
  );
};
