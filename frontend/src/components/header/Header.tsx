import logoImg from './DENT.svg';
import { Link } from "react-router-dom";
import "./Header.css"
import { AuthStatus } from '../authStatus/authStatus';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logoImg} alt="CrystalDent" />
      </div>
      <nav className="header-menu">
        <ul className="header-menu-list">
          <li className="header-menu-item">
            <a href="#" className="header-menu-link">Наши услуги</a>
          </li>
          <li className="header-menu-item">
            <a href="#" className="header-menu-link">Врачи</a>
          </li>
          <li className="header-menu-item">
            <a href="#" className="header-menu-link">Цены</a>
          </li>
          <li className="header-menu-item">
            <a href="#" className="header-menu-link">Контакты</a>
          </li>
        </ul>
      </nav>
      <AuthStatus />
    </header>
  );
};
