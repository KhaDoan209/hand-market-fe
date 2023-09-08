import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { isMobile } from 'react-device-detect';
const MobileBackButton = () => {
   const navigate = useNavigate();
   return (
      <>
         {isMobile ? (
            <button
               onClick={() => {
                  navigate(-1);
               }}
               className='rounded relative inline-flex group items-center justify-center px-1 py-2 m-1 cursor-pointer text-[#374b73]'
            >
               <ChevronLeftIcon className='w-5 h-5' />
            </button>
         ) : (
            <></>
         )}
      </>
   );
};

export default MobileBackButton;
