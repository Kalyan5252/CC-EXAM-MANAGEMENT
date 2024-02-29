import React from 'react';

const parseExamDate = (dt) => {
  const date = new Date(dt).getDate();
  const month = new Date(dt).getMonth();
  const year = new Date(dt).getFullYear();
  return `${String(date).padStart(2, '0')}/${String(month).padStart(
    2,
    '0'
  )}/${year}`;
};

const ExamCard = ({ exam }) => {
  return (
    <div className="p-4  cursor-pointer transition-all space-y-4 ">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">{exam.title}</h2>
        <h3 className="text-[10px] text-gray-700 font-semibold">
          Date:{' '}
          <span className="text-gray-500">
            {parseExamDate(exam.examDate || exam.eventDate)}
          </span>
        </h3>
      </div>

      <p className="text-gray-500">
        {/* This Google Cloud Architect Exam is based on Api designing on Apigee
        Engine */}
        {exam.description}
      </p>
    </div>
  );
};

export default ExamCard;
