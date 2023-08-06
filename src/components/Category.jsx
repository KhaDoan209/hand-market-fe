import React, { useState } from 'react';
import quotation from '../assets/svg/quotation.svg';
const Category = ({ item }) => {
   return (
      <div className='mt-10 py-2'>
         <div
            className={`w-10/12 text-center mx-auto py-10 px-2 pb-2 md:px-10 md:pb-5 rounded-2xl bg-white relative hover:shadow-md hover:shadow-gray-300 transition-all duration-200 cursor-grab`}
         >
            <img
               className='w-12 h-12 md:w-24 md:h-24 absolute top-0 left-10 md:left-20'
               src={quotation}
            />
            <div className='pb-5 px-2 lg:pb-5 lg:px-10'>
               <img
                  className='w-16 h-16 md:w-24 md:h-24 lg:w-44 lg:h-44 rounded-full object-cover mx-auto'
                  src={item.image}
               />
               <h1 className='text-[#F9B967] text-2xl md:text-4xl font-bold font-mono my-5'>
                  {item.name}
               </h1>
               <span className='text-justify font-semibold leading-3 sm:text-sm md:text-md tracking-wide text-[#5a6e8c] my-3'>
                  {item.description}
               </span>
            </div>
         </div>
      </div>
   );
};

export default Category;
