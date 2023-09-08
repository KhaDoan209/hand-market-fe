import React, { useEffect, useState, useRef, Fragment } from 'react';
import { getUserFromLocal } from '../../../utils/utils-functions';
import { useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';
import {
   getConversationMessageAction,
   getConversationDetailAction,
   sendMessageAction,
   seenMesageAction,
} from '../../../redux/action/message-action';
import { useFormik } from 'formik';
import {
   EllipsisVerticalIcon,
   PaperAirplaneIcon,
} from '@heroicons/react/20/solid';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { socket } from '../../../socket';
import { SocketMessage } from '../../../enums/SocketMessage';
import MyMessage from '../../../components/MyMessage';
import OtherMessage from '../../../components/OtherMessage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { clearConversationAction } from '../../../redux/action/message-action';
import MobileBackButton from '../../../components/MobileBackButton';
const MessageShipper = () => {
   const [message, setMessage] = useState([]);
   const { dispatch } = useOutletContext();
   const content = useRef(null);
   const userSignedIn = getUserFromLocal();
   const conversation_detail = useSelector(
      (state) => state.messageReducer.conversation_detail
   );
   const message_in_conversation = useSelector(
      (state) => state.messageReducer.conversation_message
   );
   const currentConversation = useSelector(
      (state) => state.messageReducer.current_conversation_id
   );
   useEffect(() => {
      if (currentConversation) {
         dispatch(getConversationMessageAction(currentConversation));
         dispatch(getConversationDetailAction(currentConversation));
      }
      return () => {
         dispatch(clearConversationAction());
      };
   }, []);

   useEffect(() => {
      const handleNewMessage = (data) => {
         const { conversation_id } = data;
         if (conversation_id == currentConversation) {
            setMessage((prevMessages) => [...prevMessages, data]);
         }
      };
      socket.on(SocketMessage.NewMessage, handleNewMessage);
      return () => {
         socket.off(SocketMessage.NewMessage, handleNewMessage);
      };
   }, [currentConversation]);

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         sender_id: userSignedIn?.id,
         content: '',
         room_id: conversation_detail?.Order?.room_id,
         conversation_id: conversation_detail?.id,
      },
      validationSchema: Yup.object({
         content: Yup.string()
            .required('Cannot send empty message')
            .max(5000, 'Message is too long'),
      }),
      onSubmit: (values) => {
         console.log(values);
         dispatch(sendMessageAction(values));
      },
   });
   const renderInformation = () => {
      if (userSignedIn?.id === conversation_detail?.sender_id) {
         return (
            <>
               <MobileBackButton />
               <img
                  className='h-10 w-10 rounded-full object-cover'
                  src={conversation_detail?.Conversation_receiver?.avatar}
               />
               <div className='flex flex-col ml-3'>
                  <div className='font-semibold text-sm'>
                     {conversation_detail?.Conversation_receiver?.first_name}{' '}
                     {conversation_detail?.Conversation_receiver?.last_name}
                  </div>
                  <div className='text-sm text-green-500 font-bold'>
                     #{conversation_detail?.Order?.order_code}
                  </div>
               </div>
               <div className='ml-auto'>
                  <ul className='flex flex-row items-center space-x-2'>
                     <li>
                        <a
                           href='#'
                           className='flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full object-cover'
                        >
                           <EllipsisVerticalIcon className='w-5 h-5' />
                        </a>
                     </li>
                  </ul>
               </div>
            </>
         );
      } else {
         return (
            <>
               <MobileBackButton />
               <img
                  className='h-10 w-10 rounded-full object-cover'
                  src={conversation_detail?.Conversation_sender?.avatar}
               />
               <div className='flex flex-col ml-3'>
                  <div className='font-semibold text-sm'>
                     {conversation_detail?.Conversation_sender?.first_name}{' '}
                     {conversation_detail?.Conversation_sender?.last_name}
                  </div>
                  <div className='text-xs text-gray-500'>
                     {conversation_detail?.Order?.order_code}
                  </div>
               </div>
               <div className='ml-auto'>
                  <ul className='flex flex-row items-center space-x-2'>
                     <li>
                        <a
                           href='#'
                           className='flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full object-cover'
                        >
                           <EllipsisVerticalIcon className='w-5 h-5' />
                        </a>
                     </li>
                  </ul>
               </div>
            </>
         );
      }
   };
   const handleSendMessage = () => {
      if (formik.errors.content) {
         toast.error(formik.errors.content);
      } else {
         formik.handleSubmit();
         content.current.value = '';
      }
   };
   return (
      <>
         <div className='text-[#374b73] shadow-md shadow-gray-300 w-96 md:w-10/12 mx-auto rounded-md h-full'>
            <div className='flex flex-col overflow-scroll w-full bg-white py-6 border-l border-gray-100 rounded-md'>
               <div className='flex flex-row items-center py-4 px-2 rounded-2xl shadow'>
                  {renderInformation()}
               </div>
               <div className='h-full overflow-hidden py-4'>
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                     }}
                     id='scrollable'
                     className='h-[65vh] overflow-y-auto'
                  >
                     <InfiniteScroll
                        scrollableTarget='scrollable'
                        inverse={true}
                        style={{
                           display: 'flex',
                           flexDirection: 'column-reverse',
                        }}
                        dataLength={message_in_conversation?.data?.length}
                        next={() => {
                           dispatch(
                              getConversationMessageAction(
                                 conversation_detail?.id,
                                 message_in_conversation?.nextPage
                              )
                           );
                        }}
                        hasMore={
                           message_in_conversation?.currentPage ===
                           message_in_conversation?.lastPages
                              ? false
                              : true
                        }
                     >
                        <div className='grid grid-cols-12 gap-y-2'>
                           {message_in_conversation?.data
                              ?.slice()
                              ?.reverse()
                              ?.map((item) => {
                                 if (userSignedIn?.id !== item?.sender_id) {
                                    return (
                                       <Fragment key={Math.random()}>
                                          <OtherMessage item={item} />
                                       </Fragment>
                                    );
                                 } else {
                                    return (
                                       <Fragment key={Math.random()}>
                                          <MyMessage item={item} />
                                       </Fragment>
                                    );
                                 }
                              })}
                           {message?.map((item) => {
                              if (userSignedIn?.id !== item?.sender_id) {
                                 return (
                                    <Fragment key={Math.random()}>
                                       <OtherMessage item={item} />
                                    </Fragment>
                                 );
                              } else {
                                 return (
                                    <Fragment key={Math.random()}>
                                       <MyMessage item={item} />
                                    </Fragment>
                                 );
                              }
                           })}
                        </div>
                     </InfiniteScroll>
                  </div>
               </div>
               <div className='flex items-stretch w-full justify-between'>
                  <div className='w-full mr-5'>
                     <textarea
                        onClick={() => {
                           dispatch(
                              seenMesageAction(
                                 userSignedIn?.id,
                                 conversation_detail?.id
                              )
                           );
                        }}
                        ref={content}
                        name='content'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full w-full focus:ring-0 focus:outline-none focus:border-2 focus:border-[#425478] resize-none px-7 h-10 overflow-y-auto'
                     />
                  </div>
                  <div className='w-fit flex justify-end'>
                     <button
                        onClick={handleSendMessage}
                        className='flex justify-center items-center  h-10 w-10 rounded-full object-cover bg-gray-100 hover:bg-[#ffb4b4] text-[#374b73] hover:text-white transition-all duration-200'
                     >
                        <PaperAirplaneIcon className='w-5 h-5' />
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className='h-[5rem]'></div>
      </>
   );
};

export default MessageShipper;
