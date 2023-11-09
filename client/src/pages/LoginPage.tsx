import SignInContainer from '../components/SignInContainer';
import RegisterContainer from '../components/RegisterContainer';
import { useState } from 'react';
const bankName = import.meta.env.VITE_BANK_NAME;
const BankLogo = await import(`../assets/${bankName}.svg`);
const bankConfig = await import(`../../config/${bankName}.json`);

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
					<img src={BankLogo.default} alt="bank-logo" width={250}/>
					<h1 className='bank-name'>Welcome to {bankName}</h1>
					<p className="fst-italic bank-slogan">
						{bankConfig.slogan}
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
