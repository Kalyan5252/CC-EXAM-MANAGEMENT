import { useState, useEffect, useContext } from 'react';
import { AuthContext, useAuthContext } from '../contexts/authContext';

export const useCheckLogin = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useContext(AuthContext);
  const checkLoginStatus = () => {
    setLoading(true);
    try {
      const data = localStorage.getItem('login-user');
      // console.log('data is:', data);

      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, checkLoginStatus };
};
