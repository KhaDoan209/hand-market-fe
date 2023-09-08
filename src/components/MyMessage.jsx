import React from 'react';
import moment from 'moment/moment';
import { clearConversationAction } from '../redux/action/message-action';
import { useDispatch } from 'react-redux';
const MyMessage = ({ item }) => {
   const dispatch = useDispatch()
   return (
      <div
         key={Math.random()}
         className='col-start-6 col-end-13 p-3 rounded-lg'
      >
         <div className='flex justify-start flex-row-reverse items-stretch'>
            <img
               className=' h-10 w-10 rounded-full object-cover'
               src={item?.Message_sender?.avatar}
            />
            <div className='block'>
               <div className='relative mr-3 text-sm bg-[#374b73] text-white py-2 px-4 shadow rounded-md'>
                  <div>{item?.content}</div>
               </div>
               <div className='text-[10px] italic text-gray-500 px-4 mt-1 flex justify-end'>
                  Sent at {moment(item?.created_at).fromNow()}
               </div>
            </div>
         </div>
      </div>
   );
};

export default MyMessage;
