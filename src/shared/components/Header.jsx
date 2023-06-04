import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/img/argentBankLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { loggedOut, selectToken } from '../../features/User/userSlice.js'
import { useLazyGetProfileQuery } from '../../features/api/apiSlice.js'
import { useEffect, useState } from 'react'

const Header = () => {
  const token = useSelector(selectToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Gets the user information and its trigger function to fetch it again
  const [getUser, { data: userData }] = useLazyGetProfileQuery()
  const [user, setUser] = useState(userData)

  const removeToken = () => {
    dispatch(loggedOut())
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
  }
  const logout = () => {
    removeToken()
    navigate('/')
  }

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
  }, [token, userData])

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logoImg}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user ? (
          <>
            <Link to="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </Link>
            <Link className="main-nav-item" to="/" onClick={logout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header
