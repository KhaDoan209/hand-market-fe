import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
   addItemToCartAction,
   getItemCartByUserAction,
   removeItemFromCartAction,
   decreaseItemQuantityAction,
} from '../../../redux/action/cart-action';
import { useOutletContext } from 'react-router-dom';
import { calculateDiscountPriceInCart } from '../../../utils/utils-functions';
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import {
   Tooltip,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
   ModalHeader,
   Button,
   ModalFooter,
} from '@chakra-ui/react';
import emptyCart from '../../../assets/img/empty-cart.png';
const ShoppingCart = () => {
   const { dispatch, navigate } = useOutletContext();
   const [selectedItems, setSelectedItems] = useState([]);
   const [item, setItem] = useState('');
   const { isOpen, onOpen, onClose } = useDisclosure();
   const signedInUser = useSelector(
      (state) => state.authReducer.user_signed_in
   );
   const listItemInCart = useSelector(
      (state) => state.cartReducer.list_item_in_cart
   );
   const listCart = JSON.parse(localStorage.getItem('listCart')) || [];
   useEffect(() => {
      dispatch(getItemCartByUserAction(signedInUser?.id));
      const listCart = JSON.parse(localStorage.getItem('listCart')) || [];
      setSelectedItems(listCart);
   }, [listCart?.length]);
   const handleCheckProductToOrder = (item) => {
      const itemExists = selectedItems.some(
         (selectedItem) => selectedItem?.Product?.id === item?.Product?.id
      );
      if (itemExists) {
         setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter(
               (selectedItem) => selectedItem?.Product?.id !== item?.Product?.id
            )
         );
      } else {
         setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
      }
      const listCart = JSON.parse(localStorage.getItem('listCart')) || [];
      const updatedListCart = itemExists
         ? listCart.filter(
              (cartItem) => cartItem?.Product?.id !== item?.Product?.id
           )
         : [...listCart, item];
      localStorage.setItem('listCart', JSON.stringify(updatedListCart));
   };
   const renderModal = () => {
      return (
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size={'2xl'}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
                  <span className='text-black'>
                     Do you want to remove {item?.Product?.name} from cart ?
                  </span>
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody></ModalBody>
               <ModalFooter>
                  <Button
                     variant='solid'
                     mr={3}
                     onClick={onClose}
                  >
                     Close
                  </Button>
                  <Button
                     onClick={() => {
                        const data = {
                           user_id: signedInUser?.id,
                           product_id: item?.Product?.id,
                        };
                        dispatch(removeItemFromCartAction(data));
                        handleRemoveItemFromCart(item?.Product?.id);
                        setItem('');
                        onClose();
                     }}
                     colorScheme={'red'}
                     variant='solid'
                  >
                     Remove
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      );
   };
   const isItemInLocalStorage = (item) => {
      const listCart = JSON.parse(localStorage.getItem('listCart'));
      if (listCart) {
         return listCart.some(
            (cartItem) => cartItem?.Product?.id === item?.Product?.id
         );
      }
      return false;
   };
   const handleRemoveItemFromCart = (productId) => {
      const listCart = JSON.parse(localStorage.getItem('listCart')) || [];
      const updatedListCart = listCart.filter(
         (cartItem) => cartItem?.Product?.id !== productId
      );
      localStorage.setItem('listCart', JSON.stringify(updatedListCart));
   };
   const handleUpdateItemQuantity = (productId, newQuantity) => {
      const listCart = JSON.parse(localStorage.getItem('listCart')) || [];
      const updatedListCart = listCart.map((cartItem) => {
         if (cartItem?.Product?.id === productId) {
            return {
               ...cartItem,
               item_quantity: newQuantity,
            };
         }
         return cartItem;
      });
      if (newQuantity < 1) {
         const filteredListCart = updatedListCart.filter(
            (cartItem) => cartItem?.Product?.id !== productId
         );
         localStorage.setItem('listCart', JSON.stringify(filteredListCart));
      } else {
         localStorage.setItem('listCart', JSON.stringify(updatedListCart));
      }
   };
   const renderSubTotalItemCount = () => {
      let count = 0;
      selectedItems?.map((item) => {
         count += item?.item_quantity;
      });

      return count;
   };
   const renderSubTotalPrice = () => {
      let price = 0;
      selectedItems?.map((item) => {
         price +=
            (Number(item?.Product?.price) -
               Number(item?.Product?.price) *
                  Number(item?.Product?.Discount?.percentage / 100)) *
            item?.item_quantity;
      });
      return price;
   };
   return (
      <div className='w-3/4 mx-auto grid grid-cols-12 gap-5 mb-10'>
         <div className='col-span-9 mt-5 bg-white py-5 px-10 rounded-md shadow-md shadow-gray-300'>
            <div className='my-3'>
               <h1 className='text-[#374b73] text-4xl font-bold mb-10'>
                  Your Shopping Cart
               </h1>
            </div>
            {listItemInCart?.data?.length > 0 ? (
               <>
                  {listItemInCart?.data.map((item) => {
                     return (
                        <div
                           key={Math.random()}
                           className='border-b border-gray-200 mt-4'
                        >
                           <div className='flex py-2'>
                              <div className='flex items-center mr-5'>
                                 <input
                                    id='checked-checkbox'
                                    type='checkbox'
                                    checked={isItemInLocalStorage(item)}
                                    className='w-4 h-4 text-[#374b73] ring-1 ring-[#374b73] bg-gray-100 border-none rounded cursor-pointer focus:ring-0 focus:border-0'
                                    onChange={() => {
                                       handleCheckProductToOrder(item);
                                    }}
                                 />
                              </div>
                              <img
                                 className='w-1/6 object-cover'
                                 src={item?.Product?.image}
                              />
                              <div className='w-5/6 px-5'>
                                 <div className='flex items-center'>
                                    <h2 className='text-xl font-bold text-[#374b73] my-2 w-11/12'>
                                       {item?.Product?.name}
                                    </h2>
                                    <div className='w-1/12'>
                                       <button
                                          onClick={() => {
                                             setItem(item);
                                             onOpen();
                                          }}
                                          className='p-2 bg-gray-200 rounded-md text-[#374b73] hover:bg-[#ffb4b4] hover:text-white transition-all duration-200'
                                       >
                                          <Tooltip
                                             hasArrow
                                             label='Remove from cart'
                                          >
                                             <TrashIcon className='w-5 h-5' />
                                          </Tooltip>
                                       </button>
                                    </div>
                                 </div>

                                 <div className='flex items-baseline'>
                                    <span className='text-lg font-semibold text-[#374b73]'>
                                       {calculateDiscountPriceInCart(
                                          item?.Product?.price,
                                          item?.Product?.Discount?.percentage,
                                          item?.item_quantity
                                       ).toLocaleString('vi-VN', {
                                          style: 'currency',
                                          currency: 'VND',
                                       })}
                                    </span>
                                    {Number(
                                       item?.Product?.Discount?.percentage
                                    ) !== 0 ? (
                                       <div className='text-md line-through font-semibold text-gray-400 mx-3'>
                                          {Number(
                                             item?.Product?.price *
                                                item?.item_quantity
                                          ).toLocaleString('vi-VN', {
                                             style: 'currency',
                                             currency: 'VND',
                                          })}
                                       </div>
                                    ) : (
                                       <></>
                                    )}
                                    {item?.Product?.Discount.percentage > 0 ? (
                                       <div className='mb-1'>
                                          <span className='text-[10px] font-bold text-white bg-red-600 px-2 rounded-md py-1'>
                                             -
                                             {
                                                item?.Product?.Discount
                                                   .percentage
                                             }
                                             % off
                                          </span>
                                       </div>
                                    ) : (
                                       <></>
                                    )}
                                 </div>
                                 <span
                                    className={`text-sm my-1 block ${
                                       item?.Product?.quantity > 0
                                          ? 'text-green-500'
                                          : 'text-red-500'
                                    }`}
                                 >
                                    {item?.Product?.quantity > 0
                                       ? 'In stock'
                                       : 'Out of stock'}
                                 </span>
                                 <div className='text-[#374b73] flex items-center'>
                                    <span className='mr-5 font-bold'>
                                       Quantity:
                                    </span>
                                    <div className='flex w-[15%] justify-between items-center'>
                                       <button
                                          onClick={() => {
                                             const data = {
                                                user_id: signedInUser?.id,
                                                product_id: item?.Product?.id,
                                             };
                                             dispatch(
                                                decreaseItemQuantityAction(data)
                                             );
                                             handleUpdateItemQuantity(
                                                item?.Product?.id,
                                                item.item_quantity - 1
                                             );
                                             const listCart =
                                                JSON.parse(
                                                   localStorage.getItem(
                                                      'listCart'
                                                   )
                                                ) || [];
                                             setSelectedItems(listCart);
                                          }}
                                          className='p-1 rounded-md bg-gray-100 text-[#374b73] hover:bg-[#374b73] hover:border-white hover:text-white transition-all duration-200'
                                       >
                                          <MinusIcon className='w-5 h-5' />
                                       </button>
                                       <span className='w-2/4 text-center font-bold text-md'>
                                          {item?.item_quantity}
                                       </span>
                                       <button
                                          onClick={() => {
                                             const data = {
                                                user_id: signedInUser?.id,
                                                product_id: item?.Product?.id,
                                             };
                                             dispatch(
                                                addItemToCartAction(data)
                                             );
                                             handleUpdateItemQuantity(
                                                item?.Product?.id,
                                                item.item_quantity + 1
                                             );
                                             const listCart =
                                                JSON.parse(
                                                   localStorage.getItem(
                                                      'listCart'
                                                   )
                                                ) || [];
                                             setSelectedItems(listCart);
                                          }}
                                          className='p-1 rounded-md bg-gray-100 text-[#374b73] hover:bg-[#374b73] hover:border-white hover:text-white transition-all duration-200'
                                       >
                                          <PlusIcon className='w-5 h-5' />
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </>
            ) : (
               <div className='w-4/5 mx-auto'>
                  <img
                     src={emptyCart}
                     className='w-96 object-cover mx-auto'
                  />
                  <h1 className='text-2xl md:text-3xl text-center mt-5 text-gray-400 font-semibold italic py-5'>
                     Your cart is empty !
                  </h1>
               </div>
            )}

            {renderModal()}
         </div>
         <div className='col-span-3 mt-5 bg-white py-5 px-5 rounded-md shadow-md shadow-gray-300 h-fit'>
            <div className='flex items-baseline'>
               <h1 className='text-[#374b73] font-semibold text-lg'>
                  Subtotal:
               </h1>
               &nbsp;
               <span className='text-[#374b73] font-semibold text-xl'>
                  ({renderSubTotalItemCount()} items)
               </span>
            </div>
            <h2 className='text-[#374b73] font-semibold text-md'>
               <span className='text-gray-500'>Total price:</span>&nbsp;
               <div className='inline text-lg font-bold'>
                  {renderSubTotalPrice().toLocaleString('vi-VN', {
                     style: 'currency',
                     currency: 'VND',
                  })}
               </div>
               {renderSubTotalItemCount() > 0 ? (
                  <div className='w-full flex justify-center'>
                     <button
                        onClick={() => {
                           navigate('/user/view-order-detail/:id');
                        }}
                        className='py-2 px-3 mt-5 rounded-md bg-gray-100 text-[#374b73] transition-all duration-200 text-sm shadow-sm shadow-gray-300  hover:bg-[#374b73] hover:border-white hover:text-white'
                     >
                        Proceed to checkout
                     </button>
                  </div>
               ) : (
                  <></>
               )}
            </h2>
         </div>
      </div>
   );
};

export default ShoppingCart;
