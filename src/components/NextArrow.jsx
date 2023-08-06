import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
const NextArrow = (props) => {
   const { className, style, onClick } = props;

   return (
      <div
         className={`rounded-full text-[#374b73] hover:bg-[#374b73] hover:text-white absolute top-[50%] right-0 md:right-[-5%] hover:cursor-pointer transition-all duration-200 p-1 border-2 border-gray-500`}
         onClick={onClick}
      >
         <ChevronRightIcon className='w-5 h-5' />
      </div>
   );
};

export default NextArrow;
