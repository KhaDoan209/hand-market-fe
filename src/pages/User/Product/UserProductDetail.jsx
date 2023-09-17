import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { getProductDetailAction } from '../../../redux/action/product-action';
import { useSelector } from 'react-redux';
import {
   calculatePriceAfterDiscount,
   convertToCurrency,
   getUserFromLocal,
} from '../../../utils/utils-functions';
import star from '../../../assets/svg/rate-star.svg';
import emptyStar from '../../../assets/svg/rate-empty-star.svg';
import { EyeIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { getListDiscountAction } from '../../../redux/action/discount-action';
import { Stat, StatHelpText, StatArrow } from '@chakra-ui/react';
import { addItemToCartAction } from '../../../redux/action/cart-action';
import toast from 'react-hot-toast';

const UserProductDetail = () => {
   const { id } = useParams();
   const { dispatch, navigate } = useOutletContext();
   const product_detail = useSelector(
      (state) => state.productReducer.product_detail
   );
   useEffect(() => {
      dispatch(getProductDetailAction(id));
      dispatch(getListDiscountAction());
   }, []);
   const handleOnAddToCart = () => {
      const user = getUserFromLocal();
      if (user) {
         const data = {
            user_id: user?.id,
            product_id: product_detail?.id,
         };
         dispatch(addItemToCartAction(data));
         toast.success('Item added to cart', { duration: 1000 });
      } else {
         navigate('/login');
      }
   };
   const renderRate = () => {
      if (product_detail?.stars > 0) {
         const stars = [];
         for (let i = 0; i < product_detail?.stars; i++) {
            stars.push(
               <Fragment key={Math.random()}>
                  <img
                     src={star}
                     className='w-7 h-7 mx-1'
                  />
               </Fragment>
            );
         }
         return stars;
      } else {
         const stars = [];
         for (let i = 0; i < 5; i++) {
            stars.push(
               <Fragment key={Math.random()}>
                  <img
                     src={emptyStar}
                     className='w-7 h-7 mx-1'
                  />
               </Fragment>
            );
         }
         return stars;
      }
   };
   return (
      <div className='w-10/12 mx-auto product-detail-page bg-white mt-10 mb-20 px-10 py-14 rounded-md shadow-lg shadow-gray-300 relative'>
         <div className='grid grid-cols-12'>
            <div className='col-span-5'>
               <div className='w-full h-full border-r border-gray-200 flex flex-col justify-start relative'>
                  <img
                     className='pr-2 h-[400px] w-full object-cover xl:object-contain'
                     src={
                        product_detail?.image ? product_detail?.image : 'image'
                     }
                  />
               </div>
            </div>
            <div className='col-span-7 ml-5 relative'>
               <div className='flex justify-between px-5'>
                  <div className='my-2 mx-2 flex text-purple-700'>
                     <ShoppingBagIcon className='w-7 h-7' />
                     <h2 className='bg-transparent text-xl font-semibold ml-2'>
                        {product_detail?.purchase}
                     </h2>
                  </div>
                  <div className='my-2 mx-2 flex items-center text-purple-700'>
                     <EyeIcon className='w-7 h-7' />
                     <h2 className='ml-2 text-xl font-semibold '>
                        {product_detail?.views}
                     </h2>
                  </div>
               </div>
               <div className='bg-white px-5 py-3 rounded-md '>
                  <div className='my-2 flex justify-between items-stretch'>
                     <div className='w-3/5 mx-2'>
                        <h1 className='font-mono font-bold text-gray-500 text-lg'>
                           Name:
                        </h1>
                        <h1 className='text-3xl font-bold text-[#374b73]'>
                           {product_detail?.name}
                        </h1>
                     </div>
                     <div className='my-2 w-2/5 mx-2'>
                        <h1 className='font-mono font-bold text-gray-500 text-lg'>
                           Rate:
                        </h1>
                        <div className='flex'>{renderRate()}</div>
                     </div>
                  </div>
                  {Number(product_detail?.Discount?.percentage) === 0 ? (
                     ''
                  ) : (
                     <div className='mt-5 mx-2'>
                        <h2 className='text-xl line-through font-normal text-gray-400'>
                           {convertToCurrency(Number(product_detail?.price))}
                        </h2>
                     </div>
                  )}
                  <div className='flex items-baseline'>
                     <div className='mx-2'>
                        <h2 className='text-4xl font-semibold text-green-400'>
                           {calculatePriceAfterDiscount(
                              product_detail?.price,
                              product_detail?.Discount?.percentage
                           )}
                        </h2>
                     </div>
                     {Number(product_detail?.Discount?.percentage) == 0 ? (
                        ''
                     ) : (
                        <div className='ml-4 w-1/5'>
                           <Stat>
                              <StatHelpText>
                                 <div className='items-center inline-flex'>
                                    <StatArrow type='decrease' />
                                    <h2 className='text-2xl font-semibold text-red-500'>
                                       {product_detail?.Discount?.percentage} %
                                    </h2>
                                 </div>
                              </StatHelpText>
                           </Stat>
                        </div>
                     )}
                  </div>
                  <div className='mt-5 mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Description:
                     </h1>
                     <p className='text-md text-[#374b73] text-justify'>
                        {product_detail?.description}
                     </p>
                  </div>
                  <button
                     onClick={handleOnAddToCart}
                     className='mx-2 mt-10 bg-red-600 hover:bg-red-500 transition-all duration-200 text-white w-full py-4 rounded-lg text-xl font-semibold'
                  >
                     Add to cart
                  </button>
                  <div className='mt-5 items-center grid grid-cols-12'>
                     <div className='col-span-12 flex my-2'>
                        <div className='my-2 w-2/6 mx-2'>
                           <h1 className='font-mono font-bold text-gray-500 text-lg'>
                              Category:
                           </h1>
                           <h2 className='text-xl font-semibold text-[#5a6e8c]'>
                              {product_detail?.Category?.name}
                           </h2>
                        </div>
                        <div className='my-2 w-2/6 mx-2'>
                           <h1 className='font-mono font-bold text-gray-500 text-lg'>
                              Type:
                           </h1>
                           <h2 className='text-xl font-semibold text-[#5a6e8c]'>
                              {product_detail?.type}
                           </h2>
                        </div>
                        <div className='my-2 w-2/6 mx-2'>
                           <h1 className='font-mono font-bold text-gray-500 text-lg'>
                              Brand:
                           </h1>
                           <h1 className='text-xl font-semibold text-[#374b73] text-justify'>
                              {product_detail?.brand}
                           </h1>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='col-span-12 my-5 h-[1px] bg-gray-100'></div>
         </div>
      </div>
   );
};

export default UserProductDetail;
