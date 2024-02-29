'use client';
import React from 'react';
import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { IoCloseSharp } from 'react-icons/io5';
import { useRegisterExam } from '../hooks/useExams';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const RegistrationForm = ({ user, examId, closeDialog, regisForm }) => {
  const { loading, registerExam } = useRegisterExam();
  const router = useRouter();
  const updateExam = async () => {
    // console.log('updating1');
    const load = toast.loading('Resgistration in Progress!!');
    const res = await registerExam(examId);
    // console.log('res:', res);

    closeDialog();
    if (res) {
      toast.dismiss(load);
    }
    router.push('/exams/');
  };
  return (
    <>
      <Transition appear show={regisForm} as={Fragment}>
        <Dialog as="div" className="relative z-50 " onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-scroll">
            <div className="flex justify-center p-4 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="relative w-full max-w-lg min-h-[90vh] p-6 overflow-y-auto transform
                rounded-2xl bg-white text-left shadow-xl transition-all flex flex-col gap-5"
                >
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="absolute top-2 right-2 z-10  p-2 bg-primary-blue-100 rounded-full"
                  >
                    <IoCloseSharp />
                  </button>
                  <div className="">
                    <h1 className="font-semibold text-center text-2xl text-blue-500">
                      Registration Form
                    </h1>
                  </div>
                  <div className="relative w-full h-full  rounded-lg">
                    <Image
                      src="/formImg.webp"
                      alt="img"
                      height={550}
                      width={550}
                      priority
                      className="object-contain"
                    />
                  </div>
                  <p className="text-center text-sm">
                    Verify Your Details and make Registration{' '}
                  </p>
                  <div className="flex-0 flex flex-col gap-3 px-10 py-5">
                    <div className="grid">
                      <label>Student Name:</label>
                      <input
                        type="text"
                        value={user.userName}
                        className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
                      />
                    </div>
                    <div className="grid">
                      <label>Registered Number:</label>
                      <input
                        type="text"
                        value={user.regNo}
                        className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
                      />
                    </div>
                    <div className="grid">
                      <label>Branch:</label>
                      <input
                        type="text"
                        value={user.branch}
                        className="uppercase bg-gray-300 outline-none px-4 py-2 rounded-lg "
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 mb-2">
                      <label>Gender:</label>
                      <div className="flex justify-around gap-20">
                        <div className="">
                          <input
                            type="radio"
                            value="m"
                            checked={user.gender === 'Male' ? 'true' : 'false'}
                            name="gender"
                            className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
                            readOnly
                          />
                          Male
                        </div>
                        <div className="">
                          <input
                            type="radio"
                            value="fm"
                            name="gender"
                            className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
                            readOnly
                          />
                          Female
                        </div>
                      </div>
                    </div>
                    <div className="grid">
                      <label>College:</label>
                      <input
                        type="text"
                        value={user.college}
                        className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
                        readOnly
                      />
                    </div>
                    <div className="grid">
                      <label>Mobile:</label>
                      <input
                        type="tel"
                        value={user.mobile}
                        className="bg-gray-300 outline-none px-4 py-2 rounded-lg "
                        readOnly
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="font-semibold p-4 bg-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                        onClick={updateExam}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RegistrationForm;
