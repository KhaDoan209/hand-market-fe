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
