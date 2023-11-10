import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	AiFillExclamationCircle,
	AiFillEdit,
	AiOutlineClose,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdRemoveCircle } from "react-icons/md";
import Sidebar from "../../components/navigation/SideBar";
import SideBarSuper from "../../components/navigation/SideBarSuper";
import AdminNavBar from "../../components/navigation/AdminNavBar";
import UserLogoutPopup from "../../components/UserLogout";
import MultiFactAuth from "../../components/MultiFactAuth";
import Pagination from "react-bootstrap/Pagination";
import Switch from "react-switch";
import { AccountContext } from "../../services/Account";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const bankName = import.meta.env.VITE_BANK_NAME;

const CmDashboard = () => {
	const { getSession, logout } = useContext(AccountContext) || {};

	//TODO: Implement different protected routes based on admin types (super_admin, admin, user)
	const [adminType, setAdminType] = useState("");
	const [, , removeCookie] = useCookies();
	const navigate = useNavigate();
	const isSuper = adminType === "super_admin";
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [userSub, setUserSub] = useState<string>("");
	const [userName, setUserName] = useState<string>("");

	// For MFA Popups
	const [showMfaPopup, setShowMfaPopup] = useState<boolean>(false);
	const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
	const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] =
		useState<boolean>(false);

	const closePopup = () => {
		setShowMfaPopup(false);
		setShowDeleteConfirmPopup(false);
		setShowEditPopup(false);
	};

	// Handle Pagination
	const [customers, setCustomers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const customersPerPage = 12;
	const startIndex = (currentPage - 1) * customersPerPage; // Calculate the startIndex and endIndex based on the current page number
	const endIndex = startIndex + customersPerPage;
	const customersToDisplay = customers.slice(startIndex, endIndex); // Slice the customersData to get the customers for the current page
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	// For Edit Popup
	const [isAdmin, setIsAdmin] = useState(false);
	const [isSuperAdmin, setIsSuperAdmin] = useState(false);

	// toggle admin by allowing only one of the two to be true
	const toggleAdmin = () => {
		// set isAdmin to the opposite of its current value
		setIsAdmin(!isAdmin);
		// if isSuperAdmin is true, set it to false
		if (isSuperAdmin) {
			setIsSuperAdmin(false);
		}
	};

	// toggle super admin by allowing only one of the two to be true
	const toggleSuperAdmin = () => {
		setIsSuperAdmin(!isSuperAdmin);
		if (isAdmin) {
			setIsAdmin(false);
		}
	};

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	// For Delete Popup
	const handleDeleteButtonClick = () => {
		setShowDeleteConfirmPopup(true);
	};
	const handleDeleteConfirmButtonClick = () => {
		setShowMfaPopup(true);
	};

	// For Edit Popup
	const handleEditButtonClick = (userSub: string, userRole: string) => {
		setShowEditPopup(true);
		setUserSub(userSub); //userSub of selected user
		if (userRole == "Super Admin") {
			setIsSuperAdmin(true);
			setIsAdmin(false);
		} else if (userRole == "Admin") {
			setIsAdmin(true);
			setIsSuperAdmin(false);
		}
	};
	const handleEditConfirmButtonClick = () => {
		setShowMfaPopup(true);
	};

	const handleLogout = () => {
		if (logout) {
			logout();
			localStorage.clear();
			sessionStorage.clear();
			removeCookie("userData");
			navigate("/");
		}
	};

	// TODO - Refactor this into a separate file
	const inlineStyle = {
		fontSize: "16px",
		backgroundColor: "#0078CE",
		padding: "20px",
	};

	// TODO - Refactor this into a utils file
	const formatDate = (inputDate: any) => {
		const date = new Date(inputDate);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	const changeRole = async () => {
		if (getSession) {
			getSession().then(async (sessionData) => {
				//if isAdmin is true and isSuperAdmin is false, role equals to admin. if isAdmin is false and isSuperAdmin is true, role equals to super_admin. if both are false, role equals to user
				const role = isAdmin
					? "admin"
					: isSuperAdmin
					? "super_admin"
					: "user";
				const accessToken = sessionData.accessToken.jwtToken;
				const headers = sessionData.headers;
				const sub = userSub;
				const API =
					"https://nu0bf8ktf0.execute-api.ap-southeast-1.amazonaws.com/dev/update-role";
				//try catch to invoke the api with method patch and send headers and requst body
				try {
					const response = await fetch(API, {
						method: "PATCH",
						headers: headers,
						body: JSON.stringify({ sub, role, accessToken }),
					});
					if (response.ok) {
						const API =
							"https://nu0bf8ktf0.execute-api.ap-southeast-1.amazonaws.com/dev/retrieveuser";
						const uri = `${API}?accessToken=${accessToken}`;
						try {
							const response = await fetch(uri, { headers });
							if (response.ok) {
								const data = await response.json();
								setAdminType(data.statusCode);
								setCustomers(data.users.data);
							} else {
								// Handle the error
							}
						} catch (error) {
							console.error(
								"Error while validating admin:",
								error
							);
						}
						setShowEditPopup(false);
					}
				} catch (error) {
					console.error("Error while validating admin:", error);
				}
			});
		}
	};

	useEffect(() => {
		if (getSession) {
			getSession()
				.then(async (sessionData) => {
					setUserName(
						sessionData.given_name + " " + sessionData.family_name
					);
					const accessToken = sessionData.accessToken.jwtToken;
					console.log(accessToken);
					const headers = sessionData.headers;
					const API =
						"https://nu0bf8ktf0.execute-api.ap-southeast-1.amazonaws.com/dev/retrieveuser";
					const uri = `${API}?accessToken=${accessToken}&bankIdentifier=${bankName}`;
					try {
						const response = await fetch(uri, { headers });
						if (response.ok) {
							const data = await response.json();
							setAdminType(data.statusCode);
							setCustomers(data.users.data);
						} else {
							// Handle the error
						}
					} catch (error) {
						console.error("Error while validating admin:", error);
					}
				})
				.catch((error) => {
					console.error("Error while getting access token:", error);
				});
		}
	}, []);

	return (
		<>
			<UserLogoutPopup />
			<div
				className={`overlay ${
					showMfaPopup || showDeleteConfirmPopup ? "active" : ""
				}`}
			></div>
			<AdminNavBar adminType={adminType} userName={userName} />

			<div className="container bg-light shadow-sm my-4 p-4">
				<h2 className="">Customers</h2>
				<div className="table-responsive">
					<table
						className="table mt-4"
						style={{ border: "1px solid lightgrey" }}
					>
						<thead>
							<tr>
								<th className="table-header" scope="col">
									Name
								</th>
								<th className="table-header" scope="col">
									Email
								</th>
								<th className="table-header" scope="col">
									Status
								</th>
								<th className="table-header" scope="col">
									User Role
								</th>
								<th className="table-header" scope="col">
									Created At
								</th>
								<th className="table-header" scope="col">
									Updated At
								</th>
								<th className="table-header" scope="col">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{customersToDisplay &&
								customersToDisplay.map((customer: any) => (
									<tr key={customer.Username}>
										<td>
											{customer.given_name}{" "}
											{customer.family_name}
										</td>
										<td>{customer.email}</td>
										<td>{customer.UserStatus}</td>
										<td>{customer.UserRole}</td>
										<td>
											{formatDate(
												customer.UserCreateDate
											)}
										</td>
										<td>
											{formatDate(
												customer.UserLastModifiedDate
											)}
										</td>
										{/* TODO - Update the stlying of this button */}
										{adminType === "super_admin" ? (
											<td>
												<button
													className="defaultBtn"
													style={{
														width: "auto",
													}}
													onClick={() =>
														handleEditButtonClick(
															customer.Username,
															customer.UserRole
														)
													}
												>
													<AiFillEdit />
												</button>
												<button
													className="cancelBtn ms-2"
													style={{
														width: "auto",
													}}
													onClick={() =>
														handleDeleteButtonClick()
													}
												>
													<MdRemoveCircle />
												</button>
											</td>
										) : (
											<td>-</td>
										)}
									</tr>
								))}
						</tbody>
					</table>
				</div>

				<Pagination className="my-pagination justify-content-center mt-4">
					<Pagination.Prev
						onClick={() => paginate(currentPage - 1)}
						disabled={currentPage === 1}
					/>
					{Array(Math.ceil(customers.length / customersPerPage))
						.fill(undefined)
						.map((_, index) => (
							<Pagination.Item
								key={index + 1}
								active={index + 1 === currentPage}
								onClick={() => paginate(index + 1)}
							>
								{index + 1}
							</Pagination.Item>
						))}
					<Pagination.Next
						onClick={() => paginate(currentPage + 1)}
						disabled={
							currentPage ===
							Math.ceil(customers.length / customersPerPage)
						}
					/>
				</Pagination>

				{/* This is the Edit User Popup Modal */}
				{showEditPopup && (
					<div className="popup d-flex justify-content-center align-items-center">
						<div className="popup-content text-center">
							<h1 className="mb-4">Edit User</h1>
							<table>
								<tbody>
									<tr>
										<td>
											<span className="me-3">
												Admin (Restricted & Read-Only)
											</span>
										</td>
										<td>
											<Switch
												checked={isAdmin}
												onChange={toggleAdmin}
												disabled={isSuperAdmin}
												onColor="#0078CE"
												offColor="#ccc"
											/>
										</td>
									</tr>
									<tr>
										<td>
											<span className="me-3">
												Super Admin (Unrestricted &
												Read/Write/Delete)
											</span>
										</td>
										<td>
											<Switch
												checked={isSuperAdmin}
												onChange={toggleSuperAdmin}
												disabled={isAdmin}
												onColor="#0078CE"
												offColor="#ccc"
											/>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="button-container">
								<button
									className="defaultBtn me-2"
									style={{ width: "auto" }}
									onClick={changeRole}
									// onClick={handleEditConfirmButtonClick}
								>
									Save
								</button>
								<button
									className="cancelBtn"
									style={{ width: "auto" }}
									onClick={closePopup}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}

				{/* This is the Delete User Popup Modal */}
				{showDeleteConfirmPopup && (
					<div className="popup d-flex justify-content-center align-items-center">
						<div className="popup-content text-center">
							<h1>Deactivate User</h1>
							<h6>
								Are you sure you want to deactivate this user?
							</h6>
							<button
								className="defaultBtn me-2"
								style={{ width: "auto" }}
								onClick={handleDeleteConfirmButtonClick}
							>
								Yes
							</button>
							<button
								className="cancelBtn"
								style={{ width: "auto" }}
								onClick={closePopup}
							>
								No
							</button>
						</div>
					</div>
				)}

				{/* This is the MFA Popup Modal */}
				{showMfaPopup && (
					<div className="popup">
						<div className="col-3">
							<button className="cancelBtn" onClick={closePopup}>
								<AiOutlineClose />
							</button>
						</div>
						<div className="popup-content">
							<div className="my-5">
								<MultiFactAuth
									navigateTo="/"
									handleSteps={() => 5}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default CmDashboard;
