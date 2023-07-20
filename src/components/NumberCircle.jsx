import React from 'react';

const NumberCircle = ({ number }) => {
   return (
      <div className='bg-red-500 rounded-full px-2 py-[0.5px]'>
         <span className='text-white text-[12px]'>{number}</span>
      </div>
   );
};

export default NumberCircle;
