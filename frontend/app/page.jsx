'use client';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { IoMdMenu } from 'react-icons/io';
import { useAuthContext } from '../contexts/authContext';
import { useRouter } from 'next/navigation';
import useLogin from '../hooks/useLogin';
import { useCheckLogin } from '../hooks/useCheckLogin';
import { activeSideBar } from '../contexts/sidebar';

import { registerLicense } from '@syncfusion/ej2-base';
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NAaF1cVWhKYVB2WmFZfVpgcl9HaFZSRmYuP1ZhSXxXdkdhUH9ZcXBXQmdeVEE='
);

export default function Home({ children }) {
  const router = useRouter();
  const { asPath } = router;
  const { acSide, setAcSide } = useContext(activeSideBar);
  // const [sidebar, setSidebar] = useState(true);
  const handleSidebar = () => {
    // setSidebar(!sidebar);
    setAcSide(!acSide);
  };
  const { authUser, setAuthUser } = useAuthContext();
  const { loading, checkLoginStatus } = useCheckLogin();
  useEffect(() => {
    const fun = async () => {
      const data = await checkLoginStatus();
      // console.log('d:', data);

      if (!loading && !data) router.push('/Login2');
    };
    fun();
  }, []);
  // const basepath = window.location.href.split('3000/')[1];
  return (
    <main className="h-screen w-full md:flex">
      <Sidebar sidebar={acSide} setSidebar={handleSidebar} />
      {!acSide ? (
        <button
          type="button"
          onClick={handleSidebar}
          className="absolute top-3 left-3 rounded-full text-2xl hover:bg-blue-600 p-2 icon_col"
        >
          <IoMdMenu />
        </button>
      ) : (
        ''
      )}
      {children}
      {/* <div>{console.log('path:', router.pathname)}</div> */}
      {/* {basepath === '' ? 'yes' : 'no'} */}
    </main>
  );
}
