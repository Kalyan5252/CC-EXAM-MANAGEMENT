'use client';
import React from 'react';
import { AuthContext, useAuthContext } from '../contexts/authContext';
import { useContext } from 'react';

const Section = () => {
  // const { authUser } = useContext(AuthContext);
  const { authUser } = useAuthContext();
  return <div>{authUser ? 'Kalyan' : 'Null'}</div>;
};

export default Section;
