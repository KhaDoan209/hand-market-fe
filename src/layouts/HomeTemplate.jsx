import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { socket } from '../socket';
import { SocketMessage } from '../enums/SocketMessage';
import {
   getListPendingDeliveryOrderAction,
   getListWaitingDoneOrderAction,
   getOrderInProgressAction,
} from '../redux/action/order-action';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
} from '@chakra-ui/react';
import { getUserFromLocal } from '../utils/utils-functions';
import { Shipper, User, Admin } from '../utils/variables';
import { useDisclosure } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';
import { MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
const HomeTemplate = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const generateMetaData = () => {
      if (location.pathname !== '/hand-market') {
         return location.pathname
            .slice(1)
            .split(' ')
            .map(function (word) {
               return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
      } else {
         return 'Home';
      }
   };
   const userSignedIn = getUserFromLocal();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [order, setOrder] = useState(null);
   useEffect(() => {
      if (userSignedIn?.role === Shipper) {
         socket.on(SocketMessage.NewOrder, (data) => {
            console.log(data);
            setOrder(data);
            onOpen();
            setTimeout(() => {
               onClose();
            }, 6000);
         });
         socket.on(SocketMessage.NewFreepick, () => {
            dispatch(getListPendingDeliveryOrderAction());
         });
         socket.on(SocketMessage.UpdateFreepick, () => {
            dispatch(getListPendingDeliveryOrderAction());
         });
         socket.on(SocketMessage.UpdateOrderInProgress, () => {
            dispatch(getOrderInProgressAction(userSignedIn?.id));
         });
         socket.on(SocketMessage.UpdateWaitingDone, () => {
            dispatch(getListWaitingDoneOrderAction(userSignedIn?.id));
         });
      }
   }, []);
   return (
      <>
         <Helmet>
            <meta charSet='utf-8' />
            <title>{generateMetaData()} - Hand Market</title>
            <link
               rel='canonical'
               href='http://mysite.com/example'
            />
         </Helmet>
         <div className='container max-w-full'>
            <NavBar
               logo={true}
               navigate={navigate}
               dispatch={dispatch}
            />
            {isMobile && userSignedIn?.role == Shipper ? (
               <>
                  <Modal
                     onClose={onClose}
                     isOpen={isOpen}
                     isCentered
                  >
                     <ModalOverlay />
                     <ModalContent>
                        <ModalHeader>
                           <h1 className='text-orange-400 text-2xl'>
                              New Order
                           </h1>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                           {order !== null ? (
                              <>
                                 <div className='my-2'>
                                    <h1 className='text-lg font-bold text-[#374b73] flex items-center'>
                                       <UserIcon className='w-5 h-5 ' /> Ship
                                       to:
                                    </h1>
                                    <p className='text-gray-400 font-semibold'>
                                       {order?.User?.first_name},{' '}
                                       {order?.User?.last_name}
                                    </p>
                                 </div>
                                 <div className=' my-2'>
                                    <h1 className='text-lg font-bold text-[#374b73] flex items-center'>
                                       <MapPinIcon className='w-5 h-5 ' />{' '}
                                       Address:
                                    </h1>
                                    <p className='text-gray-400 font-semibold'>
                                       {order?.street}, {order?.ward},{' '}
                                       {order?.district}, {order?.province}
                                    </p>
                                 </div>
                              </>
                           ) : (
                              <></>
                           )}
                        </ModalBody>
                        <ModalFooter>
                           <button
                              onClick={() => {
                                 // dispatch(changeOrderStatusAction(object));
                              }}
                              className='py-3 px-4 text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-md font-semibold text-sm w-full mb-5 shadow-md shadow-gray-200'
                           >
                              Pick up
                           </button>
                        </ModalFooter>
                     </ModalContent>
                  </Modal>
               </>
            ) : (
               <></>
            )}
            <Outlet context={{ navigate, dispatch }} />
         </div>
      </>
   );
};

export default HomeTemplate;
