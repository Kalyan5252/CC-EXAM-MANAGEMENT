'use client';
import { useContext } from 'react';
import Home from '../page';
import Exams from '../../components/Exams';
import { AuthContext, useAuthContext } from '../../contexts/authContext';
import { activeSideBar } from '../../contexts/sidebar';
import { useRouter } from 'next/navigation';

const exams = ({ sidebar }) => {
  const { authUser } = useContext(AuthContext);

  const { acSide, setAcSide } = useContext(activeSideBar);
  return (
    <Home>
      <div
        className={` ${
          acSide ? 'ml-[300px]' : 'left-0'
        } transition-all w-full h-screen flex flex-auto`}
      >
        {/* <div className="p-4 w-full"> */}
        <div className="w-full p-4">
          {authUser && <Exams authUser={authUser} />}
        </div>
      </div>
    </Home>
  );
};

export default exams;
