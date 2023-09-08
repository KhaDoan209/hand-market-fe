import React from 'react';
import moment from 'moment/moment';
import { clearConversationAction } from '../redux/action/message-action';
import { useDispatch } from 'react-redux';

const OtherMessage = ({ item }) => {
   const dispatch = useDispatch();
   return (
      <div className='col-start-1 col-end-8 p-3 rounded-lg max-w-full'>
         <div className='flex flex-row items-stretch'>
            <img
               className=' h-10 w-10 rounded-full object-cover'
               src={item?.Message_sender?.avatar}
            />
            <div className='block'>
               <div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-lg'>
                  <div>{item?.content}</div>
               </div>
               <div className='text-[10px] italic text-gray-500 px-4 mt-1'>
                  Sent at {moment(item?.created_at).fromNow()}
               </div>
            </div>
         </div>
      </div>
   );
};

export default OtherMessage;
