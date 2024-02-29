import React from 'react';
import Image from 'next/image';
import { footerLinks } from '../utils/footer';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex flex-col w-full  ">
      <div className="flex flex-col gap-10 md:flex-row justify-between w-full px-20 py-10 border-t-2">
        <div className="flex flex-col items-center p-4 border-b-[1px] md:border-b-0">
          <Image src="/graduated.png" alt="logo" height={150} width={150} />
          <h2>Developed By Kalyan</h2>
        </div>
        <div className="flex gap-20 flex-col md:flex-row">
          {footerLinks.map((lst) => {
            return (
              <div key={lst.title} className="flex flex-col ">
                <h3 className="text-gray-800 font-bold mb-5 items-center">
                  {lst.title}
                </h3>
                <div className="flex flex-col gap-5">
                  {lst.links.map((el) => (
                    <Link
                      key={el.title}
                      href={el.url}
                      className="text-gray-500 transition-all hover:underline "
                    >
                      {el.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between px-20 py-10 border-t-2  text-gray-700">
        <h2>&copy;All Rights Reserved</h2>
        <h2>Terms and Conditions</h2>
      </div>
    </div>
  );
};

export default Footer;
