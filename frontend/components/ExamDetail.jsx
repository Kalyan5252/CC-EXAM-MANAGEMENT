'use client';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useExam } from '../hooks/useExams';
import { AuthContext, useAuthContext } from '../contexts/authContext';
import RegistrationForm from '../components/RegistrationForm';

const parseExamDate = (dt) => {
  const date = new Date(dt).getDate();
  const month = new Date(dt).getMonth();
  const year = new Date(dt).getFullYear();
  return `${String(date).padStart(2, '0')}/${String(month).padStart(
    2,
    '0'
  )}/${year}`;
};

const checkRegistration = (edata, udata) => {
  // console.log('udata', udata);
  const set1 = new Set(edata);
  const set2 = new Set(new Array(udata));
  // console.log('set1:', set1);
  // console.log('set2:', set2);
  for (const element of set2) {
    if (set1.has(element)) {
      return true;
    }
  }
  return false;
};

const ExamDetail = ({ data }) => {
  const { exam } = data;
  const { authUser } = useContext(AuthContext);
  const { user } = JSON.parse(authUser);
  // console.log('user.', user);

  const [regisForm, setRegisForm] = useState(false);
  const closeDialog = () => {
    setRegisForm(!regisForm);
  };

  // console.log('regis data', exam.registrations);
  return (
    user && (
      <div className="relative bg-white shadow-lg rounded-lg  p-5">
        {/* <div className="flex justify-center border-b-[1px]">
        <h1 className="font-bold text-center text-2xl text-blue-500 mb-2">
          Exam Registration
        </h1>
      </div> */}
        {/* <div>{console.log(data)}</div> */}

        <div className="exam_bg p-10 rounded-lg w-full h-[300px] md:bg-contain">
          <div className="flex w-full h-full items-center ">
            <h1 className="font-bold z-10 text-5xl text-blue-900 uppercase tracking-wide d_shadow">
              {exam.title}
            </h1>
          </div>
        </div>

        <div className="mt-[300px] p-10 text-lg flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <h3 className="  font-semibold">
                Exam Date:{' '}
                <span className="text-gray-700">
                  {parseExamDate(exam.examDate)}
                </span>
              </h3>
              <h3 className="  font-semibold">
                Last Date of Registration:{' '}
                <span className="text-gray-700">
                  {exam.lastdate ? parseExamDate(exam.lastdate) : ' -'}
                </span>
              </h3>
            </div>
            {user.role === 'student' ? (
              <div className="">
                {checkRegistration(exam.registrations, user._id) ? (
                  <label className="font-semibold flex text-center p-4 bg-blue-500 rounded-lg  ">
                    Already Registered
                  </label>
                ) : (
                  <button
                    className="font-semibold p-4 bg-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                    onClick={closeDialog}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">Description:</h2>
            <p className="p-10">{exam.description}</p>
          </div>
          <div className="flex flex-col ">
            <h2 className="font-semibold">Eligibility:</h2>
            <div className="">
              <ul className="timeline timeline-vertical">
                {exam.eligibility.map((el) => (
                  <li key={el._id}>
                    <div className="timeline-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="timeline-end text-white timeline-box">
                      {el.title}: <span>{el.value}</span>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col ">
            <h2 className="font-semibold">TimeLine:</h2>
            <ul className="timeline timeline-vertical gap-4 self-center">
              {exam.timeline.map((el) => (
                <li key={el._id}>
                  <div className="timeline-start">{parseExamDate(el.date)}</div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end text-white timeline-box">
                    {el.event}
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center border-t-[1px] p-4">
            {checkRegistration(exam.registrations, user._id) ? (
              'Hall Ticket has been sent to Your Mail'
            ) : (
              <button
                className="font-semibold p-4 bg-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                onClick={closeDialog}
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
        <RegistrationForm
          user={user}
          examId={exam._id}
          closeDialog={closeDialog}
          regisForm={regisForm}
        />
      </div>
    )
  );
};

export default ExamDetail;

{
  /* <li>
              <div className="timeline-start">1984</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end text-white timeline-box">
                First Macintosh computer
              </div>
              <hr />
            </li> */
}
