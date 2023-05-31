import { createBrowserRouter } from 'react-router-dom'
import Login from './features/User/Login/Login.jsx'
import App from './App.js'
import Home from './features/Home/Home.jsx'
import Profile from './features/User/Profile/Profile.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/sign-in',
        element: <Login />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
])
