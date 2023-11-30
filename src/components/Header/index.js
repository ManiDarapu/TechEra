import './index.css'
import {Link} from 'react-router-dom'

const Header = () => (
  <nav className="nav">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png "
        alt="website logo"
        className="websiteLogo"
      />
    </Link>
  </nav>
)

export default Header
