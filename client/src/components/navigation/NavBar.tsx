import { Link } from "react-router-dom";
import "../../styles/_variable.scss";
import BankLogo from "../../assets/posb.svg";

const NavBar = () => {
	const handleToggleClick = () => {
		const navbarNavDropdown = document.getElementById("navbarNavDropdown");
		navbarNavDropdown?.classList.toggle("show");
	};

	return (
		<nav className="navbar navbar-expand">
			<div className="container">
				<img
					src={BankLogo}
					alt="bank-logo"
					height={75}
					width={100}
					className="navbar-brand"
				/>
				<button
					className="navbar-toggler"
					type="button"
					onClick={handleToggleClick}
				></button>
				<div
					className="collapse navbar-collapse"
					id="navbarNavDropdown"
				>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link
								className="nav-link"
								aria-current="page"
								to="/home"
							>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/profile">
								Profile
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
