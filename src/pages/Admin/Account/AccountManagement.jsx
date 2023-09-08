'use client';
import React, { useEffect } from 'react';
import { Table } from 'flowbite-react';
import Filter from '../../../components/Filter';
import { useOutletContext } from 'react-router-dom';
import {
   getListUserAction,
   searchUserByEmailAction,
} from '../../../redux/action/user-action';
import { useSelector } from 'react-redux';
import useDebounce from '../../../hooks/useDebounce';
import UserDropdown from '../../../components/UserDropdown';
import alterAvatar from '../../../assets/img/alter-ava.png';
import Pagination from '../../../components/Pagination';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
const AccountManagement = () => {
   const { dispatch, navigate } = useOutletContext();
   const [emailSearch, setEmailSearch] = useState('');
   const debouncedEmailSearch = useDebounce(emailSearch, 300);
   const listUser = useSelector((state) => state.userReducer.list_user);
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
   useEffect(() => {
      dispatch(getListUserAction(listUser?.currentPage, listUser?.pageSize));
   }, []);
   useEffect(() => {
      dispatch(searchUserByEmailAction(emailSearch.toLocaleLowerCase()));
   }, [debouncedEmailSearch]);
   const handleSearchByEmail = (event) => {
      setEmailSearch(event.target.value);
   };
   const renderTableUser = () => {
      return listUser?.data?.map((item) => {
         return (
            <Table.Row
               key={item.id}
               className='bg-white'
            >
               <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>
                  <span
                     onClick={() => {
                        navigate(
                           `/admin/account-management/view-detail/${item?.id}`
                        );
                     }}
                     className='text-[16px] text-[#374b73] hover:text-gray-400 cursor-pointer'
                  >
                     {item.first_name}&nbsp;{item.last_name}
                  </span>
               </Table.Cell>
               <Table.Cell className='text-[16px]'>{item.email}</Table.Cell>
               <Table.Cell>
                  <img
                     src={item.avatar !== null ? item.avatar : alterAvatar}
                     className='w-7 h-7 lg:w-12 lg:h-12 object-cover rounded-full'
                  />
               </Table.Cell>
               <Table.Cell>
                  {item.is_banned ? (
                     <span className='text-left text-red-500'>🔴 Blocked</span>
                  ) : (
                     <span className='text-left text-green-500'>
                        🟢 Available
                     </span>
                  )}
               </Table.Cell>
               <Table.Cell>
                  <UserDropdown
                     dispatch={dispatch}
                     navigate={navigate}
                     item={item}
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
                     onChange={handleSearchByEmail}
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
                     Name
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Email
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Avatar
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Status
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Action
                  </Table.HeadCell>
               </Table.Head>
               <Table.Body className='divide-y'>{renderTableUser()}</Table.Body>
            </Table>
            <div className='w-full flex justify-end mt-5'>
               {listUser?.data?.length > 0 ? (
                  <Pagination
                     data={listUser}
                     getPrevious={() => {
                        dispatch(
                           getListUserAction(
                              listUser?.previousPage,
                              listUser?.pageSize
                           )
                        );
                     }}
                     getNext={() => {
                        dispatch(
                           getListUserAction(
                              listUser?.nextPage,
                              listUser?.pageSize
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

export default AccountManagement;
