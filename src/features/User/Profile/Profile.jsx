import { useContext, useEffect, useState } from 'react'
import { useGetProfileQuery } from '../../api/apiSlice.js'
import { useUpdateUserNamesMutation } from '../../api/apiSlice.js'
import {
  EditUserForm,
  EditUserInputWrapper,
  EditUserInput,
  EditUserButtonWrapper,
  EditUserButton,
} from '../../User/Profile/style.js'
import { ConnexionContext } from '../../../shared/context/connexion.js'

const Profile = () => {
  const [displayEditUserForm, setDisplayEditUserForm] = useState(false)
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')

  // Gets the user profile information
  const { user } = useContext(ConnexionContext)

  const [updateUserNames] = useUpdateUserNamesMutation()

  /**
   * Save the new names in the database
   * @param { HTMLButtonElement} e
   * @returns
   */
  const saveUserNamesEditing = async (e) => {
    e.preventDefault()

    if (userFirstName.trim().length === 0 || userLastName.trim().length === 0)
      return

    const names = {
      firstName: userFirstName,
      lastName: userLastName,
    }

    try {
      await updateUserNames(names)
    } catch (err) {
      console.log(err)
      // Restablish the state with the user information stored in DB
      // Need to do that as the state was updated at every input change
      setUserNames(user.firstName, user.lastName)
    }

    setDisplayEditUserForm(false)
  }

  const cancelUserNamesEditing = (e) => {
    e.preventDefault()
    setUserNames(user.firstName, user.lastName)
    setDisplayEditUserForm(false)
  }

  const setUserNames = (firstName, lastName) => {
    setUserFirstName(firstName)
    setUserLastName(lastName)
  }

  // When mounts for first time, sets the state with the user information
  // currently saved in DB
  useEffect(() => {
    setUserNames(user.firstName, user.lastName)
  }, [])

  return (
    <main className="main bg-dark">
      <div className="header">
        {user && (
          <>
            <h1>
              Welcome back
              <br />
              {userFirstName} {userLastName}!
            </h1>

            {!displayEditUserForm && (
              <button
                className="edit-button"
                onClick={() => setDisplayEditUserForm(true)}
              >
                Edit Name
              </button>
            )}
            {displayEditUserForm && (
              <EditUserForm>
                <EditUserInputWrapper
                  className="input-wrapper editUserFormItem"
                  isFirstInput={true}
                >
                  <EditUserInput
                    type="text"
                    id="firstname"
                    value={userFirstName}
                    onInput={(e) => setUserFirstName(e.target.value)}
                  />
                </EditUserInputWrapper>
                <EditUserInputWrapper className="input-wrapper editUserFormItem">
                  <EditUserInput
                    type="text"
                    id="lastname"
                    value={userLastName}
                    onInput={(e) => setUserLastName(e.target.value)}
                  />
                </EditUserInputWrapper>
                <EditUserButtonWrapper
                  className="edit-button-wrapper editUserFormItem"
                  isFirstInput={true}
                >
                  <EditUserButton
                    className="sign-in-button"
                    onClick={(e) => saveUserNamesEditing(e)}
                  >
                    Save
                  </EditUserButton>
                </EditUserButtonWrapper>
                <EditUserButtonWrapper className="edit-button-wrapper editUserFormItem">
                  <EditUserButton
                    className="sign-in-button"
                    onClick={(e) => cancelUserNamesEditing(e)}
                  >
                    Cancel
                  </EditUserButton>
                </EditUserButtonWrapper>
              </EditUserForm>
            )}
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}

export default Profile
