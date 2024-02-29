'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
  const router = useRouter();
  useEffect(() => {
    const logout = () => {
      localStorage.removeItem('login-user');
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.removeItem('user-id');
      router.push('/');
    };
    logout();
  });
  return <div>page</div>;
};

export default page;
