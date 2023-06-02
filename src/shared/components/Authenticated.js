import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetProfileQuery } from '../../features/api/apiSlice.js'

const Authenticated = () => {
  const [hasBeenRendered, setHasBeenRendered] = useState(false)
  const location = useLocation()

  const { data: user, isLoading } = useGetProfileQuery()

  useEffect(() => {
    return () => setHasBeenRendered(true)
  }, [])

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
