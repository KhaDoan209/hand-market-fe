import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
   getListProductForUserAction,
   clearListProductForUserAction,
} from '../../../redux/action/product-action';
import ProductCard from '../../../components/ProductCard';
import { ProductType } from '../../../enums/ProductType';
import { useLocation } from 'react-router-dom';
const Product = () => {
   const listProduct = useSelector(
      (state) => state.productReducer.list_product_for_user
   );

   const { dispatch, navigate } = useOutletContext();
   useEffect(() => {
      dispatch(getListProductForUserAction());
      return () => {
         dispatch(clearListProductForUserAction());
      };
   }, []);
   return (
      <div className='lg:flex justify-between w-full md:w-11/12 lg:w-10/12 mx-auto'>
         <div className='w-1/4'>dasdas</div>
         <InfiniteScroll
            scrollThreshold='200px'
            dataLength={listProduct?.data?.length}
            next={() => {
               dispatch(
                  getListProductForUserAction(
                     listProduct?.currentPage + 1,
                     listProduct?.pageSize
                  )
               );
            }}
            hasMore={
               listProduct?.currentPage === listProduct?.lastPages
                  ? false
                  : true
            }
            loader={<h4>Loading...</h4>}
            endMessage={
               <p style={{ textAlign: 'center' }}>
                  <b className='text-[#374b73] font-semibold text-2xl my-2'>
                     No more product
                  </b>
               </p>
            }
         >
            <div className='grid grid-cols-12 gap-5 py-10'>
               {listProduct.data &&
                  listProduct.data?.map((item) => {
                     return (
                        <div
                           key={Math.random()}
                           className='col-span-12 md:col-span-6 lg:col-span-3'
                        >
                           <ProductCard
                              item={item}
                              type={ProductType.purchase}
                              letter_length={15}
                           />
                        </div>
                     );
                  })}
            </div>
         </InfiniteScroll>
      </div>
   );
};

export default Product;
