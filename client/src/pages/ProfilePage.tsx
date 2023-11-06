import {useState, useContext, useEffect} from 'react';
import NavBar from '../components/NavBar';
import MultiFactAuth from '../components/MultiFactAuth';
import {AiOutlineClose} from 'react-icons/ai';
import {Link, useNavigate} from 'react-router-dom';
import {AccountContext} from '../services/Account';
import {useSearchParams} from 'react-router-dom';

interface UserDataProps {
	sub: string;
	name: string;
	email: string;
	given_name: string;
	family_name: string;
	birthdate: string;
	gender: string;
	phone_number: number;
}

const ProfilePage = () => {
	const [searchParams] = useSearchParams();
	const [userData, setUserData] = useState<UserDataProps>();
	const [showMfaPopup, setShowMfaPopup] = useState(false);
	const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);
	const [showChangeConfirmPopup, setShowChangeConfirmPopup] = useState(false);

	const {authenticate} = useContext(AccountContext) || {};

	const navigate = useNavigate();

	const handleDeleteButtonClick = () => {
		setShowDeleteConfirmPopup(true);
	};

	const handleChangeButtonClick = () => {
		setShowChangeConfirmPopup(true);
	};

	const handleDeleteConfirmButtonClick = () => {
		setShowMfaPopup(true);
	};

	const handleChangeConfirmButtonClick = () => {
		navigate('/password', {
			state: {isChangePassword: true, isVerified: false},
		});
	};

	const closePopup = () => {
		setShowMfaPopup(false);
		setShowDeleteConfirmPopup(false);
		setShowChangeConfirmPopup(false);
	};

	const {logout} = useContext(AccountContext) || {};

	const handleLogout = () => {
		if (logout) {
			logout();
			navigate('/');
		}
	};

	const getUserData = async () => {
		//get data from session
		if (searchParams.get('code') === null) return;
		if (userData != undefined) return;
		try {
			const response = await fetch(
				'https://nu0bf8ktf0.execute-api.ap-southeast-1.amazonaws.com/dev/g2t4-authtoken',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						code: searchParams.get('code'),
					}),
				}
			);
			if (response.ok) {
				const data = await response.json();
				console.log(data.access_token);
				try {
					const verifyTokenResponse = await fetch(
						'https://nu0bf8ktf0.execute-api.ap-southeast-1.amazonaws.com/dev/g2t4-verifytoken',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								token: data.access_token,
							}),
						}
					);
					if (!verifyTokenResponse.ok) {
						alert('Invalid Token');
					} else {
						console.log('token verified');
						try {
							const response2 = await fetch(
								'https://nu0bf8ktf0.execute-api.ap-southeast-1.amazonaws.com/dev/auth_userprofile',
								{
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({
										accessToken: data.access_token,
									}),
								}
							);
							if (response2.ok) {
								const userData = await response2.json();
								console.log(userData);
								setUserData(userData);
							}
						} catch (error: any) {
							console.log(error.message);
						}
					}
				} catch {
					console.log('error');
				}
			} else {
				console.error(
					`Failed to fetch access token. Status code: ${response.status}`
				);
			}
		} catch (error: any) {
			console.log('error');
		}
	};

	const forceSignIn = async (userData: UserDataProps) => {
		if (userData != undefined) {
			if (authenticate) {
				authenticate(userData.email, userData.sub).then((data: any) => {
					// data is suppose to be the cognito user
					console.log('Logged in!', data);
				});
			}
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			<NavBar />
			<div
				className={`overlay ${
					showMfaPopup ||
					showDeleteConfirmPopup ||
					showChangeConfirmPopup
						? 'active'
						: ''
				}`}
			></div>
			<div className="container bg-light shadow-sm mt-4 p-4">
				<div className="row p-3">
					<div className="col-md-4 col-12">
						<h2>Profile</h2>
					</div>
					<div className="col-md-8 col-12 d-flex justify-content-end">
						<div className="col-3 text-end">
							<Link to="/">
								<button
									className="defaultBtn"
									style={{width: 'auto'}}
									onClick={handleLogout}
								>
									Log Out
								</button>
							</Link>
						</div>
					</div>
				</div>
				<table className="table h-50 text-center">
					<tbody>
						<tr>
							<th className="text-start p-3">Full Name</th>
							<td className="text-start p-3">{userData?.name}</td>
						</tr>
						<tr>
							<th className="text-start p-3">Email</th>
							<td className="text-start p-3">
								{userData?.email}
							</td>
						</tr>
						<tr>
							<th className="text-start p-3">Phone Number</th>
							<td className="text-start p-3">
								{userData?.phone_number}
							</td>
						</tr>
						<tr>
							<th className="text-start p-3">Birth Date</th>
							<td className="text-start p-3">
								{userData?.birthdate}
							</td>
						</tr>
					</tbody>
				</table>
				<div className="row justify-content-end">
					<div className="col-12 col-lg-4 text-md-end">
						<button
							className="defaultBtn me-3"
							style={{width: 'auto'}}
							onClick={handleChangeButtonClick}
						>
							Change Password
						</button>
						<button
							className="cancelBtn me-3"
							onClick={handleDeleteButtonClick}
							style={{width: 'auto'}}
						>
							Delete Account
						</button>
					</div>
				</div>
			</div>

			{showDeleteConfirmPopup && (
				<div className="popup d-flex justify-content-center align-items-center">
					<div className="popup-content text-center">
						<h1>Delete Account</h1>
						<h6>Are you sure you want to delete your Account?</h6>
						<button
							className="defaultBtn me-2"
							style={{width: 'auto'}}
							onClick={handleDeleteConfirmButtonClick}
						>
							Yes
						</button>
						<button
							className="cancelBtn"
							style={{width: 'auto'}}
							onClick={closePopup}
						>
							No
						</button>
					</div>
				</div>
			)}

			{showChangeConfirmPopup && (
				<div className="popup d-flex justify-content-center align-items-center">
					<div className="popup-content text-center">
						<h1>Change Password</h1>
						<h6>Are you sure you want to change your Password?</h6>
						<button
							className="defaultBtn me-2"
							style={{width: 'auto'}}
							onClick={handleChangeConfirmButtonClick}
						>
							Yes
						</button>
						<button
							className="cancelBtn"
							style={{width: 'auto'}}
							onClick={closePopup}
						>
							No
						</button>
					</div>
				</div>
			)}

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
		</>
	);
};

export default ProfilePage;
