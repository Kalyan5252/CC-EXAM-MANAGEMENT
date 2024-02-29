import { useState, useContext } from 'react';
import { useAuthContext, AuthContext } from '../contexts/authContext';
import toast from 'react-hot-toast';
// import { cookies } from 'next/headers';
// import jwt from 'jwt-decode';

import Cookies from 'universal-cookie';

const validInput = ({ email, password }) => {
  if (!email || !password) {
    toast.error('Please provide Credentials');
    return false;
  }
  return true;
};

const useLogin = () => {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  // const { authUser, setAuthUser } = useAuthContext();
  const { authUser, setAuthUser } = useContext(AuthContext);
  const login = async ({ email, password }) => {
    const validin = validInput({ email, password });
    if (!validin) return;
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8800/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      // console.log(res.c);
      const data = await res.json();
      if (!data) throw new Error(data.error);
      if (data.status == 'success') {
        if (data.token) {
          console.log('response token:', data.token);
          // const decoded = jwt(data.token);
          cookies.set('jwt', data.token, {
            expires: new Date().getMilliseconds * 10,
          });
          // cookies.set('jwt', null);
          // console.log('cookie set ');
        }

        localStorage.setItem('login-user', JSON.stringify(data));
        localStorage.setItem('user-id', JSON.stringify(data.user.id));
        setAuthUser(data);
      }
    } catch (err) {
      toast.error('Wrong Credentials');
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
