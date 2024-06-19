import { createBrowserRouter } from 'react-router-dom'
import PageKanban from './pages/PageKanban.tsx'
import PageTask from './pages/PageTask.tsx'
import PageError from './pages/PageError.tsx'
import { DefaultLayout } from './layouts/DefaultLayout.tsx'

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <PageKanban />
      },
      {
        path: '/task',
        element: <PageTask />
      },
      {
        path: '*',
        element: <PageError />
      }
    ]
  }
])

export default {
  router
}
