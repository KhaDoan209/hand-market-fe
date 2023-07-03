import { useEffect, useRef } from 'react';

const useOptimizedEvent = (eventHandler, delay) => {
   useEffect(() => {
      let keyPressCount = 0;
      let timeoutId = null;
      const handleMouseMove = () => {
         keyPressCount++;
         clearTimeout(timeoutId);
         timeoutId = setInterval(() => {
            eventHandler();
            keyPressCount = 0;
         }, delay);
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
         window.removeEventListener('mousemove', handleMouseMove);
         clearTimeout(timeoutId);
      };
   }, []);
};

export default useOptimizedEvent;
