'use client';
import { useState, useContext } from 'react';
import Link from 'next/link';
import useLogin from '../hooks/useLogin';
import {
  useAuthContext,
  AuthContextProvider,
  AuthContext,
} from '../contexts/authContext';
import { ContextProvider } from './ContextProvider';
import Login from './Login';
import { Toaster } from 'react-hot-toast';

const Login2 = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  // const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await login(inputs);
  };
  // const { authUser } = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <Login />
      <Toaster />
    </AuthContextProvider>
  );
};

export default Login2;
