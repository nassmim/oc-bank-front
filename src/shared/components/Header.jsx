import { Link } from 'react-router-dom'
import logoImg from '../../assets/img/argentBankLogo.png'
const Header = () => {
  return (
    <nav class="main-nav">
      <Link class="main-nav-logo" to="/">
        <img class="main-nav-logo-image" src={logoImg} alt="Argent Bank Logo" />
        <h1 class="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link class="main-nav-item" to="/sign-up">
          <i class="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  )
}

export default Header
