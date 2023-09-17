import React from 'react';
import logo from '../assets/img/brand-logo.png';
import { Link } from '@chakra-ui/react';
import masterCard from '../assets/img/master.png';
import visa from '../assets/img/visa-black.png';
import facebook from '../assets/img/facebook.png';
import instagram from '../assets/img/instagram.png';
import youtube from '../assets/img/youtube.png';
import tiktok from '../assets/img/tiktok.png';
import twitter from '../assets/img/twitter.png';
import confirmImg from '../assets/img/bct.png';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
const Footer = () => {
   return (
      <div className='w-full bg-white border border-t-200 mt-10'>
         <div className='w-3/4 mx-auto'>
            <div className='flex justify-center w-full mt-5'>
               <img
                  src={logo}
                  className='object-cover w-52'
               />
            </div>
            <div className='grid grid-cols-12 text-[#374b73] gap-5 lg:gap-10'>
               <div className='my-5 md:my-0 col-span-6 lg:col-span-3'>
                  <h1 className='text-md md:text-xl font-bold mb-4'>
                     About Hand Market
                  </h1>
                  <Link>
                     <li className='list-none font-semibold py-1'>
                        Introduction
                     </li>
                  </Link>
                  <Link>
                     <li className='list-none font-semibold py-1'>
                        Privacy Policy
                     </li>
                  </Link>
               </div>
               <div className='my-5 md:my-0 col-span-6 lg:col-span-3'>
                  <h1 className='text-md md:text-xl font-bold mb-4'>
                     Customer Service
                  </h1>

                  <NavLink
                     to='/faqs'
                     className='list-none font-semibold py-1'
                  >
                     FAQs
                  </NavLink>

                  <Link>
                     <li className='list-none font-semibold py-1'>
                        Refund Policy
                     </li>
                  </Link>
                  <Link>
                     <li className='list-none font-semibold py-1'>
                        Purchasing Policy
                     </li>
                  </Link>
               </div>
               <div className='my-5 md:my-0 col-span-6 lg:col-span-3'>
                  <h1 className='text-md md:text-xl font-bold mb-4'>
                     Payment Method
                  </h1>
                  <div className='flex justify-start'>
                     <img
                        src={visa}
                        className='object-contain w-8 lg:w-16 mr-5'
                     />{' '}
                     <img
                        src={masterCard}
                        className='object-contain w-8 lg:w-16'
                     />
                  </div>
               </div>
               <div className='my-5 md:my-0 col-span-6 lg:col-span-3'>
                  <h1 className='text-md md:text-xl font-bold mb-4'>
                     Connect with us
                  </h1>
                  <div className='flex justify-start'>
                     <div className='mx-2'>
                        <img
                           src={facebook}
                           className='object-contain w-6 lg:w-10'
                        />{' '}
                        <img
                           src={instagram}
                           className='object-contain w-6 lg:w-10'
                        />
                     </div>

                     <div className='mx-2'>
                        <img
                           src={youtube}
                           className='object-contain w-6 lg:w-10'
                        />
                        <img
                           src={tiktok}
                           className='object-contain w-6 lg:w-10'
                        />
                     </div>
                     <div className='mx-2'>
                        <img
                           src={twitter}
                           className='object-contain w-6 lg:w-10'
                        />
                     </div>
                  </div>
               </div>
               <div className='my-5 md:my-0 text-sm md:text-md col-span-12 md:col-span-6 lg:col-span-7 text-justify'>
                  <h1 className='text-md md:text-xl font-bold mb-2 opacity-80 text-gray-600'>
                     The Hand Market E-commerce platform corporation
                  </h1>
                  <div className='flex my-2 text-gray-700'>
                     <b>Head Quarter: </b>
                     <p className='ml-2'>
                        193 Trưng Nữ Vương, Hòa Thuận Đông Hải Châu, Đà Nẵng
                     </p>
                  </div>
                  <div className='flex my-2 text-gray-700'>
                     <b>Working time: </b> <p className='ml-2'>8:00 - 21:00</p>
                  </div>
                  <div className='block my-5 md:flex md:my-2 text-[#374b73] font-semibold'>
                     <div className='flex items-center mr-5 my-2'>
                        <PhoneIcon className='w-5 h-5 mr-2' />
                        <span>0907 874 726</span>
                     </div>
                     <div className='flex items-center'>
                        <EnvelopeIcon className='w-5 h-5 mr-2 my-2' />
                        <a href='mailto:handmarket@gmail.com'>
                           thehandmarket@gmail.com
                        </a>
                     </div>
                  </div>
                  <div className='block items-center mt-5'>
                     <h1 className='text-xl font-bold mb-2 opacity-80 text-gray-600'>
                        Certified by
                     </h1>
                     <img
                        src={confirmImg}
                        className='w-42'
                     />
                  </div>
               </div>
               <div className='col-span-12 md:col-span-6 lg:col-span-5'>
                  <iframe
                     className='w-full h-[300px] border-none'
                     src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.221636277007!2d108.21697847489428!3d16.053984539846358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c8b41dc80d%3A0xdf3c20315132b528!2zMTkzIFRyxrBuZyBO4buvIFbGsMahbmcsIEjDsmEgVGh14bqtbiDEkMO0bmcsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1694700220095!5m2!1svi!2s'
                     allowFullScreen
                     loading='lazy'
                     referrerPolicy='no-referrer-when-downgrade'
                  />
               </div>
            </div>
            <div className='w-full text-center mt-5 text-[#374b73] leading-3 pb-3'>
               <span>© HandMarket. Market in your hand</span>
            </div>
         </div>
      </div>
   );
};

export default Footer;
