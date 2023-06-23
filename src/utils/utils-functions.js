export const getUserFromLocal = () => {
   if (localStorage.getItem(import.meta.env.VITE_SIGNED_IN_USER)) {
      return JSON.parse(
         localStorage.getItem(import.meta.env.VITE_SIGNED_IN_USER)
      );
   } else {
      return null;
   }
};
