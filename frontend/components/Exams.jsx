'use client';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import ExamCard from '../components/ExamCard';
import useExams from '../hooks/useExams';
import { usePostExam } from '../hooks/useExams';
import Link from 'next/link';
import { AuthContext, useAuthContext } from '../contexts/authContext';
import PostExam from '../components/PostExam';
const Exams = ({ authUser }) => {
  const [examData, setExamData] = useState(null);
  const { getExams } = useExams();
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState(null);
  // const { authUser } = useContext(AuthContext);
  // const { postExam } = usePostExam();
  const { user } = JSON.parse(authUser);
  // console.log(user);
  useEffect(() => {
    const handleExams = async () => {
      setLoading(true);

      const data = await getExams();
      // console.log('exams data:', data);
      const { exams: Data } = data;
      setExamData(Data);

      setLoading(false);
    };
    handleExams();
  }, []);

  // setUser(udata.user);
  // useEffect(() => {

  // }, [authUser]);

  // console.log(user);
  const [regisForm, setRegisForm] = useState(false);
  const closeDialog = () => {
    setRegisForm(!regisForm);
  };
  return (
    examData && (
      <div className=" relative scr bg-white shadow-lg rounded-lg h-full overflow-y-scroll p-4 ">
        <div className="flex justify-center border-b-[1px]">
          <h1 className="font-bold text-center text-2xl text-blue-500 mb-2">
            Exam Registration
          </h1>
        </div>
        {user && user.role === 'admin' ? (
          <div className="z-10 absolute top-0 right-0 scale-75 hover:scale-90 hover:shadow-lg transition-all">
            <button
              type="button"
              className="p-4 bg-blue-500 rounded-lg hover:text-white font-semibold  "
              onClick={closeDialog}
            >
              Post New Exam
            </button>
          </div>
        ) : null}
        <div className="grid p-10 setMyGrid grid-flow-row gap-10">
          {/* <ExamCard />
        <ExamCard />
        <ExamCard />
        <ExamCard />
        <ExamCard />
        <ExamCard />
        <ExamCard />
        <ExamCard /> */}
          {/* <div>{console.log(examData)}</div> */}
          {examData.map((item) => (
            // <div>{console.log(item)}</div>
            <Link
              to={`/exams/${item.id}`}
              href={`/exams/${item._id}`}
              key={item._id}
              className="relative rounded-lg border-[2px] hover:shadow-lg "
            >
              <div className="pattern absolute top-0 left-0 w-full h-full"></div>
              {/* <div>{console.log(item)}</div> */}
              <ExamCard exam={item} />
            </Link>
          ))}
        </div>
        {loading ? (
          // <span className="loading loading-dots loading-lg"></span>
          <span className="loading loading-infinity loading-lg"></span>
        ) : null}
        <PostExam closeDialog={closeDialog} regisForm={regisForm}></PostExam>
      </div>
    )
  );
};

export default Exams;
