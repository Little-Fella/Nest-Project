import logoImg from "./DENT.svg";
import { Link } from "react-router-dom";
import "../mainPage/mainPage.css";
import { AuthStatus } from "../authStatus/authStatus";
import { HamburgerMenu } from "./hamburger";

export const Header = () => {
  return (
    <header className="header">
      <HamburgerMenu />
      <div className="header-logo">
        <img src={logoImg} alt="CrystalDent" />
      </div>
      <nav className="header-menu">
        <ul className="header-menu-list">
          <li className="header-menu-item">
            <a href="#" className="header-menu-link">
              Услуги
            </a>
          </li>
          <li className="header-menu-item">
            <a href="#" className="header-menu-link">
              Врачи
            </a>
          </li>
          <li className="header-menu-item">
            <a href="#" className="header-menu-link">
              Наши работы
            </a>
          </li>
          <li className="header-menu-item">
            <a href="#" className="header-menu-link">
              Ваши вопросы
            </a>
          </li>
        </ul>
      </nav>
      <AuthStatus />
    </header>
  );
};
