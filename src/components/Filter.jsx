import React, { useState } from 'react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/solid';
const Filter = ({ listFilter, initialValue }) => {
   const [filterValue, setFilterValue] = useState('No filter');
   const [openFilter, setOpenFilter] = useState(false);
   return (
      <div className='flex items-center justify-between pb-4'>
         <div>
            <button
               onClick={() => {
                  setOpenFilter(!openFilter);
               }}
               className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5'
               type='button'
            >
               <FunnelIcon className='w-4 h-4 mr-2' />
               {filterValue}
               <ChevronDownIcon className='w-4 h-4 ml-2' />
            </button>

            {openFilter ? (
               <div
                  id='dropdownRadio'
                  className='z-10 absolute top-16 left-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow '
               >
                  <ul
                     className='p-3 space-y-1 text-sm text-gray-700 '
                     aria-labelledby='dropdownRadioButton'
                  >
                     <li>
                        <div className='flex items-center p-2 rounded hover:bg-gray-100 '>
                           <input
                              id={`filter-radio-reset`}
                              type='radio'
                              name='filter-radio'
                              onChange={() => {
                                 setFilterValue('No filter');
                                 setOpenFilter(!openFilter);
                              }}
                              className={`w-4 h-4 text-blue-600  border-gray-300 focus:ring-blue-500 ring-1 ring-gray-200 focus:ring-2
                              focus:bg-blue-500 cursor-pointer
                              ${
                                 filterValue == 'No filter'
                                    ? 'bg-blue-500'
                                    : 'bg-gray-100'
                              }`}
                           />
                           <label
                              htmlFor={`filter-radio-reset`}
                              className='w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer'
                           >
                              No Filter
                           </label>
                        </div>
                     </li>
                     {listFilter.map((item) => {
                        return (
                           <li key={item.value}>
                              <div className='flex items-center p-2 rounded hover:bg-gray-100 '>
                                 <input
                                    id={`filter-radio-${item.label}`}
                                    type='radio'
                                    value={item.value}
                                    name='filter-radio'
                                    onChange={(e) => {
                                       const { value } = e.target;
                                       console.log(value);
                                       setFilterValue(item.label);
                                       setOpenFilter(!openFilter);
                                    }}
                                    className={`w-4 h-4 text-blue-600  border-gray-300 focus:ring-blue-500 ring-1 ring-gray-200 focus:ring-2
                              focus:bg-blue-500 cursor-pointer
                              ${
                                 filterValue === item.value
                                    ? 'bg-blue-500'
                                    : 'bg-gray-100'
                              }`}
                                 />
                                 <label
                                    htmlFor={`filter-radio-${item.label}`}
                                    className='w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer'
                                 >
                                    {item.label}
                                 </label>
                              </div>
                           </li>
                        );
                     })}
                  </ul>
               </div>
            ) : (
               <></>
            )}
         </div>
      </div>
   );
};

export default Filter;
