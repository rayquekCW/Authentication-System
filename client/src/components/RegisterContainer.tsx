import {FaLock, FaRegEye, FaRegEyeSlash, FaUserAlt, FaAt} from 'react-icons/fa';
import {useState} from 'react';
import {Link} from 'react-router-dom';

const RegisterContainer = (props: any) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<>
			<div
				id="registerContainer"
				className="w-50 d-flex align-items-center flex-column justify-content-center"
			>
				<h2 className="mb-3">Register</h2>
				<div className="d-flex flex-column gap-3 w-100">
					<div className="input-group mb-3">
						<span className="input-group-text" id="basic-addon1">
							<FaUserAlt />
						</span>
						<input
							type="text"
							className="form-control"
							placeholder="Username"
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
					</div>
					<div className="input-group mb-3">
						<span className="input-group-text" id="register-email">
							<FaAt />
						</span>
						<input
							type="email"
							className="form-control"
							placeholder="Email"
							aria-label="Email"
							aria-describedby="register-email"
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
					<p className="caption">Already have an account?</p>
					<p className="caption">
						Login
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

export default RegisterContainer;
