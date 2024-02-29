'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Cookies from 'universal-cookie';

const Profile = ({ user }) => {
  const cookies = new Cookies();
  //   console.log('user:', user);
  //   const { getData } = fetchUser();

  //   useEffect(() => {
  //     const handleData = async () => {
  //       setLoading(true);
  //       const data = await getData();

  //       const { user } = data;
  //       console.log('user:', user);
  //       //   document.cookie('');
  //       setLoading(false);
  //     };
  //     handleData();
  //   }, []);
  //   console.log(data);
  const cookie = cookies.get('jwt');
  //   console.log('browser cookie:', cookie);
  return (
    <>
      <div className=" scr bg-white shadow-lg rounded-lg h-full overflow-y-scroll p-4 flex flex-col justify-center items-center gap-10">
        <h1 className="font-bold text-xl text-blue-500 mt-10"> PROFILE</h1>
        <Image
          src="/graduated.png"
          alt="pic"
          height={150}
          width={150}
          className="rounded-full border-2 shadow-lg"
        />
        {/* <div>{console.log(user)}</div> */}
        <div className="grid grid-cols-2 gap-4 justify-center items-center">
          <label>Student Name:</label>
          <input
            type="text"
            value={user.userName}
            className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center items-center">
          <label>Registered No:</label>
          <input
            type="text"
            value={user.regNo}
            className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center items-center">
          <label>Branch:</label>
          <input
            type="text"
            value={user.branch}
            className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center items-center">
          <label>Gender:</label>
          <input
            type="text"
            value={user.gender}
            className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center items-center">
          <label>College:</label>
          <input
            type="text"
            value={user.college}
            className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center items-center">
          <label>Mobile:</label>
          <input
            type="tel"
            value={user.mobile}
            className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
            readOnly
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
