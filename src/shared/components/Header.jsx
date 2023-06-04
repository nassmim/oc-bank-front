import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/img/argentBankLogo.png'
import { useDispatch } from 'react-redux'
import { loggedOut } from '../../features/User/userSlice.js'
import { useContext } from 'react'
import { ConnexionContext } from '../context/connexion.js'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useContext(ConnexionContext)

  const removeToken = () => {
    dispatch(loggedOut())
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
  }
  const logout = () => {
    removeToken()
    navigate('/')
  }

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
