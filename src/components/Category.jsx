import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import quotation from '../assets/svg/quotation.svg';
const Category = ({ item }) => {
   return (
      <div className='mt-10 py-2'>
         <div
            className={`w-10/12 text-center mx-auto px-10 pb-5 rounded-2xl bg-white relative hover:shadow-md hover:shadow-gray-300 transition-all duration-200 cursor-grab`}
         >
            <img
               className='w-24 h-2w-24 absolute top-0 left-20'
               src={quotation}
            />
            <div className='pb-5 px-10'>
               <img
                  className='w-44 h-44 rounded-full object-cover mx-auto'
                  src={item.image}
               />
               <h1 className='text-[#F9B967] text-4xl font-bold font-mono my-5'>
                  {item.name}
               </h1>
               <span className='text-justify font-semibold leading-3 text-md tracking-wide text-[#5a6e8c] my-3'>
                  {item.description}
               </span>
            </div>
         </div>
      </div>
   );
};

export default Category;
