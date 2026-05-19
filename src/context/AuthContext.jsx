import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem('isLogged');
  });

 
  const login = async (phone, password) => {
    try {
      const res = await fetch('https://najot-edu.softwareengineer.uz/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
      const data = await res.json();
      if (res.ok && data.accessToken) {
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('accessToken', data.accessToken);
        setUser('true');
        return { ok: true };
      }
      return { ok: false, message: data.message || 'Telefon yoki parol xato!' };
    } catch {
      return { ok: false, message: 'Server bilan ulanishda xatolik!' };
    }
  };

  const logout = () => {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
