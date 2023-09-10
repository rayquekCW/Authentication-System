import SignInContainer from '../components/SignInContainer';

const LoginPage = () => {
	return (
		<div className="d-flex vh-100">
			<div className="w-50 d-flex align-items-center flex-column justify-content-center">
				<h1>Welcome to Ascenda</h1>
				<p>Browse and Redeem Rewards at a click of a button</p>
			</div>
			<SignInContainer />
		</div>
	);
};

export default LoginPage;
