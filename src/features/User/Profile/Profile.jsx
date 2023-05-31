import { useEffect } from 'react'
import { useGetProfileQuery } from '../../api/apiSlice.js'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  // Gets the user profile information
  const { data: user, isError } = useGetProfileQuery(token)
  if (isError) {
    // User cannot be retrieved if token is not valid anymore, so he must re-login
    navigate('/sign-in')
  }

  return (
    <main class="main bg-dark">
      <div class="header">
        <h1>
          Welcome back
          <br />
          {user?.firstName} {user?.lastName}!
        </h1>
        <button class="edit-button">Edit Name</button>
      </div>
      <h2 class="sr-only">Accounts</h2>
      <section class="account">
        <div class="account-content-wrapper">
          <h3 class="account-title">Argent Bank Checking (x8349)</h3>
          <p class="account-amount">$2,082.79</p>
          <p class="account-amount-description">Available Balance</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
      </section>
      <section class="account">
        <div class="account-content-wrapper">
          <h3 class="account-title">Argent Bank Savings (x6712)</h3>
          <p class="account-amount">$10,928.42</p>
          <p class="account-amount-description">Available Balance</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
      </section>
      <section class="account">
        <div class="account-content-wrapper">
          <h3 class="account-title">Argent Bank Credit Card (x8349)</h3>
          <p class="account-amount">$184.30</p>
          <p class="account-amount-description">Current Balance</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}

export default Profile
