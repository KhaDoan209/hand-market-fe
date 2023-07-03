import React from 'react';

const Pagination = ({ data, getPrevious, getNext }) => {
   return (
      <ul className='inline-flex items-center mt-5'>
         <li>
            {data?.currentPage == data?.previousPage ? (
               <></>
            ) : (
               <a
                  onClick={getPrevious}
                  className='px-3 py-2 ml-0 text-[#374b73] font-semibold bg-white border border-gray-300 rounded-l-md  hover:text-white cursor-pointer hover:bg-[#374b73] transition-all duration-300'
               >
                  Previous
               </a>
            )}
         </li>
         {data?.currentPage == data?.previousPage ? (
            <></>
         ) : (
            <li>
               <a
                  href='#'
                  className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
               >
                  {data?.previousPage}
               </a>
            </li>
         )}
         <li>
            <a className='px-3 py-2 text-[#374b73] border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 font-bold'>
               {data?.currentPage}
            </a>
         </li>
         {data?.currentPage == data?.totalPages ? (
            <></>
         ) : (
            <li>
               <a className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '>
                  {data?.nextPage}
               </a>
            </li>
         )}
         {data?.currentPage == data?.totalPages ? (
            <></>
         ) : (
            <>
               <li>
                  <a
                     onClick={getNext}
                     className='px-3 py-2 leading-tight text-[#374b73] font-semibold bg-white border border-gray-300 rounded-r-md hover:bg-[#374b73] hover:text-white transition-all duration-300 cursor-pointer'
                  >
                     Next
                  </a>
               </li>
            </>
         )}
      </ul>
   );
};

export default Pagination;
