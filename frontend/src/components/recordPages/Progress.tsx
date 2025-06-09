import React from "react";
import "./Appointment.css";

interface ProgressStepperProps {
  activeStep: number;
}

const steps = [
  "Выбор клиники",
  "Выбор специальности врача",
  "Выбор врача",
  "Выбор услуги",
  "Выбор времени записи",
];

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  activeStep,
}) => {
  return (
    <div className="progress-stepper">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`step ${activeStep >= index ? "active" : ""}`}
        >
          <div className="circle" />
          <span className="label">{label}</span>
        </div>
      ))}
    </div>
  );
};
