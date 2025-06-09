import React, { useState } from 'react';
import './works.css';
import otbelivanie from "./img/implantacija-na-3d-illjustracii-.jpg"
import skol3 from "./img/skol3.png"
import viniry from "./img/viniry-posle.png"
import artem from "./img/artem.png"
import foto_zubov from "./img/foto_zubov_krishtianu_ronaldu_do_i_posle_breketov 2.png"
import maria from "./img/maria.png"
import maksim from "./img/maksim.png"
import ira from "./img/ira.png"

const WorksPage: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleFlip = (index: number) => {
    setFlippedCards([...flippedCards, index]);
  };

  const handleUnflip = (index: number) => {
    setFlippedCards(flippedCards.filter(i => i !== index));
  };

  const doctors = [
    {
      id: 1,
      front: {
        image: foto_zubov,
        title: "Металические брекеты",
        description: "Ортодонт успешно провел коррекцию прикуса с помощью металлических брекетов, обеспечен не только эстетичный результат, но и улучшение зубочелюстной системы.",
        doctorName: "Артём Ефремов"
      },
      back: {
        title: "Артём Ефремов · ортодонт",
        image: artem,
        description: "Исправление прикуса, брекет-системы. Эстетика и здоровье зубов — его приоритет."
      }
    },
    {
      id: 2,
      front: {
        image: otbelivanie,
        title: "Керамические виниры",
        description: "Пример эстетической реабилитации пациента с помощью 10 керамических виниров раствора Emax 3DSmile. Виниры из керамики с повышенной эстетикой выглядят, как красивые природные зубы.",
        doctorName: "Мария Сидорова"
      },
      back: {
        title: "Мария Сидорова · стоматолог",
        image: maria,
        description: "Общий приём. Современные методы лечения и бережный подход к каждому пациенту."
      }
    },
    {
      id: 3,
      front: {
        image: skol3,
        title: "Реставрация скола",
        description: "Доктор полностью удалил старые реставрации и заново восстановил структуру зуба с помощью светоотверждаемых материалов.",
        doctorName: "Максим Новиков"
      },
      back: {
        title: "Максим Новиков · хирург",
        image: maksim,
        description: "Специалист по хирургии с 10-летним стажем. Выполнил более 500 успешных операций."
      }
    },
    {
      id: 4,
      front: {
        image: viniry,
        title: "Виниры без брекетов",
        description: "При диагностике не было обнаружено серьезных проблем с прикусом, поэтому керамические виниры были установлены без ортодонтической подготовки. Также была проведена коррекция десневого контура для более привлекательного внешнего вида.",
        doctorName: "Ирина Гришина"
      },
      back: {
        title: "Ирина Гришина · детский стоматолог",
        image: ira,
        description: "Легко находит подход к детям. Профилактика и лечение с заботой и вниманием."
      }
    }
  ];

  return (
    
    <div className="works-page">
      {<div className="our-works-title">
          <h2 className="our-works-title-text">Наши работы</h2>
          <p className="item">До/После</p>
      </div>}

      <div className="cards">
        {doctors.map((doctor, index) => (
          <div 
            key={doctor.id}
            className={`card ${flippedCards.includes(index) ? 'flipped' : ''}`}
            onMouseLeave={() => handleUnflip(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={doctor.front.image} alt={doctor.front.title} />
                <h3>{doctor.front.title}</h3>
                <p>{doctor.front.description}</p>
                <div className="card-footer">
                  <span>{doctor.front.doctorName}</span>
                  <button 
                    className="flip-btn" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleFlip(index);
                    }}
                  >
                    Подробнее о докторе
                  </button>
                </div>
              </div>
              <div className="card-back">
                <h4>{doctor.back.title}</h4>
                <img src={doctor.back.image} alt={doctor.back.title} />
                <p>{doctor.back.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksPage;