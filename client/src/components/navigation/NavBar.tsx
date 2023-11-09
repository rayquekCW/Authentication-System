import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { useContext } from "react";
import "../../styles/_variable.scss";
import BankLogo from "../../assets/posb.svg";
import { AccountContext } from "../../services/Account";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const { logout } = useContext(AccountContext) || {};
	const [cookie, setCookie, removeCookie] = useCookies();
	const navigate = useNavigate();

	const handleToggleClick = () => {
		const navbarNavDropdown = document.getElementById("navbarNavDropdown");
		navbarNavDropdown?.classList.toggle("show");
	};

	const handleLogout = () => {
		if (logout) {
			logout();
			removeCookie("userData");
			navigate("/");
		}
	};

	return (
		<nav className="navbar navbar-expand">
			<div className="container d-flex justify-content-between">
				<Link to="/home">
					<img
						src={BankLogo}
						alt="bank-logo"
						height={75}
						width={100}
						className="navbar-brand"
					/>
				</Link>

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
							<Link className="nav-link" to="/profile">
								Profile
							</Link>
						</li>

						<li className="nav-item">
							<Link
								className="nav-link"
								to=""
								onClick={handleLogout}
							>
								Logout
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
