import { useEffect, useState } from 'react'
import { useGetProfileQuery } from '../../api/apiSlice.js'
import styled from 'styled-components'
import { useUpdateUserNamesMutation } from '../../api/apiSlice.js'

const EditUserForm = styled.form`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  row-gap: 10px;
  column-gap: 20px;
`

const EditUserInputWrapper = styled.div`
  width: 80%;
  margin-bottom: 0;
  ${(props) => {
    if (props.isFirstInput) {
      return `
      grid-column-start: 2;
      justify-self: flex-end;
      `
    } else {
      return `
      grid-column-start: 3;
      justify-self: flex-start;
      `
    }
  }}
`

const EditUserInput = styled.input`
  font-weight: bold;
  color: lightgray;
  margin-top: 0px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 3px 2px lightgray;
`
const EditUserButtonWrapper = styled.div`
  width: 50%;
  margin-top: 0px;
  grid-row-start: 2;
  ${(props) => {
    if (props.isFirstInput) {
      return `
      grid-column-start: 2;
      justify-self: flex-end;
      `
    } else {
      return `
      grid-column-start: 3;
      justify-self: flex-start;
      `
    }
  }}
`

const EditUserButton = styled.button`
  background-color: #fff;
  color: mediumpurple;
  margin-top: 0px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 3px 2px mediumpurple;
  cursor: pointer;
`

const Profile = () => {
  const [displayEditUserForm, setDisplayEditUserForm] = useState(false)
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')

  // Gets the user profile information
  const { data: user, isSuccess } = useGetProfileQuery()
  const [updateUserNames] = useUpdateUserNamesMutation()

  const saveUserNamesEditing = async (e) => {
    e.preventDefault()
    const names = {
      firstName: userFirstName,
      lastName: userLastName,
    }

    try {
      await updateUserNames(names)
    } catch (err) {
      console.log(err)
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

  useEffect(() => {
    isSuccess && setUserNames(user.firstName, user.lastName)
  }, [isSuccess])

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
