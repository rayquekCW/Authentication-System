import {Link} from 'react-router-dom';
import '../styles/_variable.scss';
import logo from '../assets/logo.png';

const NavBar = () => {
	const inlineStyle = {
		color: 'blue',
		fontSize: '16px',
		backgroundColor: '#1B2042',
		padding: '20px',

	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light rounded" style={inlineStyle}>
			<div className="container-fluid">
				<Link to="/homePage">
					<img src={logo} style={{width: '150px'}} alt="Logo" />
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" style={{color: 'white !important'}}></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown" >
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" aria-current="page" to="/homePage" style={{color: 'white'}}>Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/profilePage" style={{color: 'white'}}>Profile</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
