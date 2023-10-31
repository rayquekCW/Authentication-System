import { FaAt, FaCalendar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";

type RegisterContainerProps = {
	handleSignIn: () => void;
};

const RegisterContainer = ({ handleSignIn }: RegisterContainerProps) => {
	let navigate = useNavigate();
	var today = new Date();
	var dd = today.getDate();
	var mm = String(today.getMonth() + 1).padStart(2, "0");
	var yyyy = today.getFullYear();
	var maxDate = yyyy + "-" + mm + "-" + dd;

	const [email, setEmail] = useState("");
	const [dob, setDob] = useState("");

	/**
	 * The function verifies a user's email and birthdate by making a POST request to an API and then
	 * navigates to a password page if the user is verified.
	 */
	function verify() {
		const API =
			"https://nu0bf8ktf0.execute-api.ap-southeast-1.amazonaws.com/dev/validate";

		const uri = `${API}?email=${email}&birthdate=${dob}`;

		fetch(uri, {
			method: "POST",
		})
			.then((data) => data.json())
			.then((result) => {
				// if result has a errorType, then the user is not verified
				// TODO - To update the lambda function to return properly if have time
				if (result.errorType) {
					console.log("User is not correct");
					return;
				}

				/* if result has a statusCode, then the user is verified
				 * navigate to the setPassword page
				 */
				navigate("/password", {
					state: { isChangePassword: false, isVerified: false, email: email },
				});
			});
	}

	return (
		<>
			<div
				id="registerContainer"
				className="col-md-6 col-12 d-flex align-items-center flex-column justify-content-center"
			>
				<h1 className="mb-3">Register</h1>
				<div className="d-flex flex-column gap-3 w-100 align-items-center justify-content-center">
					<div className="input-group mb-3 w-75">
						<span className="input-group-text" id="register-email">
							<FaAt />
						</span>
						<input
							type="email"
							className="form-control"
							placeholder="Email"
							aria-label="Email"
							aria-describedby="register-email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-group mb-3 w-75">
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
							onChange={(e) => setDob(formatDate(e.target.value))}
						/>
					</div>
				</div>
				<div>
					<h5 className="caption">Already have an account?</h5>
					<p className="caption">
						Login
						<span
							className="text-primary cursor-pointer"
							onClick={handleSignIn}
						>
							{" "}
							here!
						</span>
					</p>
					<p className="caption">
						or <Link to="/">Sign In with SSO</Link>
					</p>
				</div>
				<button className="defaultBtn" onClick={() => verify()}>
					Sign Up!
				</button>
			</div>
		</>
	);
};

export default RegisterContainer;
