import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import background from '../assets/img/card-bg.jpg';
import chip from '../assets/img/chip.png';
import visa from '../assets/img/visa.png';
import pattern from '../assets/img/pattern.png';
import chevronRight from '../assets/svg/chevron-right.svg';
const PaymentCard = () => {
   return (
      <div className='card w-[350px] h-[200px] md:w-[450px] md:h-[250px] mx-auto'>
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
                  <img
                     src={visa}
                     className='w-6 md:w-12'
                  />
               </div>
               <div className='row mt-2 md:mt-5'>
                  <p className='text-md md:text-xl tracking-widest'>5244</p>
                  <p className='text-md md:text-xl tracking-widest'>2150</p>
                  <p className='text-md md:text-xl tracking-widest'>8252</p>
                  <p className='text-md md:text-xl tracking-widest'>6420</p>
               </div>
               <div className='flex align-top justify-between card-holder mt-5 md:mt-10'>
                  <p className='uppercase md:text-md text-sm'>CARD HOLDER</p>
                  <div>
                     <p className='md:text-md tracking-widest text-sm'>
                        MONTH/YEAR
                     </p>
                     <div className='flex items-stretch mt-2'>
                        <div className='flex items-center'>
                           <div className='block'>
                              <p className='text-[6px] md:text-[8px]'>VALID</p>
                              <p className='text-[6px] md:text-[8px]'>THRU</p>
                           </div>
                           <img
                              src={chevronRight}
                              className='w-3 h-3 ml-1'
                           />
                        </div>
                        <p className='text-sm md:text-md mx-2 tracking-widest'>
                           02/2020
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
                  <p className='text-sm md:text-lg py-2'>824</p>
               </div>
               <div className='row card-text'>
                  <p>
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                     Illum necessitatibus officia quo nesciunt atque?
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PaymentCard;
