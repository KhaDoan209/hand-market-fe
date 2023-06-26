import { Button } from 'flowbite-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getListUserAction } from '../redux/action/user-action';
const Category = () => {
   const dispatch = useDispatch();
   return (
      <div>
         <Button
            onClick={() => {
               dispatch(getListUserAction());
            }}
            size='lg'
            className='bg-gray-500'
         >
            Get thử
         </Button>
      </div>
   );
};

export default Category;
