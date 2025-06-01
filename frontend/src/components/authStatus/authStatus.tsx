import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import './authStatus.css';

export const AuthStatus = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (user?.email) {
    return (
      <div onClick={() => navigate('/profile')}>
        <button className='login'>
          {user.first_name} {user.last_name}
        </button>
      </div>
    );
  }

  return (
    <button  className="login" onClick={() => navigate('/login')}>
      Вход/Регистрация
    </button>
  );
};