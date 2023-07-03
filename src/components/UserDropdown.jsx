import { Fragment } from 'react';
import {
   Cog8ToothIcon,
   LockClosedIcon,
   LockOpenIcon,
   TrashIcon,
   EyeIcon,
} from '@heroicons/react/20/solid';
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
   blockUserAction,
   deleteUserAction,
   getUserDetailAction,
} from '../redux/action/user-action';

export default function UserDropdown({ item, navigate, dispatch }) {
   const [open, setOpen] = useState(false);
   const {
      isOpen: isOpenDelete,
      onOpen: onOpenDelete,
      onClose: onCloseDelete,
   } = useDisclosure();
   const {
      isOpen: isOpenBlock,
      onOpen: onOpenBlock,
      onClose: onCloseBlock,
   } = useDisclosure();

   const renderModalDelete = () => {
      return (
         <>
            <Modal
               size='lg'
               isCentered
               isOpen={isOpenDelete}
               onClose={onCloseDelete}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>
                     <span className='text-xl'>
                        {`Do you want to delete ${item?.email} ?`}
                     </span>
                     <p className='text-sm mt-5 font-normal text-gray-500 italic'>
                        The deleted account will be moved to the deleted list,
                        and can be restored
                     </p>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody></ModalBody>
                  <ModalFooter>
                     <Button
                        ariant='ghost'
                        colorScheme='gray'
                        mr={3}
                        onClick={onCloseDelete}
                     >
                        <span className='text-[#374b73]'>Close</span>
                     </Button>
                     <Button
                        onClick={() => {
                           dispatch(deleteUserAction(item?.id));
                        }}
                        colorScheme='red'
                     >
                        Delete Anyway
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      );
   };
   const renderModalBlock = () => {
      return (
         <>
            <Modal
               size='lg'
               isCentered
               isOpen={isOpenBlock}
               onClose={onCloseBlock}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>
                     <span className='text-xl'>
                        {`Do you want to ${
                           item.is_banned ? 'unblock' : 'block'
                        } ${item?.email} ?`}
                     </span>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalFooter>
                     <Button
                        ariant='ghost'
                        colorScheme='gray'
                        mr={3}
                        onClick={onCloseBlock}
                     >
                        <span className='text-[#374b73]'>Close</span>
                     </Button>
                     {item?.is_banned ? (
                        <Button
                           onClick={() => {
                              dispatch(
                                 blockUserAction(
                                    item?.id,
                                    'Unblocked user successfully'
                                 )
                              );
                              onCloseBlock();
                           }}
                           colorScheme='whatsapp'
                        >
                           Unblock
                        </Button>
                     ) : (
                        <Button
                           onClick={() => {
                              dispatch(
                                 blockUserAction(
                                    item?.id,
                                    'Blocked user successfully'
                                 )
                              );
                              onCloseBlock();
                           }}
                           colorScheme='red'
                        >
                           Block User
                        </Button>
                     )}
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      );
   };
   return (
      <>
         <div>
            <button
               onClick={() => {
                  setOpen(!open);
               }}
               className='relative bg-[#374b73] hover:bg-[#ffb4b4] hover:text-white  text-[white] focus:ring-2 focus:outline-none focus:ring-gray-300 rounded-lg text-sm p-2 lg:px-4 lg:py-2.5 text-center items-center shadow-sm shadow-zinc-200'
               type='button'
            >
               <Cog8ToothIcon className='h-5 w-5' />

               {open ? (
                  <div className='z-10 right-0 bg-white top-10 absolute divide-y w-44 divide-gray-100 rounded-lg shadow-md shadow-gray-200 '>
                     <ul
                        className='py-2 text-sm text-gray-700'
                        aria-labelledby='dropdownDefaultButton'
                     >
                        <div
                           onClick={() => {
                              dispatch(getUserDetailAction(item.id));
                              navigate(
                                 `/admin/account-management/view-detail/${item?.id}`
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
                        <div
                           onClick={onOpenBlock}
                           className='flex items-center hover:font-bold hover:bg-gray-100 px-4 py-3 mx-auto'
                        >
                           <div className='flex mr-2 text-[#374b73]'>
                              {item.is_banned ? (
                                 <LockOpenIcon className='h-5 w-5' />
                              ) : (
                                 <LockClosedIcon className='h-5 w-5' />
                              )}
                           </div>
                           <span className='font-semibold text-[#374b73]'>
                              {item.is_banned ? 'Unblock' : 'Block'}
                           </span>
                        </div>
                        <div
                           onClick={onOpenDelete}
                           className='flex items-center hover:font-bold hover:bg-gray-100 px-4 py-3 mx-auto'
                        >
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
            {renderModalBlock()}
            {renderModalDelete()}
         </div>
      </>
   );
}
