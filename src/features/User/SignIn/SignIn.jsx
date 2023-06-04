import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useLoginMutation } from '../../api/Auth/authApiSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { loggedIn, selectToken } from '../userSlice.js'
import { useLazyGetProfileQuery } from '../../api/apiSlice.js'

const SignIn = () => {
  const tokenFromState = useSelector(selectToken)
  const emailInputElement = useRef()
  const passwordInputElement = useRef()
  const rememberMeCheckboxElement = useRef()
  const dispatch = useDispatch()
  const [loginApiRequest] = useLoginMutation()
  const navigate = useNavigate()

  // Gets the user profile information
  const [getUser, { data: user }] = useLazyGetProfileQuery()

  /**
   * Saves the token in the browser
   * @param {String} token as a JWT
   */
  const activateUser = (token) => {
    // If the user wants to be remembered, his token is saved in localstorage
    // so that it lasts longer
    if (rememberMeCheckboxElement.current.checked)
      localStorage.setItem('token', token)
    else sessionStorage.setItem('token', token)

    // Updates le token dans le state du user
    dispatch(loggedIn(token))
  }

  /**
   * Log the user in and gets his JWT
   * @param {HTMLButtonElement} e
   */
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
  }

  // Determines if user must remain on page or get redirected to the profile
  useEffect(() => {
    // Gets the user's profile and redirects him to the profile screen
    const triggerGetUser = async () => {
      try {
        await getUser().unwrap()
      } catch (error) {
        console.log(error)
      }
      navigate('/profile')
    }

    // If the token exists, the user either just logged in from the form  or
    // he went to this screen while alredy connected
    if (tokenFromState) {
      triggerGetUser()
    } else emailInputElement.current.focus()
  }, [tokenFromState, getUser, navigate])

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
