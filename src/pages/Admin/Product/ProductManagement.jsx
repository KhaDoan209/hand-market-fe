'use client';
import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import Filter from '../../../components/Filter';
import { useOutletContext } from 'react-router-dom';
import ProductDropdown from '../../../components/ProductDropdown';
import { useSelector } from 'react-redux';
import useDebounce from '../../../hooks/useDebounce';
import alterProduct from '../../../assets/img/alter-product.jpg';
import Pagination from '../../../components/Pagination';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {
   getListProductAction,
   getProductDetailAction,
} from '../../../redux/action/product-action';
import { getListDiscountAction } from '../../../redux/action/discount-action';
import moment from 'moment/moment';
const ProductManagement = () => {
   const { dispatch, navigate } = useOutletContext();
   // const [emailSearch, setEmailSearch] = useState('');
   // const debouncedEmailSearch = useDebounce(emailSearch, 300);
   const listProduct = useSelector(
      (state) => state.productReducer.list_product
   );
   const category = useSelector((state) => state.categoryReducer.list_category);
   const listFilter = category.map((item) => {
      return {
         label: item.name,
         value: item.id,
      };
   });
   useEffect(() => {
      dispatch(getListProductAction());
   }, []);
   // useEffect(() => {
   // dispatch(searchUserByEmailAction(emailSearch.toLocaleLowerCase()));
   // }, [debouncedEmailSearch]);
   const handleSearchByEmail = (event) => {
      setEmailSearch(event.target.value);
   };

   const renderTableProduct = () => {
      return listProduct?.data?.map((item) => {
         return (
            <Table.Row
               key={item.id}
               className='bg-white'
            >
               <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>
                  <span
                     onClick={() => {
                        dispatch(getProductDetailAction(item?.id));
                        dispatch(getListDiscountAction());
                        navigate(
                           `/admin/product-management/product-detail/${item?.id}`
                        );
                     }}
                     className='text-[16px] text-[#374b73] hover:text-gray-400 cursor-pointer'
                  >
                     {item.name}
                  </span>
               </Table.Cell>
               <Table.Cell>
                  <img
                     src={item?.image !== null ? item?.image : alterProduct}
                     className='w-16 h-16 lg:w-24 lg:h-24 object-contain rounded-sm'
                  />
               </Table.Cell>
               <Table.Cell>
                  <span className='text-[16px]'>
                     {Number(item?.price).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                     })}
                  </span>
               </Table.Cell>
               <Table.Cell>
                  <span
                     className={`text-[16px] ${
                        item?.in_stock ? 'text-green-500' : 'text-red-500'
                     } `}
                  >
                     {item?.in_stock ? 'In stock' : 'Out of stock'}
                  </span>
               </Table.Cell>
               <Table.Cell>
                  <span className='text-[16px]'>
                     {Number(item?.quantity).toLocaleString()}
                  </span>
               </Table.Cell>
               <Table.Cell>
                  <span className='text-[16px]'>
                     {moment(item?.created_at).format('LLL')}
                  </span>
               </Table.Cell>
               <Table.Cell>
                  <ProductDropdown
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
         <div className='relative overflow-x-auto sm:rounded-lg p-5 h-fit  min-h-[100vh]'>
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
                     Image
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Price
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Status
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Quantity
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Imported Date
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Action
                  </Table.HeadCell>
               </Table.Head>
               <Table.Body className='divide-y'>
                  {renderTableProduct()}
               </Table.Body>
            </Table>
            <div className='w-full flex justify-end mt-5'>
               {listProduct?.data?.length > 0 ? (
                  <Pagination
                     data={listProduct}
                     getPrevious={() => {
                        dispatch(
                           getListProductAction(
                              listProduct?.previousPage,
                              listProduct?.pageSize
                           )
                        );
                     }}
                     getNext={() => {
                        dispatch(
                           getListProductAction(
                              listProduct?.nextPage,
                              listProduct?.pageSize
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

export default ProductManagement;
