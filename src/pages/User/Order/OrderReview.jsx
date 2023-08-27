import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
   PencilSquareIcon,
   QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import ProductCard from '../../../components/ProductCard';
import { ProductType } from '../../../enums/ProductType';
import {
   renderSubTotalPrice,
   convertToCurrency,
   countVAT,
} from '../../../utils/utils-functions';
import visa from '../../../assets/img/visa-card.png';
import mastercard from '../../../assets/img/mastercard.jpg';
import { getListSavedCardAction } from '../../../redux/action/card-action';
import { calculateDiscountPriceInCart } from '../../../utils/utils-functions';
import { createNewOrderAction } from '../../../redux/action/order-action';
const OrderReview = () => {
   const { dispatch, navigate } = useOutletContext();
   const [showInstruction, setShowInstruction] = useState(false);
   const userSignedIn = useSelector(
      (state) => state.authReducer.user_signed_in
   );
   const listSavedCards = useSelector((state) => state.cardReducer?.list_card);
   const shippingOptions = [
      {
         label: 'Standard',
         value: '2',
         description:
            'Standard shipping, order will be delivered within 3 - 5 days',
      },
      {
         label: 'Fast',
         value: '3',
         description: 'Delivery within 2 - 3 days',
      },
      {
         label: 'Immediately',
         value: '5',
         description: 'Delivery within a day',
      },
   ];
   const [shipping, setShipping] = useState('Standard');
   const [shippingPercent, setShippingPercent] = useState('2');
   const [selectCard, setSelectCard] = useState(
      listSavedCards?.length > 0 ? listSavedCards[0]?.last4 : null
   );
   const [cardId, setCardId] = useState(
      listSavedCards?.length > 0 ? listSavedCards[0]?.card_id : null
   );
   const [itemToCheckOut, setItemToCheckOut] = useState([]);
   useEffect(() => {
      if (userSignedIn?.Address === null || userSignedIn?.phone === null) {
         toast.error(
            <div className='w-fit flex'>
               <span className='text-red-500 block'>
                  Please enter your information before checkout
               </span>
               <button
                  className='text-[#5a6e8c] hover underline font-semibold ml-3'
                  onClick={() => {
                     navigate(`user/user-profile/${userSignedIn?.id}`);
                  }}
               >
                  Update
               </button>
            </div>,
            {
               duration: 3000,
               id: 'updateInfor',
               style: {
                  minWidth: 'fit-content',
               },
            }
         );
      }

      return () => {
         toast.dismiss();
      };
   }, []);
   useEffect(() => {
      dispatch(getListSavedCardAction(userSignedIn?.stripe_customer_id));
      setItemToCheckOut(JSON.parse(localStorage.getItem('listCart')));
   }, []);
   const calculateTotalOrder = () => {
      return (
         (renderSubTotalPrice(itemToCheckOut) * Number(shippingPercent)) / 100 +
         renderSubTotalPrice(itemToCheckOut) +
         countVAT(
            renderSubTotalPrice(itemToCheckOut) +
               (renderSubTotalPrice(itemToCheckOut) * Number(shippingPercent)) /
                  100
         )
      );
   };
   const renderCardImage = (item) => {
      if (item?.brand === 'visa') {
         return (
            <img
               className='w-8 h-5 rounded-sm mx-3'
               src={visa}
            />
         );
      } else if (item?.brand === 'mastercard') {
         return (
            <img
               className='w-8 h-5 rounded-sm mx-3'
               src={mastercard}
            />
         );
      }
   };
   const handleOnPlaceOrder = () => {
      if (userSignedIn?.Address === null || userSignedIn?.phone === null) {
         toast.error('Please update all of your information before check out');
      } else if (listSavedCards?.length === 0) {
         toast.error('Please update your payment method');
      } else if (Math.ceil(Number(calculateTotalOrder())) <= 20000) {
         toast.error('The total order must be greater than 20,000 VND');
      } else if (selectCard === null) {
         toast.error('Please choose the payment method');
      } else {
         const productToCheckout = [];
         itemToCheckOut?.map((item) => {
            const itemInCart = {
               id: item?.product_id,
               quantity: item?.item_quantity,
               price: calculateDiscountPriceInCart(
                  item?.Product?.price,
                  item?.Product?.Discount?.percentage,
                  item?.item_quantity
               ),
            };
            productToCheckout.push(itemInCart);
         });
         const newOrder = {
            order_total: Math.ceil(Number(calculateTotalOrder())),
            card_id: cardId,
            product: productToCheckout,
            user_id: userSignedIn?.id,
            shipping_method: shipping,
         };
         dispatch(createNewOrderAction(navigate, newOrder));
      }
   };
   return (
      <div className='w-10/12 md:w-3/4 mx-auto grid grid-cols-12 gap-5 mb-10'>
         <div className='col-span-12 lg:col-span-9 mt-5 bg-white py-3 px-4 md:py-5 md:px-10 rounded-md shadow-md shadow-gray-300'>
            <div className='my-3'>
               <h1 className='text-[#374b73] text-3xl md:text-4xl font-bold mb-5 md:mb-10'>
                  Review Your Order
               </h1>
            </div>
            <div className='my-5 md:my-10 md:flex items-baseline'>
               <h2 className='text-[#374b73] text-xl font-bold w-full md:w-2/5'>
                  Shipping Address:
               </h2>
               {userSignedIn?.Address !== null ? (
                  <div className='flex w-full md:w-3/5 justify-between'>
                     <div className='mt-5 md:mt-0 w-full md:w-3/5'>
                        <span className='text-[#374b73] text-md md:text-lg font-semibold block'>
                           {userSignedIn?.first_name}&nbsp;
                           {userSignedIn?.last_name}
                        </span>
                        <span className='text-[#374b73] text-md md:text-lg font-semibold block'>
                           {userSignedIn?.Address?.street},&nbsp;
                           {userSignedIn?.Address?.ward}
                        </span>
                        <span className='text-[#374b73] text-md md:text-lg font-semibold block'></span>
                        <span className='text-[#374b73] text-md md:ext-lg font-semibold block'>
                           {userSignedIn?.Address?.district},&nbsp;
                           {userSignedIn?.Address?.province}
                        </span>
                     </div>
                     <div
                        onClick={() => {
                           navigate(`user/user-profile/${userSignedIn?.id}`);
                        }}
                        className='p-1.5 cursor-pointer hover:bg-[#374b73] rounded-md hover:text-white transition-all duration-300'
                     >
                        <PencilSquareIcon className='h-4 w-4 lg:h-5 lg:w-5' />
                     </div>
                  </div>
               ) : (
                  <h1 className='text-md text-red-500 font-semibold'>
                     Please update your address
                  </h1>
               )}
            </div>

            <div className='my-5 md:my-10 md:flex'>
               <h2 className='text-[#374b73] text-xl font-bold w-full md:w-2/5 '>
                  Phone Number:
               </h2>
               {userSignedIn?.phone !== null ? (
                  <div className='flex w-full md:w-3/5 justify-between'>
                     <div className='w-3/5 mt-2 md:mt-0'>
                        <span className='text-[#374b73] text-md md:text-lg font-semibold '>
                           {userSignedIn?.phone}
                        </span>
                     </div>
                     <div
                        onClick={() => {
                           navigate(`user/user-profile/${userSignedIn?.id}`);
                        }}
                        className='p-1.5 cursor-pointer hover:bg-[#374b73] rounded-md hover:text-white transition-all duration-300'
                     >
                        <PencilSquareIcon className='h-4 w-4 lg:h-5 lg:w-5' />
                     </div>
                  </div>
               ) : (
                  <h1 className='text-md text-red-500 font-semibold'>
                     Please update your phone number
                  </h1>
               )}
            </div>

            <div className='my-10'>
               <h2 className='text-[#374b73] text-xl font-bold w-full md:w-2/5'>
                  Ordered Items:
               </h2>
               <div className='mt-5 w-full px-0 md:px-10'>
                  {itemToCheckOut?.length > 0 ? (
                     itemToCheckOut?.map((item) => {
                        return (
                           <div key={Math.random()}>
                              <ProductCard
                                 item={item}
                                 type={ProductType.checkout}
                              />
                           </div>
                        );
                     })
                  ) : (
                     <></>
                  )}
               </div>
            </div>
            <div className='my-5 md:my-10 md:flex'>
               <h2 className='text-[#374b73] text-xl font-bold w-full md:w-2/5'>
                  Your payment cards:
               </h2>
               {listSavedCards?.length > 0 ? (
                  <div className='w-full md:w-3/5 my-5 md:my-0'>
                     {listSavedCards?.map((item) => {
                        return (
                           <div
                              key={Math.random()}
                              className='flex items-center mb-4'
                           >
                              <div className='flex items-center h-5'>
                                 <input
                                    id={item?.card_id}
                                    name={item?.last4}
                                    value={item?.card_id}
                                    type='radio'
                                    checked={
                                       selectCard === item?.last4 ? true : false
                                    }
                                    onChange={(event) => {
                                       setSelectCard(event.target.name);
                                       setCardId(event.target.value);
                                    }}
                                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer'
                                 />
                              </div>
                              {renderCardImage(item)}
                              <div className='text-sm'>
                                 <label
                                    htmlFor={item.label}
                                    className='font-medium text-[#374b73] text-[16px] h-5'
                                 >
                                    {item?.brand.toUpperCase()} ending in{' '}
                                    {item?.last4}
                                 </label>
                                 <p
                                    id='helper-radio-text'
                                    className='text-xs font-semibold text-gray-500 '
                                 >
                                    Expire on {item?.exp_month}/{item?.exp_year}
                                 </p>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               ) : (
                  <h1 className='text-md text-red-500 font-semibold'>
                     You have no added payment method
                  </h1>
               )}
            </div>
            <div className='mt-10 md:flex'>
               <h2 className='text-[#374b73] text-xl font-bold w-full md:w-2/5'>
                  Shipping Option:
               </h2>
               <div className='w-full md:w-3/5 mt-5 md:mt-0'>
                  {shippingOptions.map((item) => {
                     return (
                        <div
                           key={Math.random()}
                           className='flex items-stretch mb-4'
                        >
                           <div className='flex items-center h-5'>
                              <input
                                 id={item.label}
                                 onChange={(e) => {
                                    setShipping(e.target.name);
                                    setShippingPercent(e.target.value);
                                 }}
                                 name={item.label}
                                 type='radio'
                                 value={item.value}
                                 checked={
                                    shipping === `${item.label}` ? true : false
                                 }
                                 className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer'
                              />
                           </div>
                           <div className='ml-2 text-sm'>
                              <label
                                 htmlFor={item.label}
                                 className='font-medium text-[#374b73] text-[16px]'
                              >
                                 {item.label}
                              </label>
                              <p
                                 id='helper-radio-text'
                                 className='text-xs font-normal text-gray-500 '
                              >
                                 {item.description}
                              </p>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
         <div className='col-span-12 lg:col-span-3 mt-5 bg-white py-5 px-5 rounded-md shadow-md shadow-gray-300 h-fit'>
            <div className='flex w-full justify-between items-center'>
               <h1 className='text-[#374b73] font-semibold text-lg'>
                  Order Summary
               </h1>
               <div className='h-fit relative'>
                  <QuestionMarkCircleIcon
                     onMouseEnter={() => {
                        setShowInstruction(true);
                     }}
                     onMouseLeave={() => {
                        setShowInstruction(false);
                     }}
                     className='h-5 w-5 text-purple-800 cursor-pointer'
                  />
                  {showInstruction ? (
                     <div className='absolute right-0'>
                        <div class='w-72 text-sm font-medium bg-white border border-gray-200 rounded-lg'>
                           <ul class='w-full px-4 py-2 font-medium text-left  border-b border-gray-200 list-disc'>
                              <li className='text-purple-600 py-2 list-disc ml-4'>
                                 Phone number and address are required
                              </li>
                              <li className='text-purple-600 py-2 list-disc ml-4'>
                                 Enter at least one payment method before
                                 checkout
                              </li>
                              <li className='text-purple-600 py-2 list-disc ml-4'>
                                 The total order must be greater than 20,000 VNĐ
                              </li>
                           </ul>
                        </div>
                     </div>
                  ) : (
                     <></>
                  )}
               </div>
            </div>
            &nbsp;
            <div className='flex justify-between text-[#374b73] font-semibold my-1'>
               <p>Item({itemToCheckOut?.length}):</p>
               <span>
                  {convertToCurrency(renderSubTotalPrice(itemToCheckOut))}
               </span>
            </div>
            <div className='flex justify-between text-[#374b73] font-semibold my-1'>
               <p>Shipping:</p>
               <span>
                  {convertToCurrency(
                     (renderSubTotalPrice(itemToCheckOut) *
                        Number(shippingPercent)) /
                        100
                  )}
               </span>
            </div>
            <div className='w-full flex justify-end'>
               <div className='w-3/4 bg-gray-300 h-[0.5px] my-3'></div>
            </div>
            <div className='flex justify-between text-[#374b73] font-semibold my-1'>
               <p>Total before taxes:</p>
               <span>
                  {convertToCurrency(
                     (renderSubTotalPrice(itemToCheckOut) *
                        Number(shippingPercent)) /
                        100 +
                        renderSubTotalPrice(itemToCheckOut)
                  )}
               </span>
            </div>
            <div className='flex justify-between text-red-600 font-semibold my-1'>
               <p>Tax (8%):</p>
               <span>
                  {convertToCurrency(
                     countVAT(
                        renderSubTotalPrice(itemToCheckOut) +
                           (renderSubTotalPrice(itemToCheckOut) *
                              Number(shippingPercent)) /
                              100
                     )
                  )}
               </span>
            </div>
            <div className='w-full flex justify-end'>
               <div className='w-3/4 bg-gray-300 h-[0.5px] my-3'></div>
            </div>
            <div className='flex justify-between text-green-600 font-semibold my-1 text-lg'>
               <p>Total Order:</p>
               <span>{convertToCurrency(calculateTotalOrder())}</span>
            </div>
            <div className='w-full flex justify-center mt-2'>
               <button
                  onClick={handleOnPlaceOrder}
                  className='py-2 px-3 mt-5 rounded-md bg-gray-100 text-[#5a6e8c] transition-all duration-200 text-sm shadow-sm shadow-gray-300 hover:bg-[#ffdeb4] hover:border-white  font-semibold'
               >
                  Place order
               </button>
            </div>
         </div>
      </div>
   );
};

export default OrderReview;
