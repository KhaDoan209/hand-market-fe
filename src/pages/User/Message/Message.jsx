import React, { useEffect, useState, useRef, Fragment } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { getUserFromLocal } from '../../../utils/utils-functions';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import {
   getListConversationByUserAction,
   getConversationMessageAction,
   getConversationDetailAction,
   sendMessageAction,
   clearConversationAction,
   seenMesageAction,
   getCurrentConversationIdAction,
   getListUnseenMessageAction,
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
import { isMobile } from 'react-device-detect';
import { Shipper } from '../../../utils/variables';
import InfiniteScroll from 'react-infinite-scroll-component';
import MyMessage from '../../../components/MyMessage';
import OtherMessage from '../../../components/OtherMessage';
import { OrderStatus } from '../../../enums/OrderStatus';

const Message = () => {
   const [message, setMessage] = useState([]);
   const list_conversation = useSelector(
      (state) => state.messageReducer.list_conversation
   );
   const currentConversation = useSelector(
      (state) => state.messageReducer.current_conversation_id
   );
   const userSignedIn = getUserFromLocal();
   const isShipper = isMobile && userSignedIn?.role === Shipper;
   const content = useRef(null);
   const { dispatch, navigate } = useOutletContext();
   const conversation_detail = useSelector(
      (state) => state.messageReducer.conversation_detail
   );
   const message_in_conversation = useSelector(
      (state) => state.messageReducer.conversation_message
   );
   const listUnseenMessage = useSelector(
      (state) => state.messageReducer.list_unseen_message
   );
   useEffect(() => {
      dispatch(getListConversationByUserAction(userSignedIn?.id));
      if (userSignedIn?.role == Shipper) {
         dispatch(getListUnseenMessageAction(userSignedIn?.id));
      }
      if (currentConversation) {
         dispatch(getConversationMessageAction(currentConversation));
         dispatch(getConversationDetailAction(currentConversation));
      }
      return () => {
         dispatch(clearConversationAction());
      };
   }, []);

   useEffect(() => {
      socket.on(SocketMessage.NewMessage, (data) => {
         dispatch(getListConversationByUserAction(userSignedIn?.id));
         dispatch(getConversationDetailAction(currentConversation));
      });
      socket.on(SocketMessage.SeenMessage, () => {
         dispatch(getListConversationByUserAction(userSignedIn?.id));
      });
      socket.on(SocketMessage.NewConversation, (newConversation) => {
         dispatch(getListConversationByUserAction(userSignedIn?.id));
         if (currentConversation == null) {
            dispatch(getConversationMessageAction(newConversation.id));
            dispatch(getConversationDetailAction(newConversation.id));
         }
      });
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
         dispatch(sendMessageAction(values));
      },
   });
   const renderInformation = () => {
      if (userSignedIn?.id === conversation_detail?.sender_id) {
         return (
            <>
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
                  {/* <div className='text-xs text-gray-500'>Active</div> */}
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
   const renderListConversation = () => {
      if (userSignedIn?.id === conversation_detail?.sender_id) {
         {
            return list_conversation?.data.map((item) => {
               return (
                  <div
                     key={Math.random()}
                     onClick={() => {
                        dispatch(seenMesageAction(userSignedIn?.id, item?.id));
                        dispatch(getCurrentConversationIdAction(item.id));
                        if (userSignedIn?.role === Shipper) {
                           navigate(`/shipper/message/${item?.id}`);
                        } else {
                           dispatch(clearConversationAction());
                           dispatch(getConversationDetailAction(item?.id));
                           dispatch(getConversationMessageAction(item?.id));
                           setMessage([]);
                        }
                     }}
                     className={`cursor-pointer relative flex justify-between w-full items-center p-4 my-2 border-y border-gray-100 rounded-md ${
                        item?.id === currentConversation
                           ? 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-gray-100 to-gray-200'
                           : ''
                     }`}
                  >
                     <img
                        className='h-10 w-10 rounded-full object-cover'
                        src={item?.Conversation_receiver?.avatar}
                     />
                     <div className='mx-3 w-4/6'>
                        <div className='flex w-full justify-between items-center mb-1'>
                           <div className='text-sm font-medium'>
                              {item?.Conversation_receiver?.first_name}{' '}
                              {item?.Conversation_receiver?.last_name}
                           </div>
                           <div className='text-xs text-green-500 font-bold'>
                              #{item?.Order?.order_code}
                           </div>
                        </div>
                        <div className='text-xs truncate w-40'>
                           {item?.latest_text}
                        </div>
                     </div>
                     <div className='flex-shrink-0 ml-2 self-end mb-1'>
                        {item.sender_unseen > 0 ? (
                           <span className='flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full'>
                              {item?.sender_unseen}
                           </span>
                        ) : (
                           ''
                        )}
                     </div>
                  </div>
               );
            });
         }
      } else {
         return list_conversation?.data?.map((item) => {
            return (
               <div
                  onClick={() => {
                     dispatch(seenMesageAction(userSignedIn?.id, item?.id));
                     dispatch(getCurrentConversationIdAction(item?.id));
                     if (userSignedIn?.role === Shipper) {
                        navigate(`/shipper/message-detail/${item?.id}`);
                     } else {
                        dispatch(clearConversationAction());
                        dispatch(getConversationDetailAction(item?.id));
                        dispatch(getConversationMessageAction(item?.id));
                        setMessage([]);
                     }
                  }}
                  key={Math.random()}
                  className={`relative flex justify-between w-full items-center p-4 my-2 border-y border-gray-100 ${
                     item?.id === currentConversation
                        ? 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-gray-50 to-gray-100'
                        : ''
                  }`}
               >
                  <img
                     className='h-10 w-10 rounded-full object-cover'
                     src={item?.Conversation_sender?.avatar}
                  />
                  <div className='mx-3 w-4/6'>
                     <div className='flex w-full justify-between items-center mb-1'>
                        <div className='text-sm font-medium'>
                           {item?.Conversation_sender?.first_name}{' '}
                           {item?.Conversation_sender?.last_name}
                        </div>
                        <div className='text-xs text-green-500 font-bold'>
                           #{item?.Order?.order_code}
                        </div>
                     </div>
                     <div className='text-xs truncate w-40'>
                        {item?.latest_text}
                     </div>
                  </div>
                  <div className='flex-shrink-0 ml-2 self-end mb-1'>
                     {item.receiver_unseen > 0 ? (
                        <span className='flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full'>
                           {item?.receiver_unseen}
                        </span>
                     ) : (
                        ''
                     )}
                  </div>
               </div>
            );
         });
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
   const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         handleSendMessage();
      }
   };
   return (
      <div
         className={`grid grid-cols-12 antialiased text-[#374b73] shadow-md shadow-gray-300 w-full md:w-10/12 mx-auto rounded-md bg-white ${
            userSignedIn?.role === Shipper ? '' : 'mt-10'
         }`}
      >
         <div
            className={`flex flex-row lg:col-span-3 flex-shrink-0 bg-white p-2 lg:p-4 rounded-md ${
               isShipper ? 'col-span-12' : 'col-span-4'
            }`}
         >
            <div className='flex flex-col w-full h-full py-4'>
               <div className='flex flex-row items-center'>
                  <div className='flex flex-row items-center'>
                     <div className='text-xl font-semibold'>Messages</div>
                     <div className='flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium'>
                        {listUnseenMessage?.length}
                     </div>
                  </div>
               </div>
               <div className='mt-5 mb-2'>
                  <div className={`flex items-center relative w-full`}>
                     <input
                        placeholder='Search conversation'
                        className={` border-none outline-none ring-0 focus:ring-purple-700 bg-gray-100 rounded-full text-sm transition-all duration-500 w-full`}
                        type='text'
                     />
                     <div
                        className={`cursor-pointer border border-none hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm text-center inline-flex items-center p-1 ml-1`}
                     >
                        <MagnifyingGlassIcon className='w-7 h-7' />
                     </div>
                  </div>
               </div>
               <div className='mt-5'>
                  <ul className='flex flex-row items-center justify-between'>
                     <li>
                        <a
                           href='#'
                           className='flex items-center pb-3 text-xs font-semibold relative text-indigo-800'
                        >
                           <span>All Conversations</span>
                           <span className='absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full' />
                        </a>
                     </li>
                  </ul>
               </div>
               <div className='w-full mt-2'>
                  <div className='flex flex-col w-full'>
                     {renderListConversation()}
                  </div>
               </div>
            </div>
         </div>
         {list_conversation?.data?.length > 0 ? (
            <>
               {isMobile && userSignedIn?.role == Shipper ? (
                  <></>
               ) : (
                  <div className='flex flex-col h-full col-span-8 lg:col-span-9  px-2 py-6 border-l border-gray-100 rounded-lg'>
                     <div className='flex flex-row items-center py-4 px-6 rounded-md shadow shadow-gray-300 w-full'>
                        {renderInformation()}
                     </div>
                     <div className='h-full overflow-hidden py-4'>
                        <div
                           style={{
                              display: 'flex',
                              flexDirection: 'column-reverse',
                           }}
                           id='scrollable'
                           className='h-[50vh] overflow-y-auto'
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
                              loader={
                                 message_in_conversation?.currentPage ===
                                 message_in_conversation?.firstPage ? (
                                    ''
                                 ) : (
                                    <h6>Loading</h6>
                                 )
                              }
                              hasMore={
                                 message_in_conversation?.currentPage ===
                                 message_in_conversation?.lastPages
                                    ? false
                                    : true
                              }
                           >
                              <div className='grid grid-cols-12 gap-y-2 '>
                                 {message_in_conversation?.data
                                    ?.slice()
                                    ?.reverse()
                                    ?.map((item) => {
                                       if (
                                          userSignedIn?.id !== item?.sender_id
                                       ) {
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
                              onKeyPress={handleKeyPress}
                              // disabled={
                              //    conversation_detail?.Order?.status ===
                              //    OrderStatus.Delivered
                              //       ? true
                              //       : false
                              // }
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
                              disabled={
                                 conversation_detail?.Order?.status ===
                                 OrderStatus.Delivered
                                    ? true
                                    : false
                              }
                              onClick={handleSendMessage}
                              className='flex justify-center items-center  h-10 w-10 rounded-full object-cover bg-gray-100 hover:bg-[#ffb4b4] text-[#374b73] hover:text-white transition-all duration-200'
                           >
                              <PaperAirplaneIcon className='w-5 h-5' />
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </>
         ) : (
            <div className='flex flex-col justify-center h-[70vh] col-span-8 lg:col-span-9 px-2 py-6 border-l border-gray-100 rounded-lg '>
               <h4 className='text-center text-lg text-[#374b73] font-bold'>
                  {' '}
                  No message
               </h4>
            </div>
         )}
      </div>
   );
};

export default Message;
