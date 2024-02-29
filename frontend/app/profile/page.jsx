'use client';
import { useContext, useEffect, useState } from 'react';
import Profile from '../../components/Profile';
import Home from '../page';
import { AuthContext, useAuthContext } from '../../contexts/authContext';
import { activeSideBar } from '../../contexts/sidebar';
import { useRouter } from 'next/navigation';
import { fetchUser } from '../../hooks/fetchData';
import Cookies from 'js-cookie';

const profile = ({ sidebar }) => {
  // const { authUser } = useAuthContext();
  const { getData } = fetchUser();
  const { authUser } = useContext(AuthContext);
  const { acSide, setAcSide } = useContext(activeSideBar);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // const { user } = authUser;
  // useEffect();

  useEffect(() => {
    const handleData = async () => {
      setLoading(true);
      const data = await getData();

      const { user } = data;
      // console.log('user:', data);
      setUser(user);
      // document.cookie('');
      // document.cookie = 'kalyan=678; Path=/';
      // const cookie = document.cookie;
      // console.log('document:', cookie);
      setLoading(false);
    };
    handleData();
  }, []);
  return (
    <Home>
      <div
        className={` ${
          acSide ? 'ml-[300px]' : 'left-0'
        } transition-all w-full h-screen flex flex-auto`}
      >
        {/* <div className="p-4 w-full"> */}
        <div className="w-full p-4 ">
          {user && user.role === 'student' && <Profile user={user} />}
          <div className="w-full flex justify-center items-center h-full">
            {loading ? (
              // <span className="loading loading-dots loading-lg"></span>
              <span className="loading loading-infinity loading-lg"></span>
            ) : null}
            {user && user.role === 'admin' ? (
              <div className="font-bold">Admins have no Profile Page</div>
            ) : null}
          </div>
        </div>
        {/* <div>{console.log(window.location())}</div> */}
      </div>
    </Home>
  );
};

export default profile;
