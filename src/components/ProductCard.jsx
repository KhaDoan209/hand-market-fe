import React, { useState } from 'react';
import { calculatePriceAfterDiscount } from '../utils/utils-functions';
import star from '../assets/svg/rate-star.svg';
import emptyStar from '../assets/svg/rate-empty-star.svg';
import { ProductType } from '../enums/ProductType';
import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { getUserFromLocal } from '../utils/utils-functions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCartAction } from '../redux/action/cart-action';
import toast from 'react-hot-toast';
import { calculateDiscountPriceInCart } from '../utils/utils-functions';
import { convertToCurrency } from '../utils/utils-functions';
const ProductCard = ({ item, type, letter_length }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const signed_in_user = useSelector(
      (state) => state.authReducer.user_signed_in
   );
   const renderProductPrice = () => {
      if (type === ProductType.discount) {
         if (Number(item?.Discount?.percentage) > 0) {
            return (
               <>
                  <div className='flex my-2'>
                     <span className='text-xl font-bold text-red-500 mr-4'>
                        -{item?.Discount?.percentage}%
                     </span>
                     <span className='text-xl font-bold text-[#5a6e8c]'>
                        {calculatePriceAfterDiscount(
                           item?.price,
                           item?.Discount.percentage
                        )}
                     </span>
                  </div>
                  <span className='text-md font-semibold text-gray-500 line-through tracking-wide block my-2'>
                     {convertToCurrency(Number(item?.price))}
                  </span>
               </>
            );
         } else {
            return (
               <>
                  <div className='my-2'>
                     <span className='text-2xl font-bold text-[#5a6e8c]'>
                        {convertToCurrency(Number(item?.price))}
                     </span>
                  </div>
                  <span className='text-md font-semibold text-gray-500 line-through tracking-wide block my-2 opacity-0'>
                     {convertToCurrency(Number(item?.price))}
                  </span>
               </>
            );
         }
      } else if (type === ProductType.purchase) {
         return (
            <>
               <span className='text-xl font-bold text-[#5a6e8c]'>
                  {calculatePriceAfterDiscount(
                     item?.price,
                     item?.Discount?.percentage
                  )}
               </span>
            </>
         );
      } else if (type === ProductType.normal) {
         <>
            <span className='text-xl font-bold text-[#5a6e8c]'>
               {calculatePriceAfterDiscount(
                  item?.price,
                  item?.Discount?.percentage
               )}
            </span>
         </>;
      } else if (type === ProductType.checkout) {
         return (
            <div className='flex items-baseline mt-4'>
               <span className='text-lg font-semibold text-[#374b73]'>
                  {convertToCurrency(
                     calculateDiscountPriceInCart(
                        item?.Product?.price,
                        item?.Product?.Discount?.percentage,
                        item?.item_quantity
                     )
                  )}
               </span>
               {Number(item?.Product?.Discount?.percentage) !== 0 ? (
                  <div className='text-md line-through font-semibold text-gray-400 mx-3'>
                     {convertToCurrency(
                        Number(item?.Product?.price * item?.item_quantity)
                     )}
                  </div>
               ) : (
                  <></>
               )}
               {item?.Product?.Discount.percentage > 0 ? (
                  <div className='mb-1'>
                     <span className='text-[10px] font-bold text-white bg-red-600 px-2 rounded-md py-1'>
                        -{item?.Product?.Discount.percentage}% off
                     </span>
                  </div>
               ) : (
                  <></>
               )}
            </div>
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
                           {item?.name?.length < letter_length
                              ? item.name
                              : item.name.substring(0, letter_length) + ` ...`}
                        </h5>
                        <div className='mb-3'>{renderProductPrice()}</div>
                        <button
                           onClick={handleOnAddToCart}
                           className='p-2 rounded-md bg-white right-[10%] absolute top-[-15%] text-[#FFB4B4] border border-gray-200 shadow-sm shadow-gray-300  transition-all duration-300 hover:shadow-lg hover:shadow-gray-400 hover:text-white hover:bg-[#374b73]'
                        >
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
                           {item?.name?.length < letter_length
                              ? item.name
                              : item.name.substring(0, letter_length) + ' ...'}
                        </h5>
                        <div className='mb-3'>{renderProductPrice()}</div>
                        <div className='flex items-baseline'>
                           <ShoppingBagIcon className='w-5 h-5 text-[#374b73]' />
                           <span className='text-xl font-bold text-red-500 font-semiboldss mx-1'>
                              {item?.purchase}
                           </span>
                           <span className='text-gray-500'>purchases</span>
                        </div>
                        <button
                           onClick={handleOnAddToCart}
                           className='p-2 rounded-md bg-white right-[10%] absolute top-[-15%] text-[#FFB4B4] border border-gray-200 shadow-sm shadow-gray-300  transition-all duration-300 hover:shadow-lg hover:shadow-gray-400 hover:text-white hover:bg-[#374b73]'
                        >
                           <ShoppingCartIcon className='w-7 h-7' />
                        </button>
                        <div className='my-3 flex'>{renderProductRate()}</div>
                     </div>
                  </div>
               </>
            );
         case ProductType.normal:
            return (
               <>
                  <div className='max-w-sm w-full bg-white rounded-lg shadow-md shadow-gray-200 hover:shadow-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer'>
                     <img
                        className='rounded-t-lg w-full object-contain'
                        src={item.image}
                     />
                     <div className='p-5 relative'>
                        <h5 className='mb-2 text-xl xl:text-2xl font-semibold tracking-tight text-[#374b73]'>
                           {item?.name?.length < letter_length
                              ? item.name
                              : item.name.substring(0, letter_length) + ` ...`}
                        </h5>
                        <div className='mb-3'>{renderProductPrice()}</div>
                        <button
                           onClick={handleOnAddToCart}
                           className='p-2 rounded-md bg-white right-[10%] absolute top-[-15%] text-[#FFB4B4] border border-gray-200 shadow-sm shadow-gray-300  transition-all duration-300 hover:shadow-lg hover:shadow-gray-400 hover:text-white hover:bg-[#374b73]'
                        >
                           <ShoppingCartIcon className='w-7 h-7' />
                        </button>
                        <div className='my-3 flex'>{renderProductRate()}</div>
                     </div>
                  </div>
               </>
            );
         case ProductType.checkout:
            return (
               <div
                  key={Math.random()}
                  className='border-b border-gray-200 mt-4'
               >
                  <div className='flex py-2'>
                     <img
                        className='w-1/6 object-cover'
                        src={item?.Product?.image}
                     />
                     <div className='w-5/6 px-5'>
                        <div className='flex items-center'>
                           <h2 className='text-xl font-bold text-[#374b73] my-2 w-11/12'>
                              {item?.Product?.name}
                           </h2>
                        </div>
                        <div className='text-[#374b73] flex items-center'>
                           <span className='mr-2 font-bold'>Quantity:</span>
                           <span className='text-center font-bold text-md'>
                              {item?.item_quantity}
                           </span>
                        </div>
                        {renderProductPrice()}
                     </div>
                  </div>
               </div>
            );
         default:
            return null;
      }
   };
   const handleOnAddToCart = () => {
      const user = getUserFromLocal();
      if (user) {
         const data = {
            user_id: signed_in_user?.id,
            product_id: item?.id,
         };
         dispatch(addItemToCartAction(data));
         toast.success('Item added to cart', { duration: 1000 });
      } else {
         navigate('/login');
      }
   };
   return <div>{renderComponent()}</div>;
};

export default ProductCard;
