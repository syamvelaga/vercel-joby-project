import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isActive: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isActive: true, errorMsg})
  }

  submitForm = async event => {
    event.preventdefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          id="username"
          value={username}
          type="text"
          className="input-text"
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          id="password"
          value={password}
          type="password"
          className="input-text"
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {errorMsg, isActive} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <div className="login-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
          <form onSubmit={this.submitForm}>
            <div className="input-container">{this.renderUername()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isActive && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
