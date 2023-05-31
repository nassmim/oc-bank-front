import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLoginMutation } from '../../api/apiSlice.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginRequest] = useLoginMutation()
  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    const credentials = { email: 'steve@rogers.com', password: 'password456' }

    let token
    try {
      token = await loginRequest(credentials).unwrap()
    } catch (err) {
      console.log(err)
      return
    }
    localStorage.setItem('token', token)
    navigate('/profile')
  }

  return (
    <main class="main bg-dark">
      <section class="sign-in-content">
        <i class="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div class="input-wrapper">
            <label for="email">Email address</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="input-wrapper">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="input-remember">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          <button class="sign-in-button" onClick={(e) => login(e)}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
