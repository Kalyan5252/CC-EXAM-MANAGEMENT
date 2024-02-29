'use client';
import React from 'react';
import Home from '../page';
import { useContext, useEffect, useState } from 'react';
import { activeSideBar } from '../../contexts/sidebar';
import { AuthContext, useAuthContext } from '../../contexts/authContext';
import useEvents from '../../hooks/useEvents';
import Link from 'next/link';
import ExamCard from '../../components/ExamCard';
import EventRegistration from '../../components/EventRegistration';

const Events = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useContext(AuthContext);
  const { acSide, setAcSide } = useContext(activeSideBar);
  const [data, setData] = useState(null);
  const { getEvents } = useEvents();

  const [regisForm, setRegisForm] = useState(false);
  const closeDialog = () => {
    setRegisForm(!regisForm);
  };

  useEffect(() => {
    const handleData = async () => {
      const res = await getEvents();
      setData(res.events);
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
        <div className="w-full p-4 ">
          <div className="w-full flex flex-col rounded-lg h-full text-xl">
            <div className="scr bg-white shadow-lg rounded-lg h-full overflow-y-scroll p-4 ">
              <div className="flex justify-center border-b-[1px]">
                <h1 className="font-bold text-center text-2xl text-blue-500 mb-2">
                  Event Registration
                </h1>
              </div>
              <div className="flex justify-center items-center">
                <div className="grid p-10 setMyGrid grid-flow-row gap-10">
                  {data &&
                    data.map((item) => (
                      // <div>{console.log(item)}</div>
                      <div
                        key={item._id}
                        className="relative cursor-pointer rounded-lg border-[2px] hover:shadow-lg "
                      >
                        <div className="pattern absolute top-0 left-0 w-full h-full"></div>
                        <div>{console.log(item)}</div>
                        <ExamCard exam={item} />
                      </div>
                    ))}
                </div>
                {!data ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <span className="loading loading-infinity loading-lg"></span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Home>
  );
};

export default Events;

{
  /* <EventRegistration
                          eventId={item.id}
                          closeDialog={closeDialog}
                          regisForm={regisForm}
                        /> */
}
