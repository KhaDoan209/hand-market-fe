import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
const LazyOutlet = React.lazy(() =>
   import('react-router-dom').then((module) => ({ default: module.Outlet }))
);
function App() {
 
   // const navigateTo = (location) => {
   //    return navigate(`/${location}`);
   // };
   return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <LazyOutlet />
            <Toaster />
         </Suspense>
      </>
   );
}

export default App;
