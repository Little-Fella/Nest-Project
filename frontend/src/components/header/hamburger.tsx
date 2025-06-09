import { useState } from "react";

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    // Также переключаем класс для меню
    const menu = document.querySelector(".header-menu");
    menu?.classList.toggle("active");
  };

  return (
    <button
      className={`hamburger ${isOpen ? "active" : ""}`}
      onClick={toggleMenu}
      aria-label="Меню"
      aria-expanded={isOpen}
    >
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
    </button>
  );
};
