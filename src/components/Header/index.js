import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="first">
        <Link to="/" className="header">
          <li>Home</li>
        </Link>

        <Link to="/jobs" className="header">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" className="btn" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
