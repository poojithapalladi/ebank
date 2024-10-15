import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {
    userId: '',
    pin: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = err_msg => {
    this.setState({showSubmitError: true, errorMsg: err_msg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state

    // Validate empty inputs before making the API call
    if (userId === '' && pin === '') {
      this.setState({
        showSubmitError: true,
        errorMsg: "User ID and PIN didn't match",
      })
      return
    }

    if (userId === '' && pin !== '') {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Invalid User ID',
      })
      return
    }

    if (userId !== '' && pin === '') {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Invalid PIN',
      })
      return
    }

    // Prepare data for API call
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    // Handle API response
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {userId, pin, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="login-heading">Welcome Back!</h1>
            <label className="input-label" htmlFor="userId">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              className="user-input-field"
              onChange={this.onChangeUserId}
              placeholder="Enter your User ID"
            />
            <label className="input-label" htmlFor="pin">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={this.onChangePin}
              className="user-input-field"
              placeholder="Enter your PIN"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginRoute
