// src/pages/Home.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useServices } from "./hooks/useServices";
import { useNavigate } from "react-router-dom";
import { useHamburgerMenu } from "./hooks/useHamburgerMenu";
import { useFAQ } from "./hooks/useFAQ";
//import { useModelViewer } from "./hooks/useModelViewer";
import { useSlider } from "./hooks/useSlider";
import { Header } from "../header/Header";
//import "@google/model-viewer";
import "./mainPage.css";
import protezImage from "./img/protez.png";
import smileImage from "./img/smile.png";
import viniryDoImage from "./img/viniry-do.png";
import viniryPosleImage from "./img/viniry-posle.png";
import maksimImage from "./img/maksim.png";
import iraImage from "./img/ira.png";
import artemImage from "./img/artem.png";
import mariaImage from "./img/maria.png";
import otbelivaniyeZubovImage from "./img/otbelivaniye-zubov1.jpg";
import implantacijaImage from "./img/implantacija-na-3d-illjustracii-.jpg";
import kariesImage from "./img/karies.jpg";
import gigienaImage from "./img/gigiena.jpeg";
import { Footer } from "../footer/footer";
import ReviewsSection from "./reviews/reviews";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { activeQuestion, toggleQuestion } = useFAQ();

  const questions = [
    {
      id: "q1",
      question: "Какова средняя продолжительность приема?",
      answer:
        "Средняя продолжительность приема составляет 30-60 минут в зависимости от сложности процедуры.",
    },
    {
      id: "q2",
      question: "Какие часы работы клиники?",
      answer:
        "Мы работаем с понедельника по пятницу с 9:00 до 21:00, в субботу с 10:00 до 18:00. Воскресенье - выходной.",
    },
    {
      id: "q3",
      question: "Даете ли вы гарантию на лечение?",
      answer:
        "Да, мы предоставляем гарантию на все виды лечения. Срок гарантии зависит от конкретной процедуры и указывается в договоре.",
    },
    {
      id: "q4",
      question: "Как подготовиться к первому визиту?",
      answer:
        "Рекомендуем: 1) Не есть за 1-1.5 часа до приема; 2) Почистить зубы перед визитом; 3) Взять с собой медицинскую карту (если есть); 4) Прийти на 10 минут раньше для оформления.",
    },
    {
      id: "q5",
      question: "Какие методы стерилизации вы используете?",
      answer:
        "Мы используем многоэтапную стерилизацию: 1) Дезинфекция в ультразвуковой ванне; 2) Автоклавирование при 134°C; 3) Хранение в стерильных пакетах. Все инструменты одноразовые или проходят полный цикл стерилизации.",
    },
  ];
  // Используем наши хуки
  useServices();
  useHamburgerMenu();
  useFAQ();
  useSlider();
  //useModelViewer();

  const handleAppointmentClick = () => {
    // Проверяем наличие пользователя в localStorage или sessionStorage
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (user) {
      // Если пользователь есть, перенаправляем на страницу записи
      navigate('/appointment');
    } else {
      // Если пользователя нет, перенаправляем на страницу входа
      navigate('/login');
    }
  };

  return (
    <main>
      {/* Header Section */}
      <Header />
      <section className="header-info">
        <div className="header-info-block">
          <div className="header-info-block-text">
            <p className="header-info-number">1000+</p>
            <p className="header-info-block-title">здоровых улыбок</p>
            <p className="header-info-text-i">
              Мы создаем улыбки, которые
              <br /> меняют жизни людей
            </p>
            <button className="record" onClick={handleAppointmentClick}>
              Записаться на прием
            </button>
          </div>
          <div className="header-info-blocks">
            <div className="header-info-left-block">
              <p className="header-info-text">
                Пациенты с<br /> идеальной улыбкой
              </p>
              <p className="header-info-block-number">100%</p>
            </div>

            <div className="header-info-right-block">
              <div className="header-info-right-block-top">
                <p className="header-info-block-number">10</p>
                <p className="header-info-text-t">
                  лет
                  <br /> опыта
                </p>
              </div>
              <p className="header-info-text">Средний стаж наших врачей</p>
            </div>
          </div>
        </div>
        {/* <model-viewer
          id="tooth-model"
          src="/img/scene.glb"
          alt="3D модель зуба"
          camera-controls
          exposure="0.6"
          auto-rotate
          shadow-intensity="1"
          interaction-prompt="none"
          bounds="tight"
        >
          <button
            className="hotspot"
            slot="hotspot-crown"
            data-position="0.3m 3m -0.5m"
            data-normal="0m 1m 0m"
            data-info="Лечение кариеса: 5 000₽"
          ></button>
          <button
            className="hotspot"
            slot="hotspot-root"
            data-position="0.2m 1m 0.4m"
            data-normal="0m -1m 0m"
            data-info="Чистка каналов: 8 000₽"
          ></button>
          <button
            className="hotspot"
            slot="hotspot-front"
            data-position="0m 2.5m 0.5m"
            data-normal="0m 0m 1m"
            data-info="Реставрация: 6 500₽"
          ></button>
          <button
            className="hotspot"
            slot="hotspot-occlusal"
            data-position="0m 3m 0m"
            data-normal="0m 1m 0m"
            data-info="Герметизация фиссур: 4 000₽"
          ></button>
        </model-viewer>
        <div id="tooltip"></div> */}
      </section>

      {/* About Us Section */}
      <section className="text">
        <p>
          CrystalDent - это современное и комфортное пространстов. Мы предлагаем
          высококачественные стоматологические услуги, основанные на современных
          методах лечения, чтобы каждый пациент чувствовал себя уверенно и
          спокойно на пути к здоровой и красивой улыбке.
        </p>
      </section>

      <section className="about-us">
        <div className="top-row">
          <div className="about-us container">
            <p className="item">О нас</p>
            <h3>Клиника CrystalDent</h3>
            <p className="description">
              Мы - современная клиника, предлагающая широкий спектр
              <br /> услуг по диагностике и лечению заболеваний зубов, десен и
              ротовой полости.
            </p>
          </div>
          <img src={protezImage} alt="Протезирование" />
        </div>
      </section>

      {/* Services Section */}
      <h2 id="works" className="our-works-title-text">
        Наши услуги
      </h2>
      <div id="services" className="services">
        <div className="services-list">
          <button className="service-btn active" data-service="veneers">
            Виниры
          </button>
          <button className="service-btn" data-service="prosthetics">
            Протезирование
          </button>
          <button className="service-btn" data-service="whitening">
            Отбеливание зубов
          </button>
          <button className="service-btn" data-service="implantation">
            Имплантация
          </button>
          <button className="service-btn" data-service="caries">
            Лечение кариеса
          </button>
          <button className="service-btn" data-service="hygiene">
            Профессиональная гигиена
          </button>
        </div>

        <div className="service-info container">
          <div className="service-content active" id="veneers">
            <div className="service-text">
              <h3 className="item">Виниры</h3>
              <p className="service-price">83 200 руб</p>
            </div>
            <div className="top-row">
              <img src={smileImage} alt="Виниры" className="service-image" />
              <p className="service-description">
                Винирование – современный способ для исправления зубов и
                достижения голливудской улыбки. Приобретенные дефекты можно
                подкорректировать с помощью ортопедического лечения.
              </p>
            </div>
          </div>
          <div className="service-content" id="prosthetics">
            <div className="service-text">
              <h3 className="item">Протезирование</h3>
              <p className="service-price">45 000 руб</p>
            </div>
            <div className="top-row">
              <img
                src={protezImage}
                alt="Протезирование"
                className="service-image"
              />
              <p className="service-description">
                Современные методы протезирования позволяют восстановить
                утраченные зубы с максимальным комфортом и естественным внешним
                видом.
              </p>
            </div>
          </div>
          <div className="service-content" id="whitening">
            <div className="service-text">
              <h3 className="item">Отбеливание зубов</h3>
              <p className="service-price">25 000 руб</p>
            </div>
            <div className="top-row">
              <img
                src={otbelivaniyeZubovImage}
                alt="Отбеливание"
                className="service-image"
              />
              <p className="service-description">
                Профессиональное отбеливание зубов поможет вернуть естественную
                белизну и сделать улыбку более привлекательной.
              </p>
            </div>
          </div>
          <div className="service-content" id="implantation">
            <div className="service-text">
              <h3 className="item">Имплантация</h3>
              <p className="service-price">65 000 руб</p>
            </div>
            <div className="top-row">
              <img
                src={implantacijaImage}
                alt="Имплантация"
                className="service-image"
              />
              <p className="service-description">
                Имплантация зубов - надежный и долговечный способ восстановления
                утраченных зубов с сохранением всех функций.
              </p>
            </div>
          </div>
          <div className="service-content" id="caries">
            <div className="service-text">
              <h3 className="item">Лечение кариеса</h3>
              <p className="service-price">8 000 руб</p>
            </div>
            <div className="top-row">
              <img src={kariesImage} alt="Кариес" className="service-image" />
              <p className="service-description">
                Современное лечение кариеса без боли и дискомфорта с
                использованием качественных материалов.
              </p>
            </div>
          </div>
          <div className="service-content" id="hygiene">
            <div className="service-text">
              <h3 className="item">Профессиональная гигиена</h3>
              <p className="service-price">12 000 руб</p>
            </div>
            <div className="top-row">
              <img src={gigienaImage} alt="Гигиена" className="service-image" />
              <p className="service-description">
                Комплексная чистка зубов у стоматолога поможет сохранить
                здоровье зубов и десен на долгие годы.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Works Section */}
      <section className="our-works">
        <div className="our-works-title">
          <h2 id="works" className="our-works-title-text">
            Наши работы
          </h2>
          <p className="item">До/После</p>
        </div>

        <div className="slider-text-block">
          <div className="slider-container">
            <img src={viniryDoImage} id="before" alt="До" />
            <img src={viniryPosleImage} id="after" alt="После" />

            <div className="slider-handle">
              <div className="arrows">
                <svg viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
                <svg viewBox="0 0 24 24">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                </svg>
              </div>
            </div>

            <div className="slider-text after-text"></div>
            <div className="slider-text before-text"></div>
          </div>

          <div className="our-works-text">
            <h4>Виниры без брекетов</h4>
            <p className="description">
              При диагностике не было обнаружено серьезных проблем с прикусом,
              поэтому керамические виниры были установлены без ортодонтической
              подготовки. Также была проведена коррекция десневого контура для
              более привлекательного внешнего вида.
            </p>
            <div className="footer-our-works">
              <p className="our-works-text-name">Артём Ефремов</p>
              <p className="our-works-text-doctor">· ортодонт</p>
            </div>
            <div className="our-works-button-wrapper">
              <a href="#works" className="our-works-button">
                Смотреть работы →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specialists Section */}
      <section id="specialists" className="specialists-section">
        <h2 className="doctors-title">Наши специалисты</h2>
        <div className="specialists">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="specialist-role">Хирург</div>
                <img src={maksimImage} alt="Максим Новиков" />
                <div className="specialist-name">Максим Новиков</div>
              </div>
              <div className="flip-card-back">
                <h3>Максим Новиков</h3>
                <p>
                  Специалист по хирургии с 10-летним стажем. Выполнил более 500
                  успешных операций.
                </p>
              </div>
            </div>
          </div>

          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="specialist-role">Детский стоматолог</div>
                <img src={iraImage} alt="Ирина Гришина" />
                <div className="specialist-name">Ирина Гришина</div>
              </div>
              <div className="flip-card-back">
                <h3>Ирина Гришина</h3>
                <p>
                  Легко находит подход к детям. Профилактика и лечение с заботой
                  и вниманием.
                </p>
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="specialist-role">Ортодонт</div>
                <img src={artemImage} alt="Артём Ефремов" />
                <div className="specialist-name">Артём Ефремов</div>
              </div>
              <div className="flip-card-back">
                <h3>Артём Ефремов</h3>
                <p>
                  Исправление прикуса, брекет-системы. Эстетика и здоровье зубов
                  — его приоритет.
                </p>
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="specialist-role">Стоматолог</div>
                <img src={mariaImage} alt="Мария Сидорова" />
                <div className="specialist-name">Мария Сидорова</div>
              </div>
              <div className="flip-card-back">
                <h3>Мария Сидорова</h3>
                <p>
                  Общий приём. Современные методы лечения и бережный подход к
                  каждому пациенту.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}    
      <ReviewsSection />

      {/* FAQ Section */}
      <section id="asks" className="qq">
        <h1>Часто задаваемые вопросы</h1>
        <div className="qq-content">
          {questions.map((q) => (
            <div key={q.id} className="qq-card">
              <hr />
              <div className="qq-bottom">
                <p className="qq-card-text">{q.question}</p>
                <button
                  className={`ans ${activeQuestion === q.id ? "active" : ""}`}
                  onClick={() => toggleQuestion(q.id)}
                >
                  <svg
                    className="ans-icon"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M7 10l5 5 5-5z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <div
                className={`ans-content ${
                  activeQuestion === q.id ? "active" : ""
                }`}
              >
                <p>{q.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Home;
