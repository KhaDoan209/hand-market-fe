import { OrderStatus } from '../enums/OrderStatus';
export const getUserFromLocal = () => {
   if (localStorage.getItem(import.meta.env.VITE_SIGNED_IN_USER)) {
      return JSON.parse(
         localStorage.getItem(import.meta.env.VITE_SIGNED_IN_USER)
      );
   } else {
      return null;
   }
};

export const resetTextFormInput = (...input) => {
   let array = [...input];
   return array.map((item) => {
      item.current.value = '';
   });
};

export const convertObjectToFormData = (values) => {
   let object = new FormData();
   if (values.file === null) {
      for (const key in values) {
         if (key !== 'file') {
            object.append(key, values[key]);
         }
      }
   } else {
      for (const key in values) {
         if (key !== 'file') {
            object.append(key, values[key]);
         } else {
            object.append('file', values.file, values.file.name);
         }
      }
   }
   return object;
};

export const calculatePriceAfterDiscount = (price, discount) => {
   if (Number(discount) > 0) {
      const discountPrice = Number(price) * Number(discount / 100);
      return (Number(price) - discountPrice).toLocaleString('vi-VN', {
         style: 'currency',
         currency: 'VND',
      });
   } else {
      return Number(price).toLocaleString('vi-VN', {
         style: 'currency',
         currency: 'VND',
      });
   }
};

export const calculateDiscountPriceInCart = (
   price,
   discount,
   item_quantity
) => {
   if (Number(discount) > 0) {
      const discountPrice = Number(price) * Number(discount / 100);
      return (Number(price) - discountPrice) * item_quantity;
   } else {
      return Number(price * item_quantity);
   }
};

export const renderSubTotalPrice = (itemArray) => {
   let price = 0;
   itemArray?.map((item) => {
      price +=
         (Number(item?.Product?.price) -
            Number(item?.Product?.price) *
               Number(item?.Product?.Discount?.percentage / 100)) *
         item?.item_quantity;
   });
   return price;
};

export const convertToCurrency = (number) => {
   return number.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
   });
};

export const countVAT = (price) => {
   return (price * 8) / 100;
};

export const playNotificationSound = () => {
   const notificationSound = document.getElementById('notificationSound');
   if (notificationSound) {
      return notificationSound.play();
   }
};

export const countOrdersDoneAndCanceledByDate = (orders) => {
   const orderCounts = {};
   if (
      orders === null ||
      typeof orders === 'undefined' ||
      !Array.isArray(orders) ||
      orders.length === 0
   ) {
      return [];
   }
   for (const order of orders) {
      const orderDate = new Date(order.order_date).toISOString().split('T')[0];
      if (!orderCounts[orderDate]) {
         orderCounts[orderDate] = {
            order_date: orderDate,
            order_done_count: 0,
            order_cancel_count: 0,
         };
      }
      if (order.status === OrderStatus.Done) {
         orderCounts[orderDate].order_done_count++;
      } else if (order.status === OrderStatus.Canceled) {
         orderCounts[orderDate].order_cancel_count++;
      }
   }
   const sortedResults = Object.values(orderCounts).sort((a, b) =>
      a.order_date.localeCompare(b.order_date)
   );
   return sortedResults;
};

export const countOrdersByDate = (orders) => {
   const orderCounts = {};
   if (
      orders === null ||
      typeof orders === 'undefined' ||
      !Array.isArray(orders) ||
      orders.length === 0
   ) {
      return [];
   }
   for (const order of orders) {
      const orderDate = new Date(order.order_date).toISOString().split('T')[0];
      if (!orderCounts[orderDate]) {
         orderCounts[orderDate] = {
            order_date: orderDate,
            order_total: 0,
         };
      }
      if (order.status !== OrderStatus.Canceled) {
         orderCounts[orderDate].order_total++;
      }
   }
   const sortedResults = Object.values(orderCounts).sort((a, b) =>
      a.order_date.localeCompare(b.order_date)
   );
   return sortedResults;
};

export const countOrderTypePercent = (orders) => {
   const statusCounts = {};
   if (
      orders === null ||
      typeof orders === 'undefined' ||
      !Array.isArray(orders) ||
      orders.length === 0
   ) {
      return [];
   }
   orders?.forEach((order) => {
      const status = order.status;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
   });
   const totalOrders = orders.length;
   const statusData = [];
   for (const status in statusCounts) {
      const percentage = ((statusCounts[status] / totalOrders) * 100).toFixed(
         2
      );
      statusData.push({ status, percentage: Number(percentage) });
   }
   return statusData;
};

export const generateRandomColors = (count) => {
   const randomColors = [];
   for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const a = 0.7;
      const randomColor = `rgba(${r}, ${g}, ${b}, ${a})`;
      randomColors.push(randomColor);
   }

   return randomColors;
};

export const countUserHasMostOrder = (orders) => {
   if (
      orders === null ||
      typeof orders === 'undefined' ||
      !Array.isArray(orders) ||
      orders.length === 0
   ) {
      return [];
   }
   const userOrderInfo = {};
   orders?.forEach((order) => {
      const userId = order?.Order_user?.id;
      if (!userOrderInfo[userId]) {
         userOrderInfo[userId] = {
            id: order?.Order_user.id,
            name: `${order?.Order_user.first_name} ${order?.Order_user.last_name}`,
            avatar: order?.Order_user?.avatar,
            email: order?.Order_user?.email,
            totalOrders: 0,
            totalAmount: 0,
         };
      }
      userOrderInfo[userId].totalOrders++;
      userOrderInfo[userId].totalAmount += parseFloat(order.order_total);
   });
   const sortedUsers = Object.values(userOrderInfo).sort(
      (a, b) => b.totalAmount - a.totalAmount
   );
   const topUsers = sortedUsers.slice(0, 5).map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      totalOrders: user.totalOrders,
      totalAmount: user.totalAmount,
   }));

   return topUsers;
};

export const calculateTotalProfitByDate = (orders) => {
   if (
      orders === null ||
      typeof orders === 'undefined' ||
      !Array.isArray(orders) ||
      orders.length === 0
   ) {
      return [];
   }
   const profitByDate = {};
   orders?.forEach((order) => {
      const orderDate = new Date(order.order_date).toLocaleDateString();
      const orderTotal = parseFloat(order.order_total);
      if (!profitByDate[orderDate]) {
         profitByDate[orderDate] = 0;
      }
      profitByDate[orderDate] += orderTotal;
   });
   const result = Object.keys(profitByDate).map((date) => ({
      date,
      profit: profitByDate[date],
   }));
   return result;
};
