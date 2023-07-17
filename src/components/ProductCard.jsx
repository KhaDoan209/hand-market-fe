import React from 'react';
import { calculatePriceAfterDiscount } from '../utils/utils-functions';
import star from '../assets/svg/rate-star.svg';
import emptyStar from '../assets/svg/rate-empty-star.svg';
import { ProductType } from '../enums/ProductType';
import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
const ProductCard = ({ item, type, letter_length }) => {
   const renderProductPrice = () => {
      if (type === ProductType.discount) {
         if (Number(item?.Discount?.percentage) > 0) {
            return (
               <>
                  <div className='flex my-2'>
                     <span className='text-2xl font-bold text-red-500 mr-3'>
                        -{item?.Discount.percentage}%
                     </span>
                     <span className='text-2xl font-bold text-[#5a6e8c]'>
                        {calculatePriceAfterDiscount(
                           item?.price,
                           item?.Discount.percentage
                        )}
                     </span>
                  </div>
                  <span className='text-md font-semibold text-gray-500 line-through tracking-wide block my-2'>
                     {Number(item?.price).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                     })}
                  </span>
               </>
            );
         } else {
            return (
               <>
                  <div className='my-2'>
                     <span className='text-2xl font-bold text-[#5a6e8c]'>
                        {Number(item?.price).toLocaleString('vi-VN', {
                           style: 'currency',
                           currency: 'VND',
                        })}
                     </span>
                  </div>
                  <span className='text-md font-semibold text-gray-500 line-through tracking-wide block my-2 opacity-0'>
                     {Number(item?.price).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                     })}
                  </span>
               </>
            );
         }
      } else if (type === ProductType.purchase) {
         return (
            <>
               <span className='text-2xl font-bold text-[#5a6e8c]'>
                  {calculatePriceAfterDiscount(
                     item?.price,
                     item?.Discount.percentage
                  )}
               </span>
            </>
         );
      }
   };
   const renderProductRate = () => {
      if (item?.stars > 0) {
         return (
            <div className='flex items-center'>
               <img
                  src={star}
                  className='w-5 h-5 mx-1'
               />
               <span className='font-semibold text-lg'>{item.stars}/5</span>
            </div>
         );
      } else {
         return (
            <div className='flex items-center'>
               <img
                  src={emptyStar}
                  className='w-5 h-5 mx-1'
               />
               <span className='font-semibold text-lg'>{item.stars}/5</span>
            </div>
         );
      }
   };
   const renderComponent = () => {
      switch (type) {
         case ProductType.discount:
            return (
               <>
                  <div className='max-w-sm w-full bg-white rounded-lg shadow-md shadow-gray-200 hover:shadow-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer'>
                     <img
                        className='rounded-t-lg w-full object-contain'
                        src={item.image}
                     />
                     <div className='p-5 relative'>
                        <h5 className='mb-2 text-xl xl:text-2xl font-semibold tracking-tight text-[#374b73]'>
                           {item?.name.length < letter_length
                              ? item.name
                              : item.name.substring(0, letter_length) + ` ...`}
                        </h5>
                        <div className='mb-3'>{renderProductPrice()}</div>
                        <button className='p-2 rounded-md bg-white right-[10%] absolute top-[-15%] text-[#FFB4B4] border border-gray-200 shadow-sm shadow-gray-300  transition-all duration-300 hover:shadow-lg hover:shadow-gray-400 hover:text-white hover:bg-[#374b73]'>
                           <ShoppingCartIcon className='w-7 h-7' />
                        </button>
                        <div className='my-3 flex'>{renderProductRate()}</div>
                     </div>
                  </div>
               </>
            );
         case ProductType.purchase:
            return (
               <>
                  <div className='max-w-sm w-full bg-white rounded-lg shadow-md shadow-gray-200 hover:shadow-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer '>
                     <img
                        className='rounded-t-lg w-full object-contain'
                        src={item.image}
                     />

                     <div className='p-5 relative'>
                        <h5 className='mb-2 text-xl xl:text-2xl font-semibold tracking-tight text-[#374b73]'>
                           {item?.name.length < letter_length
                              ? item.name
                              : item.name.substring(0, letter_length) + ' ...'}
                        </h5>
                        <div className='mb-3'>{renderProductPrice()}</div>
                        <div className='flex items-baseline w-3/5'>
                           <ShoppingBagIcon className='w-5 h-5 text-[#374b73]' />
                           <span className='text-xl font-bold text-red-500 font-semiboldss mx-1'>
                              {item?.purchase}
                           </span>
                           <span className='text-gray-500'>purchases</span>
                        </div>
                        <button className='p-2 rounded-md bg-white right-[10%] absolute top-[-15%] text-[#FFB4B4] border border-gray-200 shadow-sm shadow-gray-300  transition-all duration-300 hover:shadow-lg hover:shadow-gray-400 hover:text-white hover:bg-[#374b73]'>
                           <ShoppingCartIcon className='w-7 h-7' />
                        </button>
                        <div className='my-3 flex'>{renderProductRate()}</div>
                     </div>
                  </div>
               </>
            );
         case 'type3':
            return <Component3 />;
         default:
            return null;
      }
   };
   return <div>{renderComponent()}</div>;
};

export default ProductCard;
