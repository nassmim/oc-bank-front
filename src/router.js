import { createBrowserRouter } from 'react-router-dom'

import App from './App.js'
import Home from './features/Home/Home.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
])
