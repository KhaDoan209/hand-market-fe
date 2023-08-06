import React from 'react';

const NumberCircle = ({ number }) => {
   return (
      <div className='bg-red-500 rounded-full w-[22px] h-[22px] text-center leading-[20px]'>
         <span className='text-white text-[14px] inline'>
            {Number(number) > 99 ? '99+' : number}
         </span>
      </div>
   );
};

export default NumberCircle;
