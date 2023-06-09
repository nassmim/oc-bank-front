import { createContext, useState, useEffect } from 'react'
import {
  useGetProfileQuery,
  useLazyGetProfileQuery,
} from '../../features/api/apiSlice.js'
import { useSelector } from 'react-redux'
import { selectToken } from '../../features/User/userSlice.js'

export const ConnexionContext = createContext()

export const ConnexionProvider = ({ children }) => {
  const token = useSelector(selectToken)
  // Gets the user information and its trigger function to fetch it again
  const [getUser, { data: userUpdated, isLoading }] = useLazyGetProfileQuery()
  const [user, setUser] = useState(userUpdated)

  /* Needs this useEffect to ensure the header displays the right screen
  depending on user connexion status. User will be considered disconnected if:
  - he logged out himself
  - the token has expirerd
  */
  useEffect(() => {
    const triggerGetUser = async () => {
      let user
      try {
        user = await getUser().unwrap()
      } catch (error) {
        console.log(error)
      }
      setUser(user)
    }
    triggerGetUser()
  }, [token, userUpdated, getUser])

  return (
    <ConnexionContext.Provider
      value={{
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </ConnexionContext.Provider>
  )
}
