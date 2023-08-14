import React, { useState, useRef } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { takeOrderAction } from '../redux/action/order-action';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '../enums/OrderStatus';
const OrderCardShipper = ({ item, tab }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const scrollableRef = useRef(null);
   const [touchStartX, setTouchStartX] = useState(0);
   const [touchMoveX, setTouchMoveX] = useState(0);
   const [isMenuVisible, setIsMenuVisible] = useState(false);
   const { isOpen, onOpen, onClose } = useDisclosure();
   const userSignedIn = useSelector(
      (state) => state.authReducer.user_signed_in
   );
   const handleTouchStart = (event) => {
      setTouchStartX(event.touches[0].clientX);
   };
   const handleTouchMove = (event) => {
      setTouchMoveX(event.touches[0].clientX);
      const scrollDistance = touchStartX - touchMoveX;
      if (scrollDistance > 300) {
         setIsMenuVisible(true);
      } else {
         setIsMenuVisible(false);
      }
   };
   const handleTouchEnd = () => {
      onOpen();
      setTouchStartX(0);
      setTouchMoveX(0);
   };
   const renderModal = () => {
      return (
         <Modal
            isOpen={isOpen}
            onClose={() => {
               setIsMenuVisible(false);
               onClose();
               setTouchStartX(0);
               setTouchMoveX(0);
            }}
            isCentered
            size={'sm'}
         >
            <ModalOverlay />
            <ModalContent>
               <h1 className='text-md font-bold pt-5 pl-2'>
                  Do you want to take order {item?.order_code} ?
               </h1>
               <ModalCloseButton />
               <ModalBody></ModalBody>
               <ModalFooter>
                  <Button
                     variant={'ghost'}
                     colorScheme='red'
                     mr={3}
                     onClick={() => {
                        setIsMenuVisible(false);
                        onClose();
                        setTouchStartX(0);
                        setTouchMoveX(0);
                     }}
                  >
                     No
                  </Button>
                  <Button
                     onClick={() => {
                        onClose();
                        dispatch(
                           takeOrderAction(userSignedIn?.id, item?.id, tab)
                        );
                        setIsMenuVisible(false);
                        setTouchStartX(0);
                        setTouchMoveX(0);
                     }}
                     variant='solid'
                     colorScheme={'facebook'}
                  >
                     Yes
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      );
   };
   return (
      <div
         ref={scrollableRef}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
         className={`my-2 transition-all duration-300 w-full flex items-center h-fit ${
            isMenuVisible ? 'translate-x-[-40px]' : 'translate-x-0'
         }`}
      >
         <div className='block bg-white rounded-md px-4 py-3'>
            <div className='flex items-center text-gray-400 text-sm'>
               <MapPinIcon className='w-5 h-5 text-green-500' />
               <h1 className='mx-1'>Ship to:</h1>
               <p>
                  {item?.User?.first_name}&nbsp;{item?.User?.last_name}
               </p>
            </div>
            <h1 className='text-sm font-bold ml-1 my-2'>
               {item?.street}, {item?.ward}, {item?.district}, {item?.province}
            </h1>
            <div className='flex ml-1 text-sm '>
               <p className='text-yellow-500'>Delivery before:</p>&nbsp;
               <p className='font-semibold text-gray-500'>
                  {moment(item?.expected_delivery_date).format('LLL')}
               </p>
            </div>
         </div>
         {renderModal()}
         {isMenuVisible ? (
            <>
               <div className='flex flex-col justify-center ml-2 h-fit'>
                  <p className='text-white font-bold'>
                     <CheckCircleIcon className='h-7 w-7 bg-green-400 rounded-full' />
                  </p>
               </div>
            </>
         ) : (
            ''
         )}
      </div>
   );
};

export default OrderCardShipper;
