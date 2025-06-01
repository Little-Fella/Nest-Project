import { useState, useEffect } from 'react';

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (access_token: string, user: UserData) => {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(access_token);
    setUser(user);
    }
    

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return { token, user, isLoading, login, logout };
};