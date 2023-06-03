import styled from 'styled-components'

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

export {
  EditUserForm,
  EditUserInputWrapper,
  EditUserInput,
  EditUserButtonWrapper,
  EditUserButton,
}
