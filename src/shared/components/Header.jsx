import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/img/argentBankLogo.png'
import { useGetProfileQuery } from '../../features/api/apiSlice.js'
import { useEffect } from 'react'

const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const {
    data: user,
    isSuccess: userFound,
    isError: userFetchReturnedError,
  } = useGetProfileQuery(token)

  const removeToken = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
  }
  const logout = () => {
    removeToken()
    navigate('/')
  }

  useEffect(() => {
    if (userFetchReturnedError) {
      removeToken()
    }
  }, [userFetchReturnedError])

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
        {userFound ? (
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
