'use client';
import { useContext } from 'react';
import Dashboard from '../../components/Dashboard';
import Home from '../page';
import { activeSideBar } from '../../contexts/sidebar';

const dashboard = () => {
  const { acSide, setAcSide } = useContext(activeSideBar);
  return (
    <Home>
      <div
        className={`absolute ${
          acSide ? 'left-10' : 'left-0'
        } transition-all w-full`}
      >
        Dashboard
      </div>
    </Home>
  );
};

export default dashboard;
