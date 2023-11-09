import { Link } from "react-router-dom";
import "../../styles/_variable.scss";
// import { BsList } from "react-icons/bs";
import BankLogo from "../../assets/posb.svg";
import { AiFillExclamationCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../../components/navigation/SideBar";
import SideBarSuper from "../../components/navigation/SideBarSuper";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AccountContext } from "../../services/Account";

type adminNavBarProps = {
  adminType?: string;
  userName?: string;
};

const AdminNavBar = (adminNavBarProps: any) => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout } = useContext(AccountContext) || {};
  const isSuper = adminNavBarProps.adminType === "super_admin";
  const userName = adminNavBarProps.userName;

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

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand">
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex">
          <div
            onClick={handleClick}
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center justify-content-center"
          >
            <GiHamburgerMenu
              style={{ fontSize: "25px", color: "white", marginRight: "5px" }}
            />
          </div>
          <img
            src={BankLogo}
            alt="bank-logo"
            width={100}
            style={{ marginRight: "auto" }}
          />
        </div>

        <ul className="navbar-nav">
          <li className="nav-item me-4">
            <Link className="nav-link" to="">
              {
                <AiFillExclamationCircle
                  style={{ marginRight: "5px", marginBottom: "3px" }}
                />
              }
              Edit Tooltips
            </Link>
          </li>
          <li className="nav-item me-4">
            <Link className="nav-link" to="">
              <CgProfile style={{ marginRight: "5px", marginBottom: "3px" }} />
              {userName}
            </Link>
          </li>
          <li className="nav-item me-4">
            <Link className="nav-link" to="" onClick={handleLogout}>
              <IoMdLogOut style={{ marginRight: "5px", marginBottom: "3px" }} />
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
        {isSuper ? (
          <SideBarSuper handleClick={handleClick} />
        ) : (
          <Sidebar handleClick={handleClick} />
        )}
      </div>
    </nav>
  );
};

export default AdminNavBar;
