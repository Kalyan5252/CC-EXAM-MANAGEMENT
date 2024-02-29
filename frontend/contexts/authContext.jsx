'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  // const [authUser, setAuthUser] = useState(() => {
  //   if (typeof window !== 'undefined') {
  //     console.log('browser');
  //     const storedUser = localStorage.getItem('login-user');
  //     return storedUser ? JSON.parse(storedUser) : null;
  //   } else {
  //     console.log('non-browser');
  //     return null;
  //   }
  // });
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem('login-user');
    if (user) {
      setAuthUser(user);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
