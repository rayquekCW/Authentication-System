import {FaLock, FaRegEye, FaRegEyeSlash, FaAt} from 'react-icons/fa';
import {useState} from 'react';
import {Link} from 'react-router-dom';

const SignInContainer = (props: any) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<>
			<div
				id="signInContainer"
				className="w-50 d-flex align-items-center flex-column justify-content-center"
			>
				<h2 className="mb-3">Sign In</h2>
				<div className="d-flex flex-column gap-3 w-100">
					<div className="input-group mb-3">
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
					<div className="input-group mb-3 w-100">
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
							onClick={props.handleSignIn}
						>
							{' '}
							here!
						</span>
					</p>
					<p className="caption">
						or <Link to="/">Sign In with SSO</Link>
					</p>
				</div>
				<button className="defaultBtn mt-2 py-2 px-3 w-50 rounded">
					Sign In
				</button>
			</div>
		</>
	);
};

export default SignInContainer;
