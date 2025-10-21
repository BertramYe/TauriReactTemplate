import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/src/pages/Home'



const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePage />  
  },
])

export default router;