import { createBrowserRouter } from 'react-router-dom'

import Layout from '../layout/Layout'
import NetworkError from '../layout/NetworkError'
import Dashboard from '../views/dashboard/Dashboard.tsx'

export const homeRouters = [
  {
    path: 'dashboard',
    breadcrumb: ['首页'],
    element: <Dashboard/>
  }
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement:  <NetworkError/>,
    children: homeRouters
  }
])

export default router
