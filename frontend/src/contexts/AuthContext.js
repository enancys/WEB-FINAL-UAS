import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:8000/api/me', {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            localStorage.setItem('id', data.user.id); // Menyimpan ID pengguna di localStorage
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
          }
        } catch (err) {
          console.error('Failed to restore user:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('id');
        }
      }
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        console.error('Login failed:', errMsg);
        return null;
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.user.id); // Menyimpan ID pengguna setelah login
        setUser(data.user);
        return data.user;
      }

      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id'); // Menghapus ID dari localStorage saat logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
