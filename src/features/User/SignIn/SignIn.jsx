import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useLoginMutation } from '../../api/apiSlice.js'

const SignIn = () => {
  const emailInputElement = useRef()
  const passwordInputElement = useRef()
  const rememberMeCheckboxElement = useRef()

  const [loginRequest] = useLoginMutation()
  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    const credentials = {
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,
    }

    let token
    try {
      token = await loginRequest(credentials).unwrap()
    } catch (err) {
      console.log(err)
      return
    }

    // If the user wants to be remembered, his token is saved in localstorage
    // so that it lasts longer
    if (rememberMeCheckboxElement.current.value === true)
      localStorage.setItem('token', token)
    else sessionStorage.setItem('token', token)

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
            <input ref={emailInputElement} type="text" id="email" />
          </div>
          <div class="input-wrapper">
            <label for="password">Password</label>
            <input ref={passwordInputElement} type="password" id="password" />
          </div>
          <div class="input-remember">
            <input
              ref={rememberMeCheckboxElement}
              type="checkbox"
              id="remember-me"
            />
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

export default SignIn
