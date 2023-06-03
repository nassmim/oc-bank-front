import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useLoginMutation } from '../../api/Auth/authApiSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { loggedIn, selectToken } from '../userSlice.js'
import { useGetProfileQuery } from '../../api/apiSlice.js'

const SignIn = () => {
  const emailInputElement = useRef()
  const passwordInputElement = useRef()
  const rememberMeCheckboxElement = useRef()
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const [loginApiRequest] = useLoginMutation()
  const navigate = useNavigate()

  const { data: user, isSuccess, isError } = useGetProfileQuery()

  const activateUser = (token) => {
    // If the user wants to be remembered, his token is saved in localstorage
    // so that it lasts longer
    if (rememberMeCheckboxElement.current.checked)
      localStorage.setItem('token', token)
    else sessionStorage.setItem('token', token)

    dispatch(loggedIn(token))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const credentials = {
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,
    }

    let token
    try {
      token = await loginApiRequest(credentials).unwrap()
    } catch (err) {
      console.log(err)
      return
    }

    activateUser(token)

    navigate('/profile')
  }

  useEffect(() => {
    if (isSuccess) navigate('/profile')
    else emailInputElement.current.focus()
  }, [isSuccess, isError])

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="email">Email address</label>
            <input ref={emailInputElement} type="text" id="email" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input ref={passwordInputElement} type="password" id="password" />
          </div>
          <div className="input-remember">
            <input
              ref={rememberMeCheckboxElement}
              type="checkbox"
              id="remember-me"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="sign-in-button"
            onClick={(e) => handleLoginSubmit(e)}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}

export default SignIn
