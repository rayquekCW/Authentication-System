import SignInContainer from '../components/SignInContainer';
import RegisterContainer from '../components/RegisterContainer';
import {useState} from 'react';
const LoginPage = () => {
	const [showSignIn, setShowSignIn] = useState(true);

	const handleSignIn = () => {
		setShowSignIn(!showSignIn);
	};

	return (
		<div className="d-flex vh-80">
			<div className="w-50 d-flex align-items-center flex-column justify-content-center">
				<h1>Welcome to Ascenda</h1>
				<p>Browse and Redeem Rewards at a click of a button</p>
			</div>
			{showSignIn ? (
				<SignInContainer handleSignIn={handleSignIn} />
			) : (
				<RegisterContainer handleSignIn={handleSignIn} />
			)}
		</div>
	);
};

export default LoginPage;
