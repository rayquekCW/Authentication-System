import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import UserPool from "../services/UserPool";
import { CognitoUser } from "amazon-cognito-identity-js";
import OtpPassword from "../components/OtpPassword";
import Notifications from "../components/Notifications";
import MFAPassword from "../components/MFAPassword";


const SetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [lengthCheck, setLengthCheck] = useState(false);
	const [passwordStrengthCheck, setPasswordStrengthCheck] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [isSuccessful, setIsSuccessful] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showErrorNotification, setShowErrorNotification] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const isChange = location.state.isChangePassword;
	const isVerified = location.state.isVerified;
	const email = location.state.email;
	

	// Effect for showing/hiding error notification
	useEffect(() => {
		if (!isSuccessful && isSubmitted) {
			setShowErrorNotification(true);

			// Set a timeout to hide the error notification after 5 seconds
			const timeout = setTimeout(() => {
				setShowErrorNotification(false);
				setIsSubmitted(false);
			}, 5000);

			// Clear the timeout when the component unmounts or when isSubmitted becomes false
			return () => clearTimeout(timeout);
		}
	}, [isSuccessful, isSubmitted]);

	// Handler for password change
	const handlePasswordChange = (e: any) => {
		setIsSubmitted(false);
		const newPassword = e.target.value;
		const lengthValid = newPassword.length >= 14 && newPassword.length <= 64;

		const uppercaseValid = /[A-Z]/.test(newPassword);
		const lowercaseValid = /[a-z]/.test(newPassword);
		const numberValid = /[0-9]/.test(newPassword);
		const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

		const isStrengthValid =
			[uppercaseValid, lowercaseValid, numberValid, specialCharValid].filter(
				Boolean
			).length >= 3;
		const isPasswordValid = lengthValid && isStrengthValid;

		setLengthCheck(lengthValid);
		setPasswordStrengthCheck(isStrengthValid);
		setPasswordValid(isPasswordValid);

		setPassword(newPassword);
	};

	// Handler for confirm password change
	const handleConfirmPasswordChange = (e: any) => {
		setIsSubmitted(false);
		setConfirmPassword(e.target.value);
	};

	const getUser = () => {
		return new CognitoUser({
			Username: email.toLowerCase(),
			Pool: UserPool,
		});
	};

	// Handler for setting the password
	const handleSetPassword = () => {
		setIsSubmitted(true);
		if (password === confirmPassword && passwordValid) {
			setIsSuccessful(true);

			// ! Only for production
			// else send the email to forgetPassword
			getUser().forgotPassword({
				onSuccess: () => {
					console.log("onSuccess: The reset email has been sent!");
				},
				onFailure: (err) => {
					console.error("onFailure:", err);
				},
			});
		} else {
			setShowErrorNotification(true);
		}
	};

	return (
		<div className="container-fluid h-100">
			<div className="passwordDesign row p-0">
				<div className="d-none d-md-block col-md-7 p-0"></div>
				<div className="heightDesign col-md-5 d-flex justify-content-center align-items-center px-3">
					<div className="container">
						<div className="boxInput row d-flex justify-content-center align-items-center">
							<div className="text-center p-2 rounded">
								<img
									className="mb-5"
									src="https://internet-banking.dbs.com.sg/IB/posb/images/desktoplogo.png"
									alt=""
								/>
								{!isSuccessful && (
									<div>
										<div className="text-start">Password must:</div>
										<ul className="text-start">
											<li
												style={{
													color: password
														? lengthCheck
															? "green"
															: "red"
														: "black",
												}}
											>
												Be between 14-64 characters
											</li>
											<div
												style={{
													color: password
														? passwordStrengthCheck
															? "green"
															: "red"
														: "black",
												}}
											>
												<li>Include at least three of the following:</li>
												<ul>
													<li>An uppercase character</li>
													<li>A lowercase character</li>
													<li>A number</li>
													<li>A special character</li>
												</ul>
											</div>
										</ul>
										<div className="input-group mb-3 w-100">
											<input
												type={showPassword ? "text" : "password"}
												className="form-control"
												placeholder="Password"
												aria-label="Password"
												aria-describedby="basic-addon2"
												value={password}
												onChange={handlePasswordChange}
											/>
											<button
												className="input-group-text"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
											</button>
										</div>
										<div className="input-group mb-3 w-100">
											<input
												type={showConfirmPassword ? "text" : "password"}
												className="form-control"
												placeholder="Confirm Password"
												aria-label="Password"
												aria-describedby="basic-addon2"
												value={confirmPassword}
												onChange={handleConfirmPasswordChange}
											/>
											<button
												className="input-group-text"
												onClick={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
											>
												{showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
											</button>
										</div>
										<button
											className="btn btn-sm defaultBtn mt-2"
											onClick={handleSetPassword}
										>
											Set Password
										</button>
									</div>
								)}
								{isSuccessful && (
									<div>
										<Notifications
											message={
												"Final verification before your password is set!"
											}
											isError={!isSuccessful}
										/>
									</div>
								)}
								{isChange && isSuccessful && (
									<MFAPassword isChange={isChange} />
								)}
								{!isChange && isSuccessful && (
									<OtpPassword
										otpType="email"
										email={email}
										password={password}
									/>
								)}
								<div className="notification">
									{showErrorNotification && !isSuccessful && isSubmitted && (
										<Notifications
											message={"Invalid password or passwords do not match"}
											isError={!isSuccessful}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SetPassword;
