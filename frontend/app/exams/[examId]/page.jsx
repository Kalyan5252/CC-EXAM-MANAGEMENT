'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import Home from '../../page';
import { useContext } from 'react';
import { activeSideBar } from '../../../contexts/sidebar';
import ExamDetail from '../../../components/ExamDetail';
import { useExam } from '../../../hooks/useExams';

const exam = ({ params, sidebar }) => {
  const [loading, setLoading] = useState(false);
  const { getExam } = useExam();
  const [exam, setExam] = useState(null);
  const examId = params.examId;
  useEffect(() => {
    const handleExam = async () => {
      setLoading(true);
      const data = await getExam(examId);
      // console.log(data);
      setExam(data);
      setLoading(false);
    };
    handleExam();
  }, []);

  //   console.log(examId);
  const { acSide, setAcSide } = useContext(activeSideBar);
  return (
    <Home>
      <div
        className={` ${
          acSide ? 'ml-[300px]' : 'left-0'
        } transition-all w-full h-screen  flex flex-auto`}
      >
        {/* <div className="p-4 w-full"> */}
        <div className="w-full  p-4 overflow-y-scroll">
          {/* {params.examId} */}
          {exam && <ExamDetail data={exam} />}
        </div>
      </div>
    </Home>
  );
};

export default exam;
