'use client';
import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { useOutletContext } from 'react-router-dom';
import {
   deleteUserAction,
   getListDeletedUserAction,
   getListUserAction,
   restoreUserAction,
} from '../../../redux/action/user-action';
import { useSelector } from 'react-redux';
import alterAvatar from '../../../assets/img/alter-ava.png';
import Pagination from '../../../components/Pagination';
import toast from 'react-hot-toast';
import restore from '../../../assets/svg/restore.svg';
import { TrashIcon } from '@heroicons/react/24/outline';
import {
   Tooltip,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalCloseButton,
   Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
const DeletedAccount = () => {
   const { dispatch, navigate } = useOutletContext();
   const [modalType, setModalType] = useState('');
   const [user, setUser] = useState(null);
   const listDeletedUser = useSelector(
      (state) => state.userReducer.list_deleted_user
   );
   const { isOpen, onOpen, onClose } = useDisclosure();
   useEffect(() => {
      dispatch(getListDeletedUserAction(1, 8));
   }, []);

   const renderTableUser = () => {
      return listDeletedUser?.data?.map((item) => {
         return (
            <Table.Row
               key={item.id}
               className='bg-white'
            >
               <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>
                  <span
                     onClick={() => {
                        toast.custom(
                           (t) => (
                              <div
                                 className={`${
                                    t.visible
                                       ? 'animate-enter'
                                       : 'animate-leave'
                                 } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                              >
                                 <div className='flex-1 w-0 p-4 text-center text-yellow-600 text-md'>
                                    This account has been deleted, please
                                    restore to view the account's detail
                                 </div>
                              </div>
                           ),
                           { duration: 1000 }
                        );
                     }}
                     className='text-md text-[#374b73] hover:text-gray-400 cursor-pointer'
                  >
                     {item.first_name}&nbsp;{item.last_name}
                  </span>
               </Table.Cell>
               <Table.Cell>{item.email}</Table.Cell>
               <Table.Cell>
                  <img
                     src={item.avatar !== null ? item.avatar : alterAvatar}
                     className='w-7 h-7 lg:w-10 lg:h-10 object-cover rounded-full'
                  />
               </Table.Cell>
               <Table.Cell>
                  <span className='text-left text-red-500'>Deleted</span>
               </Table.Cell>
               <Table.Cell className='flex items-center'>
                  <button
                     onClick={() => {
                        onOpen();
                        setModalType('restore');
                        setUser(item);
                     }}
                     className='p-2 bg-[#1aff8d] rounded-lg hover:bg-green-300'
                  >
                     <Tooltip
                        placement='right-end'
                        hasArrow
                        label='Restore account'
                     >
                        <img
                           src={restore}
                           className='w-5 h-5'
                        />
                     </Tooltip>
                  </button>
                  <button
                     onClick={() => {
                        onOpen();
                        setModalType('delete');
                        setUser(item);
                     }}
                     className='p-2 bg-red-500 rounded-lg hover:bg-red-400 ml-2'
                  >
                     <Tooltip
                        placement='right-end'
                        hasArrow
                        label='Permanently delete'
                     >
                        <TrashIcon className='h-5 w-5 text-white' />
                     </Tooltip>
                  </button>
               </Table.Cell>
            </Table.Row>
         );
      });
   };
   const renderModal = () => {
      return (
         <>
            <Modal
               size='lg'
               isCentered
               isOpen={isOpen}
               onClose={onClose}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>
                     <span className='text-xl'>
                        {modalType === 'restore' ? (
                           <>{`Do you want to restore ${user?.email}?`}</>
                        ) : (
                           <div className='flex items-center'>
                              <p className=' text-red-500'>
                                 {`This action will permanently delete the account ${user?.email}`}
                              </p>
                           </div>
                        )}
                     </span>
                  </ModalHeader>
                  <ModalCloseButton
                     onClick={() => {
                        setModalType('');
                     }}
                  />
                  <ModalFooter>
                     <Button
                        ariant='ghost'
                        colorScheme='gray'
                        mr={3}
                        onClick={onClose}
                     >
                        <span className='text-[#374b73]'>Close</span>
                     </Button>
                     {modalType === 'restore' ? (
                        <Button
                           onClick={() => {
                              dispatch(restoreUserAction(user?.id));
                              onClose();
                           }}
                           colorScheme='whatsapp'
                        >
                           Restore
                        </Button>
                     ) : (
                        <Button
                           onClick={() => {
                              dispatch(
                                 deleteUserAction(user?.id, 'permanently')
                              );
                              onClose();
                           }}
                           colorScheme='red'
                        >
                           Delete Anyway
                        </Button>
                     )}
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      );
   };
   return (
      <div className='w-full mx-auto mt-2 px-2'>
         <div className='relative overflow-x-auto sm:rounded-lg p-5 h-fit  min-h-[100vh]'>
            <Table hoverable>
               <Table.Head>
                  <Table.HeadCell className='text-[#374b73]'>
                     Name
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Email
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Avatar
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Status
                  </Table.HeadCell>
                  <Table.HeadCell className='text-[#374b73]'>
                     Action
                  </Table.HeadCell>
               </Table.Head>
               <Table.Body className='divide-y'>{renderTableUser()}</Table.Body>
            </Table>
            <div className='w-full flex justify-end mt-5'>
               {listDeletedUser.data.length > 0 ? (
                  <Pagination
                     data={listDeletedUser}
                     getPrevious={() => {
                        dispatch(
                           getListDeletedUserAction(
                              listDeletedUser?.previousPage,
                              listDeletedUser?.pageSize
                           )
                        );
                        setCurrentPageState(listDeletedUser?.previousPage);
                     }}
                     getNext={() => {
                        dispatch(
                           getListDeletedUserAction(
                              listDeletedUser?.nextPage,
                              listDeletedUser?.pageSize
                           )
                        );
                        setCurrentPageState(listDeletedUser?.nextPage);
                     }}
                  />
               ) : (
                  <></>
               )}
            </div>
            {renderModal()}
         </div>
      </div>
   );
};

export default DeletedAccount;
