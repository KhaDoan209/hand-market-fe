import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getListOrderAction } from '../../../redux/action/order-action';
import { OrderStatus } from '../../../enums/OrderStatus';
import Filter from '../../../components/Filter';
import Pagination from '../../../components/Pagination';
import {
   MagnifyingGlassIcon,
   Cog8ToothIcon,
   ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/solid';
import { Table } from 'flowbite-react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import moment from 'moment/moment';
import OrderDropdown from '../../../components/OrderDropdown';
const OrderManagementAdmin = () => {
   const listFilter = [
      {
         label: 'Last day',
         value: 'Last day',
      },
      {
         label: 'Last 7 days',
         value: 'Last 7 days',
      },
      {
         label: 'Last 30 days',
         value: 'Last 30 days',
      },
      {
         label: 'Last month',
         value: 'Last month',
      },
      {
         label: 'Last year',
         value: 'Last year',
      },
   ];
   const { dispatch, navigate } = useOutletContext();
   const list_order = useSelector((state) => state.orderReducer.list_order);
   useEffect(() => {
      dispatch(getListOrderAction(1, 8, undefined));
   }, []);
   const renderOrderStatus = (order_status) => {
      switch (order_status) {
         case OrderStatus.OutOfDelivery:
            return (
               <h1 className='text-yellow-300 font-bold'>
                  {order_status.toUpperCase()}
               </h1>
            );
         case OrderStatus.Delivered:
            return (
               <h1 className='text-purple-500 font-bold'>
                  {order_status.toUpperCase()}
               </h1>
            );
         case OrderStatus.Canceled:
            return (
               <h1 className='text-red-500 font-bold'>
                  {order_status.toUpperCase()}
               </h1>
            );
         case OrderStatus.Freepick:
            return (
               <h1 className='text-orange-300 font-bold'>
                  {order_status.toUpperCase()}
               </h1>
            );
         case OrderStatus.Done:
            return (
               <h1 className='text-green-500 font-bold'>
                  {order_status.toUpperCase()}
               </h1>
            );
         default:
            break;
      }
   };
   const renderTableOrder = () => {
      return list_order?.data?.map((item) => {
         return (
            <Table.Row
               key={item.id}
               className='bg-white'
            >
               <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>
                  <span
                     onClick={() => {
                        navigate(
                           `/admin/order-management/order-detail/${item?.id}`
                        );
                     }}
                     className='text-[16px] text-[#374b73] hover:text-gray-400 cursor-pointer'
                  >
                     {item?.order_code}
                  </span>
               </Table.Cell>
               <Table.Cell className='text-[16px]'>
                  {item?.User?.email}
               </Table.Cell>
               <Table.Cell>{renderOrderStatus(item?.status)}</Table.Cell>
               <Table.Cell>{moment(item?.order_date).format('LLL')}</Table.Cell>
               <Table.Cell>
                  <OrderDropdown
                     item={item}
                     navigate={navigate}
                     dispatch={dispatch}
                  />
               </Table.Cell>
            </Table.Row>
         );
      });
   };
   return (
      <div className='w-full mx-auto mt-2 px-2'>
         <div className='relative overflow-x-auto sm:rounded-lg p-5 h-fit'>
            <div className='flex items-center justify-between w-full mb-5'>
               <Filter
                  listFilter={listFilter}
                  initialValue={listFilter[0]}
               />
               <label
                  htmlFor='table-search'
                  className='sr-only'
               >
                  Search
               </label>
               <div className='relative'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                     <MagnifyingGlassIcon className='w-5 h-5' />
                  </div>
                  <input
                     type='text'
                     id='table-search'
                     className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                     placeholder='Search user by email'
                  />
               </div>
            </div>

            <Table hoverable>
               <Table.Head>
                  <Table.HeadCell className='text-[#374b73]'>
                     Order
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Placed By
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Status
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Placed At
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Action
                  </Table.HeadCell>
               </Table.Head>
               <Table.Body className='divide-y'>
                  {renderTableOrder()}
               </Table.Body>
            </Table>
            <div className='w-full flex justify-end mt-5'>
               {list_order?.data?.length > 0 ? (
                  <Pagination
                     data={list_order}
                     getPrevious={() => {
                        dispatch(
                           getListOrderAction(
                              list_order?.previousPage,
                              list_order?.pageSize
                           )
                        );
                     }}
                     getNext={() => {
                        dispatch(
                           getListOrderAction(
                              list_order?.nextPage,
                              list_order?.pageSize
                           )
                        );
                     }}
                  />
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   );
};

export default OrderManagementAdmin;
