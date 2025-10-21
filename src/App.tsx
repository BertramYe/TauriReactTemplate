import React from 'react'
import './main.scss';
import ErrorBoundary from '@/src/components/ErrorBoundary'
import Transition from '@/src/components/Transition'
import { RouterProvider } from "react-router-dom";
import router from '@/src/routers';

const App: React.FunctionComponent = () => {
  return (
    <ErrorBoundary>
        <React.Suspense fallback={ <Transition/> } >
          <RouterProvider router={router} >
          </RouterProvider>   
        </React.Suspense>
      </ErrorBoundary>
  )
}

export default App

