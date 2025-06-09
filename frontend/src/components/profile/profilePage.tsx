import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authStatus/useAuth';
import "./profilePage.css"
import logo from "./img/DENT.svg";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  birth_date?: string;
  updatedAt: string;
}

interface LocalStorageUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface EditFieldModalProps {
  fieldName: string;
  currentValue: string;
  onSave: (newValue: string) => Promise<void>;
  onClose: () => void;
}

interface Appointment {
  id: number;
  serviceTitle: string;
  appointment_date: string;
  appointment_time: string;
  status: 'active' | 'completed';
}

const EditFieldModal: React.FC<EditFieldModalProps> = ({ 
  fieldName, 
  currentValue, 
  onSave, 
  onClose 
}) => {
  const [value, setValue] = useState(currentValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!value.trim()) {
      setError('Поле не может быть пустым');
      return;
    }

    try {
      setLoading(true);
      await onSave(value);
    } catch (err) {
      setError('Ошибка при сохранении. Попробуйте еще раз.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="modalOverlay" 
      onClick={handleOverlayClick}
    >
      <div className="modalContent">
        <h3 className="modalHeader">Изменить {fieldName}</h3>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          className="modalInput"
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
        {error && <div className="error">{error}</div>}
        <div className="modalButtons">
          <button 
            onClick={handleSave} 
            disabled={loading}
            className="saveButton"
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button 
            onClick={onClose} 
            disabled={loading}
            className="cancelButton"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

const UserProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<{
    field: keyof UserData;
    value: string;
  } | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  const fetchUserData = async () => {
    try {
      // Проверяем оба хранилища
      const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
      
      if (!userString) {
        throw new Error('Данные пользователя не найдены');
      }

      const user: LocalStorageUser = JSON.parse(userString);
      const userId = user.id;

      if (!userId) {
        throw new Error('ID пользователя не найден в данных');
      }

      const userResponse = await axios.get(`http://localhost:3000/patients/${userId}`);
      setUserData(userResponse.data);
      
      try {
        const appointmentsResponse = await axios.get(`http://localhost:3000/appointments/patient/${userId}`);
        setAppointments(appointmentsResponse.data);
      } catch (appointmentsError) {
        if (axios.isAxiosError(appointmentsError) && appointmentsError.response?.status === 404) {
          setAppointments([]);
        } else {
          throw appointmentsError;
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла неизвестная ошибка';
      setError(errorMessage);
      console.error('Ошибка при загрузке данных:', err);
      
      // Если ошибка связана с отсутствием данных, можно перенаправить на страницу входа
      if (err instanceof Error && err.message.includes('не найдены')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
      setAppointmentsLoading(false);
    }
  };

  fetchUserData();
}, []); 

  const handleEditClick = (field: keyof UserData, value: string) => {
    setEditingField({ field, value });
  };

  const handleCloseModal = () => {
    setEditingField(null);
  };

  const handleSaveChanges = async (field: keyof UserData, newValue: string) => {
    if (!userData) return;

    try {
      const userId = userData.id;
      const updatedData = { ...userData, [field]: newValue };
      
      await axios.put(`http://localhost:3000/patients/${userId}`, updatedData);
      
      setUserData(updatedData);
      if (field === 'first_name' || field === 'last_name') {
        const userString = localStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          user[field] = newValue;
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
    } catch (err) {
      console.error('Ошибка при обновлении данных:', err);
      throw err;
    }
  };

  const handleLogout = () => {
    logout(); // Это уже очищает оба хранилища (как мы модифицировали ранее)
    navigate('/login');
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (activeFilter === 'all') return true;
    return appointment.status === activeFilter;
  });

  if (loading) {
    return <div className="loading">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  if (!userData) {
    return <div className="error">Данные пользователя не найдены</div>;
  }

  return (
    <div>
      <header>
        <Link to="/#" className="back-button">Вернуться на главную</Link>
        <img src={logo} alt="DENT Logo" />
      </header>
      
      <div className="sections-container">
        {/* Секция с данными пользователя */}
        <section className='section'>
          <h2 className="your-data-header">Ваши Данные:</h2>
          <div className="your-data-container">
            <div className="your-data-item">
              <p>Имя: {userData.first_name}</p>
              <button 
                className="change-button"
                onClick={() => handleEditClick('first_name', userData.first_name)}
              >
                Сменить
              </button>
            </div>
            <div className="your-data-item">
              <p>Фамилия: {userData.last_name}</p>
              <button 
                className="change-button"
                onClick={() => handleEditClick('last_name', userData.last_name)}
              >
                Сменить
              </button>
            </div>
            <div className="your-data-item">
              <p>Электронная почта: {userData.email}</p>
              <button 
                className="change-button"
                onClick={() => handleEditClick('email', userData.email)}
              >
                Сменить
              </button>
            </div>
            <div className="your-data-item">
              <p>Пароль: ***********</p>
              <button className="change-button">Пока-что нельзя сменить</button>
            </div>
            <div className="your-data-item">
              <p>Номер телефона: {userData.phone || 'не указан'}</p>
              <button 
                className="change-button"
                onClick={() => handleEditClick('phone', userData.phone || 'Не указан')}
              >
                Сменить
              </button>
            </div>
            <div className="your-data-item">
              <p>Дата рождения: {userData.birth_date}</p>
              <button 
                className="change-button"
                onClick={() => handleEditClick('birth_date', userData.birth_date || 'Не указана')}
              >
                Сменить
              </button>
            </div>
            <div className="your-data-item">
              <p>Последнее обновления профиля: {userData.updatedAt}</p>
            </div>
          </div>
        </section>

        {/* Секция с записями пользователя */}
        <section>
        <h2 className="your-data-header">Ваши Записи:</h2>
        <div className="filter-section">
          <button 
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Все записи
          </button>
          <button 
            className={`filter-button ${activeFilter === 'active' ? 'active' : ''}`}
            onClick={() => setActiveFilter('active')}
          >
            Активные
          </button>
          <button 
            className={`filter-button ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Завершённые
          </button>  
        </div>
        <div className="appointments-section">
          {appointmentsLoading ? (
            <p>Загрузка записей...</p>
          ) : appointmentsError ? (
            <p className="error">Ошибка загрузки записей: {appointmentsError}</p>
          ) : filteredAppointments.length > 0 ? (
            <div className="appointments-list">
              {filteredAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-info">
                    <span className="appointment-id">ID: {appointment.id}, </span>
                    <span className="appointment-name">Услуга: {appointment.serviceTitle}, </span>
                    <span className="appointment-date">
                      Дата/время: {new Date(appointment.appointment_date).toLocaleDateString()}:{appointment.appointment_time},
                    </span>
                    <span className={`appointment-status ${appointment.status}`}> Статус: {appointment.status === 'active' ? 'Активна' : 'Завершена'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Нет записей</p>
          )}
        </div>
        {/* Убрал блок с пагинацией, так как показываем все записи */}
      </section> 
      </div>
      
      <button className="exit-button" onClick={handleLogout}>Выйти из аккаунта</button>
      {editingField && (
        <EditFieldModal
          fieldName={editingField.field.replace('_', ' ')}
          currentValue={editingField.value}
          onSave={async (newValue) => handleSaveChanges(editingField.field, newValue)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UserProfilePage;