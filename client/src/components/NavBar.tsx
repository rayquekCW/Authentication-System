import { Link } from 'react-router-dom';
import '../styles/_variable.scss';
import { BsList } from 'react-icons/bs';


const NavBar = () => {

  const inlineStyle = {
    fontSize: "16px",
    backgroundColor: "#0078CE",
    padding: "20px",
  };

  const handleToggleClick = () => {
    const navbarNavDropdown = document.getElementById('navbarNavDropdown');
    navbarNavDropdown?.classList.toggle('show');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={inlineStyle}>
      <div className="container-fluid">
        <Link to="/">
          <img style={{ maxWidth: '100px', marginRight: '20px' }} src="https://internet-banking.dbs.com.sg/IB/posb/images/desktoplogo.png" alt="Logo" />
        </Link>
        <button className="navbar-toggler" type="button" onClick={handleToggleClick}>
          <BsList style={{ color: 'white' }} />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown" >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/home" style={{ color: 'white' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile" style={{ color: 'white' }}>Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default NavBar;
