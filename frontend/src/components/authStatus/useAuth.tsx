import { useState, useEffect } from 'react';

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Проверяем оба хранилища при загрузке
        const localToken = localStorage.getItem('access_token');
        const localUser = localStorage.getItem('user');
        const sessionToken = sessionStorage.getItem('access_token');
        const sessionUser = sessionStorage.getItem('user');

        if (localToken && localUser) {
            setToken(localToken);
            setUser(JSON.parse(localUser));
        } else if (sessionToken && sessionUser) {
            setToken(sessionToken);
            setUser(JSON.parse(sessionUser));
        }
        setIsLoading(false);
    }, []);

    const login = (access_token: string, user: UserData, rememberMe: boolean) => {
        if (rememberMe) {
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('user');
        } else {
            sessionStorage.setItem('access_token', access_token);
            sessionStorage.setItem('user', JSON.stringify(user));
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
        }
        setToken(access_token);
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return { token, user, isLoading, login, logout};
};