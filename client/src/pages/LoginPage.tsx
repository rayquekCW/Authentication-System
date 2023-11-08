import SignInContainer from '../components/SignInContainer';
import RegisterContainer from '../components/RegisterContainer';
import { useState } from 'react';

import BankLogo from "../assets/posb.svg";

const LoginPage = () => {
	const [showSignIn, setShowSignIn] = useState(true);

	const handleSignIn = () => {
		setShowSignIn(!showSignIn);
	};

	return (
		<>

			<div className="container-fluid d-flex vh-80">

				{/* Left */}
				<div className="col-md-6 align-items-center flex-column justify-content-center d-md-flex d-none">
					<img src={BankLogo} alt="bank-logo" width={250}/>
					<h1 className='bank-name'>Welcome to POSB</h1> {/*TODO: Dynamic client name*/}
					<p className="fst-italic bank-slogan">
						Neighbors first, bankers second {/*TODO: Dynamic slogan*/}
					</p>
				</div>

				{/* Right */}
				{showSignIn ? (
					<SignInContainer handleSignIn={handleSignIn} />
				) : (
					<RegisterContainer handleSignIn={handleSignIn} />
				)}
			</div>

		</>
	);
};

export default LoginPage;
