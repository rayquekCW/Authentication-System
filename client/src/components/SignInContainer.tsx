import {FaLock, FaRegEye, FaRegEyeSlash, FaAt} from 'react-icons/fa';
import {useState} from 'react';
import {Link} from 'react-router-dom';

type SignInContainerProps = {
	handleSignIn: () => void;
};

const SignInContainer = ({handleSignIn}: SignInContainerProps) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<>
			<div
				id="signInContainer"
				className="col-md-6 col-12 d-flex align-items-center flex-column justify-content-center mx-3"
			>
				<h2 className="mb-3">Sign In</h2>
				<div className="d-flex flex-column gap-3 w-100 align-items-center justify-content-center">
					<div className="input-group mb-3 w-75">
						<span className="input-group-text" id="signin-email">
							<FaAt />
						</span>
						<input
							type="email"
							className="form-control"
							placeholder="Email"
							aria-label="email"
							aria-describedby="signin-email"
						/>
					</div>
					<div className="input-group mb-3 w-75">
						<span className="input-group-text" id="basic-addon2">
							<FaLock />
						</span>
						<input
							type={showPassword ? 'text' : 'password'}
							className="form-control"
							placeholder="Password"
							aria-label="Password"
							aria-describedby="basic-addon2"
						/>
						<button
							className="input-group-text"
							id="seePasswordBtn"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
						</button>
					</div>
				</div>
				<div>
					<p className="caption">Don't have an account?</p>
					<p className="caption">
						Register with us
						<span
							className="text-primary cursor-pointer"
							onClick={handleSignIn}
						>
							{' '}
							here!
						</span>
					</p>
					<p className="caption">
						or <Link to="/">Sign In with SSO</Link>
					</p>
				</div>
				<button className="defaultBtn">Sign In</button>
			</div>
		</>
	);
};

export default SignInContainer;
