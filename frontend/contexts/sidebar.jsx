'use client';
import { useState, useContext, createContext } from 'react';

export const activeSideBar = createContext();

export const useActiveSideBar = () => useContext(activeSideBar);

export const ActiveSidebarProvider = ({ children }) => {
  const [acSide, setAcSide] = useState(false);
  return (
    <activeSideBar.Provider value={{ acSide, setAcSide }}>
      {children}
    </activeSideBar.Provider>
  );
};
