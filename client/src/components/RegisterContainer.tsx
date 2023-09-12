import {
	FaLock,
	FaRegEye,
	FaRegEyeSlash,
	FaUserAlt,
	FaAt,
	FaCalendar,
} from 'react-icons/fa';
import {useState} from 'react';
import {Link} from 'react-router-dom';

const RegisterContainer = (props: any) => {
	const [showPassword, setShowPassword] = useState(false);
	var today = new Date();
	var dd = today.getDate();
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	var maxDate = yyyy + '-' + mm + '-' + dd;

	return (
		<>
			<div
				id="registerContainer"
				className="w-50 d-flex align-items-center flex-column justify-content-center"
			>
				<h2 className="mb-3">Register</h2>
				<div className="d-flex flex-column gap-3 w-100">
					<div className="input-group mb-3">
						<span
							className="input-group-text"
							id="register-firstname"
						>
							<FaUserAlt />
						</span>
						<input
							type="text"
							className="form-control"
							placeholder="First Name"
							aria-label="Firstname"
							aria-describedby="register-firstname"
						/>
						<input
							type="text"
							className="form-control"
							placeholder="Last Name"
							aria-label="Lastname"
							aria-describedby="register-lastname"
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
					<div className="input-group mb-3">
						<span className="input-group-text" id="register-dob">
							<FaCalendar />
						</span>
						<input
							type="date"
							className="form-control"
							placeholder="Date of Birth"
							aria-label="dob"
							aria-describedby="register-dob"
							max={maxDate}
						/>
					</div>
					<div className="input-group mb-3 w-100">
						<span
							className="input-group-text"
							id="register-password"
						>
							<FaLock />
						</span>
						<input
							type={showPassword ? 'text' : 'password'}
							className="form-control"
							placeholder="Password"
							aria-label="Password"
							aria-describedby="register-password"
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
					Sign Up!
				</button>
			</div>
		</>
	);
};

export default RegisterContainer;
