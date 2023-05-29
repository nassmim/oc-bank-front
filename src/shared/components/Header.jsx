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
        <a class="main-nav-item" href="./sign-in.html">
          <i class="fa fa-user-circle"></i>
          Sign In
        </a>
      </div>
    </nav>
  )
}

export default Header
