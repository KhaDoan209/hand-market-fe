import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

const LazyOutlet = React.lazy(() =>
   import('react-router-dom').then((module) => ({ default: module.Outlet }))
);
function App() {

   return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <ChakraProvider>
               <LazyOutlet />
               <Toaster />
            </ChakraProvider>
         </Suspense>
      </>
   );
}

export default App;
