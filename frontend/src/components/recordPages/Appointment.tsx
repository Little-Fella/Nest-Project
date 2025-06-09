import React, { useState } from "react";
import { ProgressStepper } from "./Progress";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/Header";
import { Footer } from "../footer/footer";
import clinic1 from "./img/clinic1.jpg";
import clinic2 from "./img/clinic2.jpg";
import clinic3 from "./img/clinic3.jpg";
import clinic4 from "./img/clinic4.jpg";
import logo from "../header/DENT.svg";
type Clinic = { id: number; address: string; imageUrl: string };
type Specialty = { id: number; title: string; description: string };
interface Doctor {
  id: number;
  name: string;
  rating: number;
  experience: number;
  photoUrl: string;
  price: string;
  schedule: TimeSlot[];
}
interface TimeSlot {
  day: string;
  times: string[];
}

const Doctors: Doctor[] = [
  {
    id: 1,
    name: "Михаил Антонов",
    rating: 4.7,
    experience: 8,
    photoUrl: "https://example.com/photo1.jpg",
    price: "от 2 500 ₽",
    schedule: [
      { day: "ПН", times: ["08:00", "11:20", "17:00"] },
      { day: "ВТ", times: ["15:30"] },
      { day: "СР", times: ["09:30", "11:30", "13:30", "15:00", "16:30"] },
      { day: "ЧТ", times: ["10:00", "12:00", "13:00"] },
      {
        day: "ПТ",
        times: ["10:30", "13:30", "14:00", "15:30", "16:30", "17:00"],
      },
      { day: "СБ", times: ["09:05", "16:30"] },
      { day: "ВС", times: ["11:00", "13:00"] },
    ],
  },
  {
    id: 2,
    name: "Елена Смирнова",
    rating: 4.9,
    experience: 12,
    photoUrl: "https://example.com/photo2.jpg",
    price: "от 3 000 ₽",
    schedule: [
      { day: "ПН", times: ["08:00", "11:20", "17:00"] },
      { day: "ВТ", times: ["15:30"] },
      { day: "СР", times: ["09:30", "11:30", "13:30", "15:00", "16:30"] },
      { day: "ЧТ", times: ["10:00", "12:00", "13:00"] },
      {
        day: "ПТ",
        times: ["10:30", "13:30", "14:00", "15:30", "16:30", "17:00"],
      },
      { day: "СБ", times: ["09:05", "16:30"] },
      { day: "ВС", times: ["11:00", "13:00"] },
    ],
  },
  {
    id: 3,
    name: "Алексей Петров",
    rating: 4.8,
    experience: 10,
    photoUrl: "https://example.com/photo3.jpg",
    price: "от 4 500 ₽",
    schedule: [
      { day: "ПН", times: ["08:00", "11:20", "17:00"] },
      { day: "ВТ", times: ["15:30"] },
      { day: "СР", times: ["09:30", "11:30", "13:30", "15:00", "16:30"] },
      { day: "ЧТ", times: ["10:00", "12:00", "13:00"] },
      {
        day: "ПТ",
        times: ["10:30", "13:30", "14:00", "15:30", "16:30", "17:00"],
      },
      { day: "СБ", times: ["09:05", "16:30"] },
      { day: "ВС", times: ["11:00", "13:00"] },
    ],
  },
  {
    id: 4,
    name: "Ольга Иванова",
    rating: 4.6,
    experience: 15,
    photoUrl: "https://example.com/photo4.jpg",
    price: "от 5 000 ₽",
    schedule: [
      { day: "ПН", times: ["08:00", "11:20", "17:00"] },
      { day: "ВТ", times: ["15:30"] },
      { day: "СР", times: ["09:30", "11:30", "13:30", "15:00", "16:30"] },
      { day: "ЧТ", times: ["10:00", "12:00", "13:00"] },
      {
        day: "ПТ",
        times: ["10:30", "13:30", "14:00", "15:30", "16:30", "17:00"],
      },
      { day: "СБ", times: ["09:05", "16:30"] },
      { day: "ВС", times: ["11:00", "13:00"] },
    ],
  },
];

const clinics: Clinic[] = [
  {
    id: 1,
    address: "Адрес 1: ул. Вавилова, 4",
    imageUrl: clinic1,
  },
  {
    id: 2,
    address: "Адрес 2: ул. Берзарина, 16",
    imageUrl: clinic2,
  },
  {
    id: 3,
    address: "Адрес 3: Лубянский пр-д, дом 15, стр. 2",
    imageUrl: clinic3,
  },
  {
    id: 4,
    address: "Адрес 4: Селезневская ул., 34к3",
    imageUrl: clinic4,
  },
];

