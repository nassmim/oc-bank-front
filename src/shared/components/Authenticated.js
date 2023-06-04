import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { useGetProfileQuery } from '../../features/api/apiSlice.js'
import { ConnexionContext } from '../context/connexion.js'

/**
 * Private Component used only to ensure the user is connected.
 */
const Authenticated = () => {
  // React forces 2 renders, so we need to check when it's the second render
  const [hasBeenRendered, setHasBeenRendered] = useState(false)
  const location = useLocation()
  const { user, isLoading } = useContext(ConnexionContext)

  // This hooks enables to know that the component is now really rendered with data
  useEffect(() => {
    return () => setHasBeenRendered(true)
  }, [])

  // Once component truly rendered and data fetching finished, we decide where
  // user should be redirected
  return (
    hasBeenRendered &&
    !isLoading &&
    (user ? (
      <Outlet />
    ) : (
      <Navigate to="/sign-in" state={{ from: location }} replace />
    ))
  )
}

export default Authenticated
