import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import background from '../assets/img/card-bg.jpg';
import chip from '../assets/img/chip.png';
import visa from '../assets/img/visa.png';
import master from '../assets/img/master.png';
import pattern from '../assets/img/pattern.png';
import chevronRight from '../assets/svg/chevron-right.svg';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSavedCardAction } from '../redux/action/card-action';
import { useDisclosure } from '@chakra-ui/react';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalCloseButton,
   Button,
} from '@chakra-ui/react';
const PaymentCard = ({ card, user }) => {
   const dispatch = useDispatch();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
   });
   const [cardMobi, setCardMobi] = useState(false);
   useEffect(() => {
      const handleResize = () => {
         setWindowSize({
            width: window.innerWidth,
         });
      };
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);
   useEffect(() => {
      if (windowSize.width < 768) {
         setCardMobi(true);
      } else {
         setCardMobi(false);
      }
   }, [windowSize.width]);
   const renderCardBrand = () => {
      switch (card?.brand) {
         case 'visa':
            return (
               <img
                  src={visa}
                  className='w-6 md:w-12'
               />
            );

         case 'mastercard':
            return (
               <img
                  src={master}
                  className='w-6 md:w-12'
               />
            );
      }
   };
   return (
      <>
         {cardMobi ? (
            <>
               <div className='flex items-center text-sm md:text-md my-2 text-[#5a6e8c]'>
                  <div className='font-bold'>Card Number:</div>
                  <div className='ml-2'>**** **** **** {card?.last4}</div>
               </div>
               <div className='flex items-center text-sm md:text-md my-2 text-[#5a6e8c]'>
                  <div className='font-bold'>Exp:</div>
                  <p className='mx-2 tracking-widest'>
                     {card?.exp_month}/{card?.exp_year}
                  </p>
               </div>
               <div className='flex items-center text-sm md:text-md my-2 text-[#5a6e8c]'>
                  <div className='font-bold'>Brand</div>
                  <p className='mx-2 tracking-widest'>
                     {card?.brand.toUpperCase()}
                  </p>
               </div>
               <div className='flex items-center text-sm md:text-md my-2 text-[#5a6e8c]'>
                  <div className='font-bold'>Card Holder:</div>
                  <p className='mx-2 tracking-widest'>
                     {user?.first_name +
                        ' ' +
                        `${user?.last_name !== null ? user?.last_name : ''}`}
                  </p>
               </div>
            </>
         ) : (
            <div className='card w-[150px] h-[200px] md:w-[450px] md:h-[250px] mx-auto'>
               <div className='card-inner'>
                  <div className='front'>
                     <img
                        src={background}
                        className='map-img'
                     />
                     <div className='row pt-3'>
                        <img
                           src={chip}
                           className='w-6 md:w-12'
                        />
                        {renderCardBrand()}
                     </div>
                     <div className='row mt-2 md:mt-5'>
                        <p className='text-md md:text-xl tracking-widest'>
                           ****
                        </p>
                        <p className='text-md md:text-xl tracking-widest'>
                           ****
                        </p>
                        <p className='text-md md:text-xl tracking-widest'>
                           ****
                        </p>
                        <p className='text-md md:text-xl tracking-widest'>
                           {card?.last4}
                        </p>
                     </div>
                     <div className='flex align-top justify-between card-holder mt-5 md:mt-10'>
                        <p className='uppercase md:text-md text-lg'>
                           {user?.first_name + ' ' + user?.last_name}
                        </p>
                        <div>
                           <p className='md:text-md tracking-widest text-sm'>
                              MONTH/YEAR
                           </p>
                           <div className='flex items-stretch mt-2'>
                              <div className='flex items-center'>
                                 <div className='block'>
                                    <p className='text-[6px] md:text-[8px]'>
                                       VALID
                                    </p>
                                    <p className='text-[6px] md:text-[8px]'>
                                       THRU
                                    </p>
                                 </div>
                                 <img
                                    src={chevronRight}
                                    className='w-3 h-3 ml-1'
                                 />
                              </div>
                              <p className='text-sm md:text-md mx-2 tracking-widest'>
                                 {card?.exp_month}/{card?.exp_year}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className='back'>
                     <img
                        src={background}
                        className='map-img'
                     />
                     <div className='bar' />
                     <div className='row card-cvv'>
                        <div>
                           <img src={pattern} />
                        </div>
                        <p className='text-sm md:text-lg py-1'>***</p>
                     </div>
                     <div className='w-full flex justify-end mt-5'>
                        <button
                           onClick={onOpen}
                           className='py-2 px-3 bg-white text-[#5a6e8c] rounded-md  hover:bg-gray-200 cursor-pointer transition-all duration-300'
                        >
                           Delete
                        </button>
                     </div>
                  </div>
                  <Modal
                     size={'lg'}
                     isCentered
                     isOpen={isOpen}
                     onClose={onClose}
                  >
                     <ModalOverlay />
                     <ModalContent>
                        <ModalHeader>
                           <p className='text-xl'>
                              Do you want to remove card end with {card?.last4}{' '}
                              ?
                           </p>
                        </ModalHeader>
                        <ModalCloseButton />
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
                                 dispatch(
                                    deleteSavedCardAction(
                                       user?.stripe_customer_id,
                                       card?.card_id
                                    )
                                 );
                                 onClose();
                              }}
                              colorScheme='red'
                              variant='solid'
                           >
                              Remove
                           </Button>
                        </ModalFooter>
                     </ModalContent>
                  </Modal>
               </div>
            </div>
         )}
      </>
   );
};

export default PaymentCard;
