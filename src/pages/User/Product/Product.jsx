import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
   getListProductForUserAction,
   clearListProductForUserAction,
   getListProductByTypeAction,
   arrangeProductByNameAction,
   searchProductByNameAction,
   arrangeProductByPriceAction,
   arrangeProductByViewAction,
} from '../../../redux/action/product-action';
import ProductCard from '../../../components/ProductCard';
import { ProductType } from '../../../enums/ProductType';
import {
   clearProductTypeAction,
   getListCategoryAction,
   getListProductTypeAction,
} from '../../../redux/action/category-action';
import Select from 'react-select';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { getListProductByCategoryAction } from '../../../redux/action/product-action';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import useDebounce from '../../../hooks/useDebounce';
import {
   ArrowUpIcon,
   ArrowDownIcon,
   FunnelIcon,
   BarsArrowDownIcon,
} from '@heroicons/react/24/solid';
import { Helmet } from 'react-helmet';
const Product = () => {
   const { dispatch, navigate } = useOutletContext();
   const [filterType, setFilterType] = useState(null);
   const [chooseProductType, setChooseProductType] = useState(false);
   const [showTip, setShowTip] = useState(false);
   const [chosenCategory, setChosenCategory] = useState([]);
   const [orderBy, setOrderBy] = useState();
   const [chosenProductType, setChosenProductType] = useState([]);
   const [productSearch, setProductSearch] = useState('');
   const debouncedProductSearch = useDebounce(productSearch, 300);
   const productType = useRef(null);
   const listProduct = useSelector(
      (state) => state.productReducer.list_product_for_user
   );
   const listCategory = useSelector(
      (state) => state.categoryReducer.list_category
   );
   const listProductType = useSelector(
      (state) => state.categoryReducer.product_type
   );
   const nameFilterOptions = [
      {
         label: 'No filter',
         value: null,
      },
      {
         label: 'A - Z',
         value: 'asc',
      },
      {
         label: 'Z - A',
         value: 'desc',
      },
   ];
   const priceFilterOptions = [
      {
         label: 'No filter',
         value: null,
      },
      {
         label: (
            <div className='flex items-center'>
               High to low <ArrowDownIcon className='w-5 h-5 ml-2' />
            </div>
         ),
         value: 'desc',
      },
      {
         label: (
            <div className='flex items-center'>
               Low to high <ArrowUpIcon className='w-5 h-5 ml-2' />
            </div>
         ),
         value: 'asc',
      },
   ];
   const viewFilterOptions = [
      {
         label: 'No filter',
         value: null,
      },
      {
         label: (
            <div className='flex items-center'>
               Most view <ArrowDownIcon className='w-5 h-5 ml-2' />
            </div>
         ),
         value: 'desc',
      },
   ];
   useEffect(() => {
      dispatch(clearListProductForUserAction());
      dispatch(getListProductForUserAction());
      dispatch(getListCategoryAction());
      return () => {
         dispatch(clearProductTypeAction());
         dispatch(clearListProductForUserAction());
      };
   }, []);
   useEffect(() => {
      if (productSearch !== '') {
         dispatch(searchProductByNameAction(productSearch.toLowerCase()));
         setFilterType('searchProduct');
         dispatch(clearListProductForUserAction());
      } else {
         dispatch(clearListProductForUserAction());
         dispatch(getListProductForUserAction());
      }
   }, [debouncedProductSearch]);
   const handleOnSearchProduct = (event) => {
      setProductSearch(event.target.value);
   };
   const convertCategoryToFilter = () => {
      const listFilter = [
         {
            value: null,
            label: 'No filter',
         },
      ];
      listCategory?.map((item) => {
         const element = {
            value: item.id,
            label: item.name,
         };
         listFilter.push(element);
      });
      return listFilter.sort();
   };
   const convertProductTypeToFilter = () => {
      const listFilter = [];
      listProductType?.types_list?.map((item) => {
         const element = {
            value: item,
            label: item,
         };
         listFilter.push(element);
      });
      return listFilter.sort();
   };

   return (
      <>
         <Helmet>
            <meta charSet='utf-8' />
            <title>Hand Market | Product</title>
         </Helmet>
         <div className='lg:flex justify-between w-full md:w-11/12 mx-auto items-stretch'>
            <div className='w-10/12 mx-auto lg:w-1/4 mt-10 mr-5'>
               <div className='bg-white w-full shadow shadow-gray-300 rounded-sm px-3 py-4 text-[#374b73]'>
                  <div className='flex items-center'>
                     <FunnelIcon className='w-6 h-6' />
                     <h1 className='text-lg font-semibold ml-1'>Filter</h1>
                  </div>
                  <div className='my-5'>
                     <h1 className='text-md font-semibold'>Category:</h1>
                     <Select
                        key='select1'
                        defaultValue={convertCategoryToFilter()[0]}
                        className='py-2'
                        placeholder={false}
                        isSearchable={false}
                        options={convertCategoryToFilter()}
                        onChange={(e) => {
                           dispatch(clearListProductForUserAction());
                           if (e.value !== null) {
                              dispatch(getListProductByCategoryAction(e.value));
                              dispatch(getListProductTypeAction(e.value));
                              setChooseProductType(true);
                              setChosenCategory(e.value);
                              setFilterType('category');
                           } else {
                              dispatch(getListProductForUserAction());
                              setChooseProductType(false);
                              setFilterType(null);
                           }
                        }}
                     />
                  </div>
                  <div className='my-5'>
                     <div className='w-full flex items-center relative'>
                        <h1 className='text-md font-semibold'>Type:</h1>
                        <QuestionMarkCircleIcon
                           onMouseOver={() => {
                              setShowTip(true);
                           }}
                           onMouseLeave={() => {
                              setShowTip(false);
                           }}
                           className='w-5 h-5 ml-1 cursor-pointer'
                        />
                        {showTip ? (
                           <div className='bg-white w-fit absolute top-5 right-[-5px] shadow-md rounded-md shadow-gray-300 z-20'>
                              <p className='px-3 py-2 font-semibold text-yellow-400'>
                                 Please choose product category first
                              </p>
                           </div>
                        ) : (
                           ''
                        )}
                     </div>
                     <Select
                        key='select2'
                        className='py-2'
                        placeholder={false}
                        isSearchable={false}
                        isMulti={true}
                        isDisabled={!chooseProductType}
                        options={convertProductTypeToFilter()}
                        closeMenuOnSelect={false}
                        ref={productType}
                        isClearable={true}
                        closeMenuOnScroll
                        onChange={(event, removedEvent) => {
                           dispatch(clearListProductForUserAction());
                           if (event.length > 0) {
                              setChosenProductType(event);
                              setFilterType('productType');
                              dispatch(
                                 getListProductByTypeAction(
                                    chosenCategory,
                                    event
                                 )
                              );
                           } else if (
                              (event.length == 0 &&
                                 removedEvent.removedValue) ||
                              (event.length == 0 && removedEvent.removedValues)
                           ) {
                              setFilterType('category');
                              setChosenProductType(event);
                              dispatch(
                                 getListProductByCategoryAction(chosenCategory)
                              );
                           }
                        }}
                     />
                  </div>
               </div>
               <div className='bg-white w-full shadow shadow-gray-300 rounded-sm px-3 py-4 text-[#374b73] mt-5'>
                  <div className='flex items-center'>
                     <BarsArrowDownIcon className='w-6 h-6' />
                     <h1 className='text-lg font-semibold ml-1'>Sort</h1>
                  </div>
                  <div className='my-5'>
                     <div className='w-full flex items-center relative'>
                        <h1 className='text-md font-semibold'>By Name:</h1>
                     </div>
                     <Select
                        key='select2'
                        className='py-2'
                        placeholder={false}
                        isSearchable={false}
                        options={nameFilterOptions}
                        closeMenuOnSelect={true}
                        defaultValue={nameFilterOptions[0]}
                        onChange={(event) => {
                           if (event.value == null) {
                              dispatch(clearListProductForUserAction());
                              if (chosenCategory !== '') {
                                 if (chosenProductType.length > 0) {
                                    dispatch(
                                       getListProductByTypeAction(
                                          chosenCategory,
                                          chosenProductType
                                       )
                                    );
                                 } else {
                                    dispatch(
                                       getListProductByCategoryAction(
                                          chosenCategory
                                       )
                                    );
                                 }
                              } else {
                                 dispatch(getListProductForUserAction());
                              }
                           } else {
                              dispatch(clearListProductForUserAction());
                              setFilterType('arrangeName');
                              setOrderBy(event.value);
                              dispatch(
                                 arrangeProductByNameAction(
                                    chosenCategory,
                                    chosenProductType,
                                    event.value
                                 )
                              );
                           }
                        }}
                     />
                  </div>
                  <div className='my-5'>
                     <div className='w-full flex items-center relative'>
                        <h1 className='text-md font-semibold'>By Price:</h1>
                     </div>
                     <Select
                        key='select2'
                        className='py-2'
                        placeholder={false}
                        isSearchable={false}
                        options={priceFilterOptions}
                        closeMenuOnSelect={true}
                        defaultValue={priceFilterOptions[0]}
                        onChange={(event) => {
                           if (event.value == null) {
                              dispatch(clearListProductForUserAction());
                              if (chosenCategory !== '') {
                                 if (chosenProductType.length > 0) {
                                    dispatch(
                                       getListProductByTypeAction(
                                          chosenCategory,
                                          chosenProductType
                                       )
                                    );
                                 } else {
                                    dispatch(
                                       getListProductByCategoryAction(
                                          chosenCategory
                                       )
                                    );
                                 }
                              } else {
                                 dispatch(getListProductForUserAction());
                              }
                           } else {
                              dispatch(clearListProductForUserAction());
                              setFilterType('arrangePrice');
                              setOrderBy(event.value);
                              dispatch(
                                 arrangeProductByPriceAction(
                                    chosenCategory,
                                    chosenProductType,
                                    event.value
                                 )
                              );
                           }
                        }}
                     />
                  </div>
                  <div className='my-5'>
                     <div className='w-full flex items-center relative'>
                        <h1 className='text-md font-semibold'>By Views:</h1>
                     </div>
                     <Select
                        key='select2'
                        className='py-2'
                        placeholder={false}
                        isSearchable={false}
                        options={viewFilterOptions}
                        closeMenuOnSelect={true}
                        defaultValue={viewFilterOptions[0]}
                        onChange={(event) => {
                           if (event.value == null) {
                              dispatch(clearListProductForUserAction());
                              if (chosenCategory !== '') {
                                 if (chosenProductType.length > 0) {
                                    dispatch(
                                       getListProductByTypeAction(
                                          chosenCategory,
                                          chosenProductType
                                       )
                                    );
                                 } else {
                                    dispatch(
                                       getListProductByCategoryAction(
                                          chosenCategory
                                       )
                                    );
                                 }
                              } else {
                                 dispatch(getListProductForUserAction());
                              }
                           } else {
                              dispatch(clearListProductForUserAction());
                              setFilterType('arrangeView');
                              setOrderBy(event.value);
                              dispatch(
                                 arrangeProductByViewAction(
                                    chosenCategory,
                                    chosenProductType,
                                    event.value
                                 )
                              );
                           }
                        }}
                     />
                  </div>
               </div>
            </div>
            <div className='w-10/12 mx-auto my-10 lg:w-full'>
               <div className='flex justify-between items-center w-10/12 mx-auto'>
                  <h1 className='text-md md:text-lg'>
                     <span className='text-red-500 font-bold text-xl'>
                        {listProduct?.totalRecords}
                     </span>{' '}
                     results found
                  </h1>
                  <label
                     htmlFor='table-search'
                     className='sr-only'
                  >
                     Search
                  </label>
                  <div className='relative'>
                     <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                        <MagnifyingGlassIcon className='w-5 h-5' />
                     </div>
                     <input
                        onChange={handleOnSearchProduct}
                        type='text'
                        id='table-search'
                        className='block p-2 pl-10 text-md text-gray-900 border border-gray-300 rounded-md w-44 lg:w-96 bg-gray-50 focus:ring-[#ffb4b4] focus:border-[#ffb4b4]'
                        placeholder='Search product by name'
                     />
                  </div>
               </div>
               {listProduct?.data?.length > 0 ? (
                  <InfiniteScroll
                     scrollThreshold='200px'
                     dataLength={listProduct?.data?.length}
                     next={() => {
                        switch (filterType) {
                           case null:
                              dispatch(
                                 getListProductForUserAction(
                                    listProduct?.currentPage + 1,
                                    listProduct?.pageSize
                                 )
                              );
                              break;
                           case 'arrangeName':
                              dispatch(
                                 arrangeProductByNameAction(
                                    chosenCategory,
                                    chosenProductType,
                                    orderBy,
                                    listProduct?.currentPage + 1,
                                    listProduct?.pageSize
                                 )
                              );
                              break;
                           case 'arrangePrice':
                              dispatch(
                                 arrangeProductByPriceAction(
                                    chosenCategory,
                                    chosenProductType,
                                    orderBy,
                                    listProduct?.currentPage + 1,
                                    listProduct?.pageSize
                                 )
                              );
                              break;
                           case 'category':
                              dispatch(
                                 getListProductByCategoryAction(
                                    chosenCategory,
                                    listProduct?.currentPage + 1,
                                    listProduct?.pageSize
                                 )
                              );
                              break;
                           case 'productType':
                              dispatch(
                                 getListProductByTypeAction(
                                    chosenCategory,
                                    chosenProductType,
                                    listProduct?.currentPage + 1,
                                    listProduct?.pageSize
                                 )
                              );
                              break;
                           case 'arrangeView':
                              dispatch(
                                 arrangeProductByViewAction(
                                    chosenCategory,
                                    chosenProductType,
                                    orderBy,
                                    listProduct?.currentPage + 1,
                                    listProduct?.pageSize
                                 )
                              );
                              break;
                           case 'searchProduct':
                              dispatch(
                                 searchProductByNameAction(
                                    productSearch.toLowerCase(),
                                    listProduct?.currentPage + 1,
                                    listProduct?.pageSize
                                 )
                              );
                              break;
                           default:
                              break;
                        }
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
               ) : (
                  <div className='w-full mt-10 flex flex-col justify-center text-center'>
                     <h1 className='text-[#374b73] font-semibold text-2xl'>
                        No product
                     </h1>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default Product;
