import { createContext, useState, useEffect } from 'react'
import {
  useGetProfileQuery,
  useLazyGetProfileQuery,
} from '../../features/api/apiSlice.js'
import { useSelector } from 'react-redux'
import { selectToken } from '../../features/User/userSlice.js'

export const ConnexionContext = createContext()

export const ConnexionProvider = ({ children }) => {
  // Gets the user information and its trigger function to fetch it again
  const { data: userData, isLoading } = useGetProfileQuery()
  const [user, setUser] = useState(userData)

  // Gets the user information and its trigger function to fetch it again
  const [getUser, { data: userUpdated }] = useLazyGetProfileQuery()

  const token = useSelector(selectToken)

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
