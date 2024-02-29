'use client';
import React from 'react';
import Home from '../page';
import { useContext, useEffect, useState } from 'react';
import { activeSideBar } from '../../contexts/sidebar';
import { AuthContext, useAuthContext } from '../../contexts/authContext';
import { fetchUserRegis } from '../../hooks/fetchData';

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Toolbar,
  Inject,
  Search,
} from '@syncfusion/ej2-react-grids';

import { employeesGrid } from '../../utils/uidata';

const RegistrationsPage = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useContext(AuthContext);
  const { acSide, setAcSide } = useContext(activeSideBar);
  const { getData } = fetchUserRegis();
  const [data, setData] = useState(null);
  useEffect(() => {
    const handleData = async () => {
      const res = await getData();
      const { exams } = res.user;

      setData(exams);
      //   console.log(data);
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
            {data && (
              <GridComponent
                dataSource={data}
                allowPaging
                allowSorting
                width="auto"
                // toolbar={['Search']}
              >
                <ColumnsDirective>
                  {employeesGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                  ))}
                </ColumnsDirective>
                <Inject services={[Search, Toolbar]} />
              </GridComponent>
            )}
            {!data ? (
              // <span className="loading loading-dots loading-lg"></span>
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Home>
  );
};

export default RegistrationsPage;
