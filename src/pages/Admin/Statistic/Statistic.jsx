import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { useOutletContext } from 'react-router-dom';
import { getListOrderAction } from '../../../redux/action/order-action';
import { countProductByCategoryService } from '../../../services/category-service';
import {
   countOrdersDoneAndCanceledByDate,
   countOrderTypePercent,
   generateRandomColors,
   countUserHasMostOrder,
   convertToCurrency,
   calculateTotalProfitByDate,
} from '../../../utils/utils-functions';
import first_place from '../../../assets/img/1st_medal.png';
import second_place from '../../../assets/img/2nd_medal.png';
import third_place from '../../../assets/img/3rd_medal.png';
import { getListProductByPurchaseService } from '../../../services/product-service';
const Statistic = () => {
   const list_order = useSelector((state) => state.orderReducer.list_order);
   const listUser = countUserHasMostOrder(list_order?.data);
   const listProfit = calculateTotalProfitByDate(list_order?.data);
   const [productByCategory, setProductByCategory] = useState([]);
   const [productByPurchase, setProductByPurchase] = useState([]);
   const { dispatch, navigate } = useOutletContext();
   const orderCount = countOrdersDoneAndCanceledByDate(list_order?.data);
   const lineChartLabels = orderCount?.map((item) => item.order_date);
   const doneCounts = orderCount?.map((item) => item.order_done_count);
   const cancelCounts = orderCount?.map((item) => item.order_cancel_count);
   const profitDates = listProfit.map((entry) => entry.date);
   const profits = listProfit.map((entry) => entry.profit);
   const labels = productByPurchase?.data
      ?.slice(0, 5)
      .map((product) => product.name);
   const purchases = productByPurchase?.data
      ?.slice(0, 5)
      .map((product) => product.purchase);
   const getListProductByCategory = async () => {
      try {
         const response = await countProductByCategoryService();
         setProductByCategory(response.data);
      } catch (error) {
         console.log(error);
      }
   };
   const getListProductByPurchase = async () => {
      try {
         const response = await getListProductByPurchaseService(
            undefined,
            undefined
         );
         setProductByPurchase(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   const barChartData = {
      labels: productByCategory.map((category) => category.name),
      datasets: [
         {
            label: '',
            data: productByCategory.map((category) => category.productCount),
            backgroundColor: generateRandomColors(productByCategory.length),
            borderWidth: 1,
         },
      ],
   };
   useEffect(() => {
      dispatch(getListOrderAction());
   }, []);

   useEffect(() => {
      const fetchAPI = setInterval(() => {
         dispatch(getListOrderAction());
      }, 30000);
      getListProductByPurchase();
      getListProductByCategory();
      return () => clearInterval(fetchAPI);
   }, []);

   const lineChartData = {
      labels: lineChartLabels,
      datasets: [
         {
            label: 'Done',
            data: doneCounts,
            borderColor: 'rgba(0, 168, 107, 1)',
            borderWidth: 2,
         },
         {
            label: 'Canceled',
            data: cancelCounts,
            borderColor: 'rgba(239, 83, 80, 1)',
            borderWidth: 2,
         },
      ],
   };
   const doughnutChartData = {
      labels: countOrderTypePercent(list_order?.data).map(
         (item) => item.status
      ),
      datasets: [
         {
            data: countOrderTypePercent(list_order?.data).map(
               (item) => item.percentage
            ),
            backgroundColor: [
               '#66CC6B',
               '#FFA55A',
               '#f95959',
               '#ffde74',
               '#BFBFBF',
            ],
            hoverBackgroundColor: [
               '#80E27E',
               '#ffa974',
               '#ff847c',
               '#f5e180',
               '#E0E0E0',
            ],
         },
      ],
   };

   const pieChartData = {
      labels: labels,
      datasets: [
         {
            label: 'Purchases',
            data: purchases,
            backgroundColor: [
               '#FF6384',
               '#36A2EB',
               '#FFCE56',
               '#66CC99',
               '#FF9900',
               '#9933CC',
               '#669999',
            ],
         },
      ],
   };
   const lineProfitChartOptions = {
      scales: {
         x: {
            type: 'category',
            title: {
               display: true,
               text: 'Date',
            },
         },
      },
      plugins: {
         legend: {
            display: false,
            position: 'top',
         },
         title: {
            display: true,
            text: 'Profit by date',
            fontSize: 16,
         },
      },
   };
   const lineChartOptions = {
      responsive: true,
      scales: {
         x: {
            stacked: false,
         },
         y: {
            stacked: false,
         },
      },
      plugins: {
         legend: {
            position: 'bottom',
         },
         title: {
            display: true,
            text: 'Order Done & Canceled By Date',
            fontSize: 16,
         },
      },
   };
   const doughnutChartOptions = {
      responsive: true,
      scales: {
         x: {
            stacked: false,
         },
         y: {
            stacked: false,
         },
      },
      plugins: {
         legend: {
            position: 'bottom',
         },
         title: {
            display: true,
            text: 'Order Status Percentage',
            fontSize: 16,
         },
      },
   };
   const barChartOptions = {
      scales: {
         x: {
            stacked: false,
         },
         y: {
            stacked: false,
            beginAtZero: true,
         },
      },
      plugins: {
         legend: {
            display: false,
            position: 'top',
         },
         title: {
            display: true,
            text: 'Number of product by category',
            fontSize: 16,
         },
      },
   };
   const lineProfitChartData = {
      labels: profitDates,
      datasets: [
         {
            label: 'Profit',
            data: profits,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true,
         },
      ],
   };
   const pieChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
         legend: {
            display: true,
            position: 'bottom',
         },
         title: {
            display: true,
            text: 'Profit by date',
            fontSize: 16,
         },
      },
   };
   const renderMedal = (index) => {
      switch (index) {
         case 0:
            return (
               <img
                  src={first_place}
                  className='w-10 h-10 mr-5'
               />
            );
         case 1:
            return (
               <img
                  src={second_place}
                  className='w-10 h-10 mr-5'
               />
            );
         case 2:
            return (
               <img
                  src={third_place}
                  className='w-10 h-10 mr-5'
               />
            );
         case 3:
            return <div className='w-10 h-10 mr-5'></div>;
         case 4:
            return <div className='w-10 h-10 mr-5'></div>;
         default:
            break;
      }
   };
   return (
      <div className='w-full my-10 grid grid-cols-12 gap-7'>
         <div className='col-span-12 lg:col-span-7 p-4 bg-white rounded-md shadow-md shadow-gray-300'>
            <Line
               data={lineProfitChartData}
               options={lineProfitChartOptions}
            />
         </div>
         <div className='col-span-12 lg:col-span-5 bg-white rounded-md shadow-md shadow-gray-300'>
            <h1 className='text-center text-lg text-[#374b73] font-bold my-5'>
               Top user by purchase
            </h1>
            <div className='relative overflow-x-auto'>
               <table className='w-full text-sm text-left text-gray-500'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                     <tr>
                        <th
                           scope='col'
                           className='px-6 py-3 text-center'
                        >
                           User
                        </th>
                        <th
                           scope='col'
                           className='px-6 py-3 text-center'
                        >
                           Orders
                        </th>
                        <th
                           scope='col'
                           className='px-6 py-3 text-right'
                        >
                           Money Spent
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {listUser?.map((item) => {
                        return (
                           <tr
                              onClick={() => {
                                 navigate(
                                    `/admin/account-management/view-detail/${item.id}`
                                 );
                              }}
                              key={Math.random()}
                              className='bg-white border-b hover:bg-gray-100 cursor-pointer'
                           >
                              <th
                                 scope='row'
                                 className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'
                              >
                                 {renderMedal(listUser.indexOf(item))}
                                 <img
                                    className='w-10 h-10 rounded-full'
                                    src={item.avatar}
                                    alt='Jese image'
                                 />
                                 <div className='pl-3'>
                                    <div className='text-base font-semibold'>
                                       {item.name}
                                    </div>
                                    <div className='font-normal text-gray-500'>
                                       {item.email.length < 20
                                          ? item.email
                                          : item.email.substring(0, 20) + '...'}
                                    </div>
                                 </div>
                              </th>
                              <td className='px-6 py-4 text-center font-bold'>
                                 {item.totalOrders}
                              </td>
                              <td className='px-7 py-4 '>
                                 <div className='flex items-center justify-end text-green-500'>
                                    {convertToCurrency(item.totalAmount)}
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>
         <div className='col-span-12 lg:col-span-8 bg-white rounded-md shadow-md shadow-gray-300'>
            <Line
               data={lineChartData}
               options={lineChartOptions}
            />
         </div>
         <div className='col-span-12 lg:col-span-4 p-4 bg-white rounded-md shadow-md shadow-gray-300'>
            <Doughnut
               data={doughnutChartData}
               options={doughnutChartOptions}
            />
         </div>
         <div className='col-span-12 lg:col-span-8 p-4 bg-white rounded-md shadow-md shadow-gray-300'>
            <Bar
               data={barChartData}
               options={barChartOptions}
            />
         </div>
         <div className='col-span-12 lg:col-span-4 bg-white rounded-md shadow-md shadow-gray-300'>
            <div className='mx-auto w-11/12'>
               <Pie
                  data={pieChartData}
                  options={pieChartOptions}
               />
            </div>
         </div>
      </div>
   );
};

export default Statistic;
