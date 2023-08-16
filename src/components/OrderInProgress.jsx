import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import mapPin from '../assets/img/map_pin.png';
import { OrderStatus } from '../enums/OrderStatus';
import { convertToCurrency } from '../utils/utils-functions';
import alterImg from '../assets/img/alter-ava.png';
import {
   cancelOrderAction,
   changeOrderStatusAction,
   getOrderInProgressAction,
} from '../redux/action/order-action';
import { getUserFromLocal } from '../utils/utils-functions';
import MapBox from './MapBox';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
   Button,
   Select,
} from '@chakra-ui/react';

const OrderInProgress = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const signedInUser = getUserFromLocal();
   const order_in_progress = useSelector(
      (state) => state.orderReducer.order_in_progress
   );
   const reasonsToCancel = [
      { id: 1, value: 'Không thể đảm bảo giao hàng đúng thời hạn' },
      { id: 2, value: 'Vấn đề sức khỏe cá nhân' },
      { id: 3, value: 'Lý do gia đình' },
      { id: 4, value: 'Không phù hợp với đặc điểm hàng hóa' },
      { id: 5, value: 'Không thể liên hệ với người gửi/người nhận' },
      { id: 6, value: 'Vị trí giao hàng xa quá mức' },
      { id: 7, value: 'Lý do an toàn' },
      { id: 8, value: 'Hàng hóa không đáp ứng yêu cầu' },
      { id: 9, value: 'Lý do tài chính' },
      { id: 10, value: 'Vấn đề vận chuyển' },
   ];
   const [reason, setReason] = useState(reasonsToCancel[0].value);
   const checkIfDateIsLate = (dateString) => {
      const targetDate = moment(dateString);
      const currentTime = moment();
      return currentTime.isAfter(targetDate);
   };
   const renderOrderTotalPrice = () => {
      let total = 0;
      order_in_progress?.OrderDetail?.map((item) => {
         total += Number(item?.price);
      });
      return convertToCurrency(total);
   };
   const renderButton = () => {
      if (order_in_progress?.status === OrderStatus.OutOfDelivery) {
         return (
            <button
               onClick={() => {
                  const object = {
                     order_id: order_in_progress?.id,
                     status: OrderStatus.BeingShipped,
                  };
                  dispatch(changeOrderStatusAction(object));
               }}
               className='py-3 px-4 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-full font-semibold text-sm w-full mb-5 shadow-md shadow-gray-300'
            >
               Order received
            </button>
         );
      } else if (order_in_progress?.status === OrderStatus.BeingShipped) {
         return (
            <button
               onClick={() => {
                  const object = {
                     order_id: order_in_progress?.id,
                     status: OrderStatus.Delivered,
                  };
                  dispatch(changeOrderStatusAction(object));
                  dispatch(getOrderInProgressAction(signedInUser?.id));
               }}
               className='py-3 px-4 text-white bg-gradient-to-r from-yellow-300 to-yellow-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-full font-semibold text-sm w-full mb-5 shadow-md shadow-gray-300'
            >
               Arrived
            </button>
         );
      }
   };
   return (
      <div className='text-[#374b73] order_in_progress'>
         <h1 className='text-2xl font-bold'>
            Order #{order_in_progress?.order_code}
         </h1>
         <div className='my-4 flex text-xl items-center'>
            <img
               src={
                  order_in_progress?.User?.avatar
                     ? order_in_progress?.User?.avatar
                     : alterImg
               }
               className='w-[3.2rem] h-[3.2rem] rounded-full'
            />

            <div className='ml-2'>
               <h1 className='text-md font-bold text-gray-500'>
                  {order_in_progress?.User?.first_name}{' '}
                  {order_in_progress?.User?.last_name}
               </h1>
               <h1 className='text-[15px] font-normal cursor-pointer text-gray-500 '>
                  {order_in_progress?.User?.phone}
               </h1>
            </div>
         </div>
         <div className='w-full mx-auto h-[1px] bg-gray-300 my-5'></div>
         <div className='flex items-center text-gray-400 text-sm my-5'>
            <img
               src={mapPin}
               className='w-12 h-12 object-contain'
            />
            <h1 className='ml-2 text-[16px] text-green-500 font-bold '>
               Ship to: {order_in_progress?.street}, {order_in_progress?.ward},{' '}
               {order_in_progress?.district}, {order_in_progress?.province}
            </h1>
         </div>

         <MapBox order_in_progress={order_in_progress} />

         <div className='flex my-5'>
            <p className='text-md text-[#374b73] font-bold'>Ordered date:</p>
            <span className='text-md ml-2 font-semibold text-yellow-400'>
               {moment(order_in_progress?.order_date).format('LLL')}
            </span>
         </div>
         <div className='flex my-5'>
            <p className='text-md text-[#374b73] font-bold'>Delivery at:</p>
            <span
               className={`ml-2 font-semibold ${
                  checkIfDateIsLate(order_in_progress?.order_date)
                     ? 'text-green-500'
                     : 'text-red-500'
               }`}
            >
               {moment(order_in_progress?.order_date).format('LL')}
            </span>
         </div>
         <div className='w-full mx-auto h-[1px] bg-gray-300 my-5'></div>
         <div className='mt-2'>
            <h1 className='text-xl font-bold my-5'>Order Detail</h1>
            <div className='flex w-full'>
               <p className='text-black font-semibold text-lg w-2/4'># Item</p>
               <p className='text-black font-semibold text-lg w-1/4 text-center'>
                  Q.ty
               </p>
               <p className='text-black font-semibold text-lg w-1/4 text-end'>
                  Price
               </p>
            </div>
            <div className='my-1'>
               {order_in_progress?.OrderDetail?.map((item) => {
                  return (
                     <div
                        key={Math.random()}
                        className='flex w-full justify-between items-stretch my-3'
                     >
                        <p className='text-[#374b73] font-semibold w-2/4 text-sm'>
                           {item?.Product?.name}
                        </p>
                        <p className='text-gray-500 font-semibold text-center w-1/4'>
                           {item?.quantity}
                        </p>
                        <p className='text-gray-500 font-semibold w-1/4 text-end'>
                           {convertToCurrency(Number(item?.price))}
                        </p>
                     </div>
                  );
               })}
            </div>
            <div className='flex w-full justify-between my-4'>
               <p className=' font-semibold text-lg'>Total price:</p>
               <p className='text-gray-500 font-semibold'>
                  {renderOrderTotalPrice()}
               </p>
            </div>
         </div>
         <div className='w-10/12 mx-auto justify-around mt-8'>
            {renderButton()}
            <button
               onClick={onOpen}
               className='py-3 px-4 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 rounded-full font-semibold text-sm w-full shadow-md shadow-gray-300'
            >
               Cancel
            </button>
            <Modal
               isOpen={isOpen}
               onClose={onClose}
               isCentered
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>
                     <h1 className='text-md font-bold text-red-600'>
                        Pick A Cancel Reason
                     </h1>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <div className='w-10/12 mx-auto flex justify-center'>
                        <select
                           onChange={(e) => {
                              setReason(e.target.value);
                           }}
                           value={reason}
                           className='py-2 rounded-lg mx-2'
                           placeholder='Select option'
                        >
                           {reasonsToCancel?.map((item) => {
                              return (
                                 <option
                                    key={Math.random()}
                                    className='flex items-center text-sm text-ellipsis whitespace-nowrap overflow-hidden'
                                    value={item.value}
                                 >
                                    {item.value}
                                 </option>
                              );
                           })}
                        </select>
                     </div>
                  </ModalBody>
                  <ModalFooter>
                     <Button
                        colorScheme='gray'
                        mr={3}
                        onClick={onClose}
                     >
                        Close
                     </Button>
                     <Button
                        onClick={() => {
                           let data = {
                              cancel_reason: reason,
                              order_id: order_in_progress?.id,
                           };
                           dispatch(cancelOrderAction(data));
                           onClose();
                        }}
                        colorScheme={'red'}
                        variant='solid'
                     >
                        Cancel
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </div>
      </div>
   );
};

export default OrderInProgress;
