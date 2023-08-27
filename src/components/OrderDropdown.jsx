import { Fragment } from 'react';
import { Cog8ToothIcon, TrashIcon, EyeIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import {
   deleteProductAction,
   getProductDetailAction,
} from '../redux/action/product-action';

export default function OrderDropdown({ item, navigate, dispatch }) {
   const [open, setOpen] = useState(false);
   return (
      <>
         <div>
            <button
               onClick={() => {
                  setOpen(!open);
               }}
               className='relative text-[#5a6e8c] outline-none focus:outline-none focus:ring-0 rounded-lg p-2 lg:px-3 lg:py-2.5 border-2 border-gray-300 shadow-sm shadow-zinc-300 hover:bg-gray-100 hover:text-[#374b73] transition-all duration-75'
               type='button'
            >
               <Cog8ToothIcon className='h-5 w-5' />

               {open ? (
                  <div className='z-10 right-0 bg-white top-12 absolute divide-y w-44 divide-gray-100 rounded-lg shadow-md shadow-gray-200 '>
                     <ul
                        className='py-2 text-sm text-gray-700'
                        aria-labelledby='dropdownDefaultButton'
                     >
                        <div
                           onClick={() => {
                              navigate(
                                 `/admin/order-management/order-detail/${item?.id}`
                              );
                           }}
                           className='flex items-center hover:font-bold hover:bg-gray-100 px-4 py-3 mx-auto'
                        >
                           <div className='flex mr-2 text-[#374b73]'>
                              <EyeIcon className='h-5 w-5' />
                           </div>
                           <span className='font-semibold text-[#374b73]'>
                              View detail
                           </span>
                        </div>
                        <div className='flex items-center hover:font-bold hover:bg-gray-100 px-4 py-3 mx-auto'>
                           <div className='flex mr-2 text-[#374b73]'>
                              <TrashIcon className='h-5 w-5' />
                           </div>
                           <span className='font-semibold text-[#374b73]'>
                              Delete
                           </span>
                        </div>
                     </ul>
                  </div>
               ) : (
                  <></>
               )}
            </button>
         </div>
      </>
   );
}
