import { createBrowserRouter } from 'react-router-dom'
import SignIn from './features/User/SignIn/SignIn.jsx'
import App from './App.js'
import Home from './features/Home/Home.jsx'
import Profile from './features/User/Profile/Profile.jsx'
import Authenticated from './shared/components/Authenticated.js'

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
        element: <SignIn />,
      },
      {
        element: <Authenticated />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
])
