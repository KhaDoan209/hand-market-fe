import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
const PrevArrow = (props) => {
   const { className, style, onClick } = props;
   console.log(style);
   return (
      <div
         className='rounded-full text-[#374b73] hover:bg-[#374b73] hover:text-white absolute top-[50%] left-[-5%] hover:cursor-pointer transition-all duration-200 p-1 border-2 border-gray-500'
         onClick={onClick}
      >
         <ChevronLeftIcon className='w-5 h-5' />
      </div>
   );
};

export default PrevArrow;
