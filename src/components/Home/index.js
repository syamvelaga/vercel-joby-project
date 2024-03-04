import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-bg">
        <h1 className="home-head">Find The Job That Fits Your Life</h1>
        <p className="para">Millions of people are searching for jobs</p>
        <Link to="/jobs">
          <button className="home-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
