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
