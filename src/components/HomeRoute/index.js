import {withRouter} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
class HomeRoute extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/ebank/login')
  }
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="app-container">
        <div className="img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <button type="button" className="button" onClick={this.onClickLogout}>
            Logout
          </button>
          <h1 className="title">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            className="digital-card"
            alt="digital card"
          />
        </div>
      </div>
    )
  }
}

export default withRouter(HomeRoute)
