'use client';
import React from 'react';
import { useEffect, useState, Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { IoCloseSharp } from 'react-icons/io5';
import { useRegisterExam } from '../hooks/useExams';
import { AuthContext } from '../contexts/authContext';
import { usePostExam } from '../hooks/useExams';

const PostExam = ({ closeDialog, regisForm }) => {
  const { loading, registerExam } = useRegisterExam();
  const { authUser } = useContext(AuthContext);
  const { user } = authUser;
  const { postExam } = usePostExam();
  const [inputs, setInputs] = useState({
    title: '',
    examDate: '',
    description: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const res = await postExam(inputs);
    console.log(res);
    closeDialog();
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
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                (
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
                      Post Exam
                    </h1>
                  </div>
                  <div className="relative w-full h-full  rounded-lg">
                    <Image
                      src="/from2.webp"
                      alt="car"
                      height={550}
                      width={550}
                      priority
                      className="object-contain"
                    />
                  </div>
                  <form className="p-4 flex flex-col gap-4">
                    <div className="flex w-full flex-col ">
                      <label className="font-semibold">Title</label>
                      <input
                        type="text"
                        className="bg-gray-300 rounded-lg p-2"
                        value={inputs.title}
                        onChange={(e) =>
                          setInputs({ ...inputs, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <label className="font-semibold">Exam Date</label>
                      <input
                        type="date"
                        className="bg-gray-300 rounded-lg p-2"
                        value={inputs.examDate}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            examDate: new Date(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <label className="font-semibold">Description</label>
                      <input
                        type="text"
                        className="bg-gray-300 rounded-lg p-2"
                        value={inputs.description}
                        onChange={(e) =>
                          setInputs({ ...inputs, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex w-full justify-center">
                      <button
                        type="submit"
                        className="font-semibold p-4 hover:bg-blue-500 hover:text-white transition-all rounded-lg hover:shadow-lg"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
                )
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PostExam;
