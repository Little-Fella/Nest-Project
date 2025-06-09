import React, { useState, useEffect } from "react";
import { ProgressStepper } from "./Progress";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/Header";
import { Footer } from "../footer/footer";
import logo from "../header/DENT.svg";
import axios from "axios";
import logo1 from "./img/clinic1.jpg"

interface Clinic {
  id: number;
  address: string;
  photo_url: string;
}

interface Specialty {
  id: number;
  title: string;
  description: string;
}

interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  rating: number;
  photo_url: string;
  clinic_id: number;
  specialization: string;
}

interface Service {
  id: number;
  title: string;
  text: string;
  price: number;
  photo_url: string;
}

interface TimeSlot {
  id: number;
  serviceDate: string;
  serviceTime: string;
}

export const AppointmentWizard: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
  const [doctorsError, setDoctorsError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false);
  const [timeSlotsError, setTimeSlotsError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const specialties: Specialty[] = [
    {
      id: 1,
      title: "Стоматолог-терапевт",
      description: "Стоматолог-терапевт занимается лечением заболеваний зубов и мягких тканей полости рта консервативными методами, без хирургического вмешательства."
    },
    {
      id: 2,
      title: "Стоматолог-ортодонт",
      description: "Стоматолог-ортодонт – это специалист, занимающийся диагностикой, профилактикой и лечением аномалий зубочелюстной системы, в частности неправильного прикуса и неправильного расположения зубов."
    },
    {
      id: 3,
      title: "Стоматолог-ортопед",
      description: "Стоматолог-ортопед – это специалист, который занимается восстановлением и замещением утраченных или поврежденных зубов."
    },
    {
      id: 4,
      title: "Имплантолог",
      description: "Стоматолог-имплантолог - это специалист, который занимается восстановлением недостающих зубов путём установки имплантатов."
    }
  ];

  // Загрузка клиник при монтировании компонента
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clinics');
        setClinics(response.data.slice(0, 4)); // Берем первые 4 клиники
        setIsLoading(false);
      } catch (err) {
        setError("Не удалось загрузить список клиник");
        setIsLoading(false);
        console.error("Ошибка при загрузке клиник:", err);
      }
    };

    const savedClinicId = sessionStorage.getItem('selectedClinicId');
    if (savedClinicId) setSelectedId(Number(savedClinicId));
    
    const savedSpecialty = sessionStorage.getItem('selectedSpecialty');
    if (savedSpecialty) setSelectedSpecialty(JSON.parse(savedSpecialty));

    fetchClinics();



    if (step === 2) {
      const loadDoctors = async () => {
        const clinic_id = sessionStorage.getItem('selectedClinicId');
        const specialty = sessionStorage.getItem('selectedSpecialty');
        
        if (!clinic_id || !specialty) {
          setDoctorsError('Не выбрана клиника или специальность');
          return;
        }

        try {
          setIsLoadingDoctors(true);
          setDoctorsError(null);
          
          const parsedSpecialty = JSON.parse(specialty);
          const response = await axios.get(
            `http://localhost:3000/dentists/clinic/${clinic_id}/specialization/${parsedSpecialty.title}`
          );
          
          setDoctors(response.data);
          
          // Восстанавливаем выбранного врача, если он был
          const savedDoctor = sessionStorage.getItem('selectedDoctor');
          if (savedDoctor) {
            const doctor = response.data.find((d: Doctor) => d.id === JSON.parse(savedDoctor).id);
            if (doctor) setSelectedDoctor(doctor);
          }
        } catch (error) {
          setDoctorsError('Не удалось загрузить список врачей');
          console.error("Ошибка при загрузке врачей:", error);
        } finally {
          setIsLoadingDoctors(false);
        }
      };

      loadDoctors();
    } 

    if (step === 3) {
      const loadServices = async () => {
        const selectedDoctor = sessionStorage.getItem('selectedDoctor');
        
        if (!selectedDoctor) {
          setServicesError('Не выбран врач');
          return;
        }

        try {
          setIsLoadingServices(true);
          setServicesError(null);
          
          const doctor = JSON.parse(selectedDoctor);
          const response = await axios.get(
            `http://localhost:3000/services/dentist/${doctor.id}`
          );
          
          setServices(response.data);
          
          // Восстанавливаем выбранную услугу, если она была
          const savedService = sessionStorage.getItem('selectedService');
          if (savedService) {
            const service = response.data.find((s: Service) => s.id === JSON.parse(savedService).id);
            if (service) setSelectedService(service);
          }
        } catch (error) {
          setServicesError('Не удалось загрузить список услуг');
          console.error("Ошибка при загрузке услуг:", error);
        } finally {
          setIsLoadingServices(false);
        }
      };

      loadServices();
    }

    if (step === 4) {
      const loadTimeSlots = async () => {
        const selectedService = sessionStorage.getItem('selectedService');
        
        if (!selectedService) {
          setTimeSlotsError('Не выбрана услуга');
          return;
        }

        try {
          setIsLoadingTimeSlots(true);
          setTimeSlotsError(null);
          
          const service = JSON.parse(selectedService);
          const response = await axios.get(
            `http://localhost:3000/services/date/${service.id}`
          );
          
          setTimeSlots(response.data);
          
          // Восстанавливаем выбранный слот, если он был
          const savedTimeSlot = sessionStorage.getItem('selectedTimeSlot');
          if (savedTimeSlot) {
            const slot = response.data.find((t: TimeSlot) => t.id === JSON.parse(savedTimeSlot).id);
            if (slot) {
              setSelectedTimeSlot(slot);
              setSelectedDate(new Date(slot.serviceDate).toISOString().split('T')[0]);
            }
          }
        } catch (error) {
          setTimeSlotsError('Не удалось загрузить доступное время');
          console.error("Ошибка при загрузке временных слотов:", error);
        } finally {
          setIsLoadingTimeSlots(false);
        }
      };

      loadTimeSlots();
    }
  }, [step]);

  // Обработчик выбора клиники
  const handleClinicSelect = (id: number) => {
    setSelectedId(id);
    // Сохраняем выбранную клинику в sessionStorage
    sessionStorage.setItem('selectedClinicId', id.toString());
  };

  const handleSpecialtySelect = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    // Сохраняем в sessionStorage
    sessionStorage.setItem('selectedSpecialty', JSON.stringify(specialty));
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    sessionStorage.setItem('selectedDoctor', JSON.stringify(doctor));
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    sessionStorage.setItem('selectedService', JSON.stringify(service));
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    sessionStorage.setItem('selectedTimeSlot', JSON.stringify(timeSlot));
  };

  const handleAppointmentSubmit = async () => {
  if (!selectedTimeSlot) {
    alert("Пожалуйста, выберите время");
    return;
  }

  try {
    // Получаем user_id из хранилища
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!user) {
      alert("Пользователь не авторизован");
      navigate('/login');
      return;
    }
    
    const userData = JSON.parse(user);
    const userId = userData.id;

    // Получаем service_id из sessionStorage
    const selectedService = sessionStorage.getItem('selectedService');
    if (!selectedService) {
      alert("Услуга не выбрана");
      return;
    }
    const serviceData = JSON.parse(selectedService);
    const serviceId = serviceData.id;

    // Подготавливаем данные для отправки
    const appointmentData = {
      patient_id: userId,       // ID пользователя
      service_id: serviceId, // ID услуги
      appointment_date: selectedTimeSlot.serviceDate, // Дата услуги
      appointment_time: selectedTimeSlot.serviceTime  // Время услуги
    };

    // Отправка данных на сервер
    const response = await axios.post(
      'http://localhost:3000/appointments',
      appointmentData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }
      
    );
    console.log(appointmentData);
    if (response.status === 200 || response.status === 201) {
      // Очищаем sessionStorage после успешной записи
      ['selectedClinicId', 'selectedSpeciality', 'selectedDoctor', 
       'selectedService', 'selectedTimeSlot'].forEach(key => {
        sessionStorage.removeItem(key);
      });
      
      // Перенаправляем на страницу подтверждения
      navigate('/profile', { state: { appointmentData: response.data } });
    }
  } catch (error) {
    console.error("Ошибка при записи:", error);
    alert("Произошла ошибка при записи. Пожалуйста, попробуйте еще раз.");
  }
};

  const groupedTimeSlots = timeSlots.reduce((acc: Record<string, TimeSlot[]>, slot) => {
    const date = new Date(slot.serviceDate).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {});

  const filteredTimeSlots = selectedDate 
    ? groupedTimeSlots[selectedDate] || []
    : timeSlots;

  // Переход к следующему шагу только если клиника выбрана
  const goNext = () => {
    if (step === 0 && !selectedId) {
      alert("Пожалуйста, выберите клинику");
      return;
    }
    if (step === 1 && !selectedSpecialty) {
      alert("Пожалуйста, выберите специальность");
      return;
    }
    if (step === 2 && !selectedDoctor) {
      alert("Пожалуйста, выберите врача");
      return;
    }
    if (step === 3 && !selectedService) {
      alert("Пожалуйста, выберите услугу");
      return;
    }
    setStep((s) => Math.min(s + 1, 4)); // Увеличили максимальный шаг до 4
  };

  const selectedClinic = clinics.find((c) => c.id === selectedId);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="body">
          <div className="loading">Загрузка клиник...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="body">
          <div className="error">{error}</div>
        </main>
        <Footer />
      </>
    );
  }

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
                    onClick={() => handleClinicSelect(clinic.id)}
                  >
                    {clinic.address}
                    <div className="underline" />
                  </div>
                ))}
              </div>

              <div className="clinic-photo">
                <img
                  src={selectedClinic?.photo_url || logo1}
                  alt="Клиника"
                  onError={(e) => {
                  (e.target as HTMLImageElement).src = logo;
                  }}
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
                  onClick={() => handleSpecialtySelect(s)}
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
            {doctors.map((doctor) => (
              <div 
                key={doctor.id} 
                className={`doctor-card ${selectedDoctor?.id === doctor.id ? "selected" : ""}`}
                onClick={() => {
                  handleDoctorSelect(doctor);
                  sessionStorage.setItem('selectedDoctor', JSON.stringify(doctor));
                }}
              >
                <div className="doctor-photo">
                  <img 
                    src={doctor.photo_url || '/default-doctor.jpg'} 
                    alt={doctor.first_name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-doctor.jpg';
                    }}
                  />
                </div>
                <div className="doctor-info">
                  <h3>{doctor.first_name} {doctor.last_name}</h3>
                  <div className="rating">
                    {'★'.repeat(Math.round(doctor.rating))}
                    {'☆'.repeat(5 - Math.round(doctor.rating))}
                    <span className="rating-value">{doctor.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
          <div className="service-selector">
            <h2>Выберите услугу</h2>
            
            {isLoadingServices ? (
              <div className="loading">Загрузка списка услуг...</div>
            ) : servicesError ? (
              <div className="error">{servicesError}</div>
            ) : services.length === 0 ? (
              <div className="no-services">Нет доступных услуг для выбранного врача</div>
            ) : (
              <div className="service-grid">
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className={`service-card ${selectedService?.id === service.id ? "selected" : ""}`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="service-photo">
                      <img 
                        src={service.photo_url} 
                        alt={service.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/default-service.jpg';
                        }}
                      />
                    </div>
                    <div className="service-info">
                      <h3>{service.title}</h3>
                      <p className="service-description">
                        {service.text.length > 100 
                          ? `${service.text.substring(0, 100)}...` 
                          : service.text}
                      </p>
                      <div className="service-price">
                        {service.price} ₽
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {step === 4 && (
          <div className="time-selector">
            <h2>Выберите время записи</h2>
            
            {isLoadingTimeSlots ? (
              <div className="loading">Загрузка доступного времени...</div>
            ) : timeSlotsError ? (
              <div className="error">{timeSlotsError}</div>
            ) : timeSlots.length === 0 ? (
              <div className="no-slots">Нет доступных временных слотов</div>
            ) : (
              <>
                <div className="date-selection">
                  <h3>Выберите дату</h3>
                  <div className="date-buttons">
                    {Object.keys(groupedTimeSlots).map(date => (
                      <button
                        key={date}
                        className={`date-button ${selectedDate === date ? "selected" : ""}`}
                        onClick={() => setSelectedDate(date)}
                      >
                        {new Date(date).toLocaleDateString('ru-RU', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short'
                        })}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="time-selection">
                  <h3>Доступное время</h3>
                  <div className="time-buttons">
                    {filteredTimeSlots.map(slot => (
                      <button
                        key={slot.id}
                        className={`time-button ${
                          selectedTimeSlot?.id === slot.id ? "selected" : ""
                        }`}
                        onClick={() => handleTimeSlotSelect(slot)}
                      >
                        {slot.serviceTime}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  className="confirm-button"
                  onClick={handleAppointmentSubmit}
                  disabled={!selectedTimeSlot}
                >
                  Подтвердить запись
                </button>
              </>
            )}
          </div>
        )}
        <div className="nav-buttons">
          {step > 0 && (
            <button onClick={() => setStep((s) => Math.max(s - 1, 0))} className="select-button">
              ⬅ Назад
            </button>
          )}
          {step < 4 && (
            <button 
              onClick={goNext} 
              className="select-button"
              disabled={selectedId === null} // Кнопка неактивна, если клиника не выбрана
            >
              Далее ➡
            </button>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};