import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/img/argentBankLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { loggedOut, selectToken } from '../../features/User/userSlice.js'
import { useGetProfileQuery } from '../../features/api/apiSlice.js'

const Header = () => {
  const token = useSelector(selectToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: user } = useGetProfileQuery()

  const removeToken = () => {
    dispatch(loggedOut())
    localStorage.removeItem('token')
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
        {token && user ? (
          <>
            <a className="main-nav-item" href="./user.html">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </a>
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