const specialties: Specialty[] = [
  {
    id: 1,
    title: "Хирург",
    description:
      "Удаляет зубы, проводит операции при заболеваниях полости рта, имплантацию",
  },
  {
    id: 2,
    title: "Детский стоматолог",
    description:
      "Специализируется на лечении молочных зубов, профилактике кариеса у детей, работе с маленькими пациентами",
  },
  {
    id: 2,
    title: "Ортодонт",
    description:
      "Исправляет прикус, устанавливает брекеты, капы и другие ортодонтические конструкции",
  },
  {
    id: 4,
    title: "Стоматолог",
    description:
      "Занимается протезированием зубов - коронками, мостами, съемными протезами",
  },
];

export const AppointmentWizard: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // от 0 до 3
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedClinic = clinics.find((c) => c.id === selectedId);
  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleAppointmentSubmit = () => {
    if (selectedDoctor && selectedDay && selectedTime) {
      // Здесь можно отправить данные на сервер или сохранить в состоянии
      alert(
        `Вы записаны к ${selectedDoctor.name} на ${selectedDay} в ${selectedTime}`
      );
      navigate("/profile"); // или другая логика
    } else {
      alert("Пожалуйста, выберите дату и время");
    }
  };
  return (
    <>
      <Header />
      <main className="body">
        <ProgressStepper activeStep={step} />

        {step === 0 && (
          <div className="clinic-selector">
            <h2>Выберите клинику</h2>
            <div className="clinic-content">
              <div className="clinic-list">
                {clinics.map((clinic) => (
                  <div
                    key={clinic.id}
                    className={`clinic-address ${
                      selectedId === clinic.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedId(clinic.id)}
                  >
                    {clinic.address}
                    <div className="underline" />
                  </div>
                ))}
              </div>

              <div className="clinic-photo">
                <img
                  src={selectedClinic ? selectedClinic.imageUrl : logo}
                  alt="Клиника"
                />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="clinic-selector">
            <h2>Выберите специальность</h2>
            <div className="option-grid">
              {specialties.map((s) => (
                <div
                  key={s.id}
                  className={`option-card ${
                    selectedSpecialty?.id === s.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSpecialty(s)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.textContent = s.description)
                  }
                  onMouseLeave={(e) => (e.currentTarget.textContent = s.title)}
                >
                  {s.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="doctor-selector">
            <h2>Выберите врача</h2>
            <div className="doctor-grid">
              {Doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`doctor-card ${
                    selectedDoctor?.id === doctor.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="doctor-photo">
                    <img src={doctor.photoUrl} alt={doctor.name} />
                  </div>
                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <div className="rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-value">{doctor.rating}</span>
                    </div>
                    <div className="doctor-meta">
                      <span className="experience">
                        {doctor.experience} лет опыта
                      </span>
                      <span className="price">{doctor.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="time-selector">
            <h2>Выберите дату и время</h2>

            <div className="appointment-card-3">
              {/* Карточка выбранного врача */}
              <div className="doctor-info-d">
                <div className="doctor-photo-d">
                  <img
                    src={selectedDoctor?.photoUrl || logo}
                    alt={selectedDoctor?.name}
                  />
                </div>
                <h3>{selectedDoctor?.name}</h3>
                <p className="specialty">{selectedSpecialty?.title}</p>
                <p className="experience">
                  {selectedDoctor?.experience} лет опыта
                </p>
              </div>

              <div className="section-d">
                <p>Доступные даты:</p>
                <div className="dates-scroll">
                  {selectedDoctor?.schedule.map((slot) => {
                    const [day, date] = slot.day.split(" ");
                    return (
                      <button
                        key={slot.day}
                        className={`date-btn ${
                          selectedDay === slot.day ? "active" : ""
                        }`}
                        onClick={() => setSelectedDay(slot.day)}
                      >
                        <span className="day">{day}</span>
                        {date && <span className="date">{date}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="section-d">
                <p>Доступное время:</p>
                <div className="times-grid">
                  {selectedDoctor?.schedule
                    .find((slot) => slot.day === selectedDay)
                    ?.times.map((time) => (
                      <button
                        key={time}
                        className={`time-btn ${
                          selectedTime === time ? "active" : ""
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                </div>
              </div>
              <div className="record-con">
                <button className="next-btn" onClick={handleAppointmentSubmit}>
                  Подтвердить запись
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="nav-buttons">
          {step > 0 && (
            <button onClick={goBack} className="select-button">
              ⬅ Назад
            </button>
          )}
          {step < 3 && (
            <button onClick={goNext} className="select-button">
              Далее ➡
            </button>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
