'use client';
import { useState, Fragment } from 'react';
import Image from 'next/image';
import { CiMenuFries } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { sidebarLinks } from '../utils/links';
import Link from 'next/link';
import { Transition } from '@headlessui/react';

const Sidebar = ({ sidebar, setSidebar }) => {
  return (
    <>
      <Transition show={sidebar} as={Fragment}>
        <Transition.Child
          as="div"
          className="relative z-10"
          enter="ease-out duration-300"
          enterFrom="opacity-0 -translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="ease-in duration-300"
          leaveTo="opacity-0 -translate-x-full"
          leaveFrom="opacity-100 translate-x-0"
        >
          <div className="absolute inset-0 p-4 flex flex-col w-max h-screen">
            <div className="p-4 bg-white shadow-lg rounded-lg h-full">
              <div
                className="flex items-center justify-center p-4 border-b-2"
                // onClick={() => {
                //   setSidebar(false);
                // }}
              >
                <Image src="/graduated.png" alt="logo" height={40} width={40} />
                <h3 className="font-bold text-xl">Student Portal</h3>
                <button
                  type="button"
                  className="flex-1 p-4 rounded-full hover:bg-gray-300"
                  onClick={() => {
                    setSidebar(false);
                  }}
                >
                  <CiMenuFries />
                </button>
              </div>
              <div className=" p-4 flex flex-col ">
                {sidebarLinks.map((el) => (
                  <Link
                    key={el.title}
                    href={el.url}
                    // href="/"
                    className="p-4 rounded-lg hover:bg-gray-400 hover:px-8 hover:font-semibold  transition-all
               active:bg-gray-400 flex items-center gap-4"
                  >
                    <Image
                      src={`/${el.icon}`}
                      alt="icon"
                      height={25}
                      width={25}
                    />
                    {el.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Transition.Child>
      </Transition>
    </>
  );
};

export default Sidebar;
