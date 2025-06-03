import { useEffect } from "react";

export const useServices = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll(".service-btn");
    const contents = document.querySelectorAll(".service-content");

    const handleButtonClick = (button: HTMLButtonElement) => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      const serviceId = button.getAttribute("data-service");
      const content = document.getElementById(serviceId!);
      content?.classList.add("active");
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () =>
        handleButtonClick(button as HTMLButtonElement)
      );
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", () =>
          handleButtonClick(button as HTMLButtonElement)
        );
      });
    };
  }, []);
};
