import React, { useState } from "react";
import { ProgressStepper } from "./Progress";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/Header";
import clinic1 from "./img/clinic1.jpg";
import clinic2 from "./img/clinic2.jpg";
import clinic3 from "./img/clinic3.jpg";
import clinic4 from "./img/clinic4.jpg";
import logo from "../header/DENT.svg";
type Clinic = { id: number; address: string; imageUrl: string };
type Specialty = { id: number; title: string; description: string };

const clinics: Clinic[] = [
  {
    id: 1,
    address: "Адрес 1: AAAAAAAAAAAAAAAAAAAAAAAA",
    imageUrl: clinic1,
  },
  {
    id: 2,
    address: "Адрес 2: BBBBBBBBBBBBBBBBBBBBBBBB",
    imageUrl: clinic2,
  },
  {
    id: 3,
    address: "Адрес 3: CCCCCCCCCCCCCCCCCCCCCCCC",
    imageUrl: clinic3,
  },
  {
    id: 4,
    address: "Адрес 4: DDDDDDDDDDDDDDDDDDDDDDDD",
    imageUrl: clinic4,
  },
];

const specialties: Specialty[] = [
  { id: 1, title: "Терапевт", description: "Лечит общее состояние зубов" },
  { id: 2, title: "Хирург", description: "Удаляет зубы и проводит операции" },
];

export const AppointmentWizard: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // от 0 до 3
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(
    null
  );

  const selectedClinic = clinics.find((c) => c.id === selectedId);
  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <main className="body">
      <Header />
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

          {selectedId && (
            <div className="selection-footer">
              <button className="select-button" onClick={goNext}>
                Выбрать
              </button>
            </div>
          )}
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

      {/* Шаг 2 и 3 пока-заглушки */}
      {step === 2 && <h2>Выбор врача (ещё не реализовано)</h2>}
      {step === 3 && <h2>Выбор времени записи (ещё не реализовано)</h2>}

      <div className="nav-buttons">
        {step > 0 && <button onClick={goBack}>⬅ Назад</button>}
        {step < 3 && <button onClick={goNext}>Далее ➡</button>}
      </div>
    </main>
  );
};
