import { useEffect } from "react";

export const useHamburgerMenu = () => {
  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".header-menu");

    const toggleMenu = () => {
      hamburger?.classList.toggle("active");
      menu?.classList.toggle("active");
    };

    hamburger?.addEventListener("click", toggleMenu);

    return () => {
      hamburger?.removeEventListener("click", toggleMenu);
    };
  }, []);
};
