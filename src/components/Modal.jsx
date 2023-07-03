import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from 'flowbite-react';

const Modal = ({
   isOpen,
   closeModal,
   title,
   message = '',
   actionContent = '',
   actionImplement,
   type = '',
}) => {
   return (
      <Transition
         appear
         show={isOpen}
         as={Fragment}
      >
         <Dialog
            as='div'
            className='relative z-[9999]'
            onClose={closeModal}
         >
            <Transition.Child
               as={Fragment}
               enter='ease-out duration-300'
               enterFrom='opacity-0'
               enterTo='opacity-100'
               leave='ease-in duration-200'
               leaveFrom='opacity-100'
               leaveTo='opacity-0'
            >
               <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
               <div className='flex min-h-full items-center justify-center p-4 text-center'>
                  <Transition.Child
                     as={Fragment}
                     enter='ease-out duration-300'
                     enterFrom='opacity-0 scale-95'
                     enterTo='opacity-100 scale-100'
                     leave='ease-in duration-200'
                     leaveFrom='opacity-100 scale-100'
                     leaveTo='opacity-0 scale-95'
                  >
                     <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all'>
                        <Dialog.Title
                           as='h3'
                           className='text-2xl text-[#374b73] font-semibold leading-6 mb-5'
                        >
                           Do you want to {title} ?
                        </Dialog.Title>
                        <div className='mt-2'>
                           <p className='text-md text-gray-500'>{message}</p>
                        </div>

                        <div className='mt-4 flex justify-between'>
                           <Button
                              className='ring-0 font-bold hover:ring-2 hover:ring-gray-400 bg-gray-400 hover:bg-black hover:text-gray-900'
                              onClick={closeModal}
                              color='light'
                           >
                              Cancel
                           </Button>
                           <button
                              type='button'
                              onClick={actionImplement}
                              className='text-red-500 hover:text-white border border-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                           >
                              <Dialog.Description className='font-bold'>
                                 {actionContent}
                              </Dialog.Description>
                           </button>
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   );
};

export default Modal;
