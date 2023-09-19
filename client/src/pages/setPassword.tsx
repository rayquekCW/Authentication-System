import {FaLock, FaRegEye, FaRegEyeSlash, FaAt} from 'react-icons/fa';
import {useState} from 'react';	
import { useLocation,useNavigate} from 'react-router-dom';
import OtpPassword from '../components/OtpPassword';
import Notifications from '../components/Notifications';
import MFAPassword from '../components/MFAPassword';

const SetPassword = () => {
	const [password, setPassword] = useState('');
  	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword,setShowPasswordStatus] = useState(false);
	const [showConfirmPassword,setShowConfirmPasswordStatus] = useState(false);
	const[lengthCheck,setLengthCheck]=useState(false);
	const[passwordStrengthCheck,setPasswordStrengthCheck]=useState(false);
	const[passwordValid,setPasswordValidStatus]=useState(false);
	const[isSuccessful,setIsSuccessful]=useState(false);
	const[isSubmitted,setIsSubmitted]=useState(false);
	const navigate = useNavigate();
	const location = useLocation()
	const isChange = location.state.isChangePassword
	const isVerified = location.state.isVerified


	const handlePasswordChange = (e: any) => {
		const newPassword = e.target.value;
		const lengthValid = newPassword.length >= 9 && newPassword.length <= 64;
		
		const uppercaseValid = /[A-Z]/.test(newPassword);
		const lowercaseValid = /[a-z]/.test(newPassword);
		const numberValid = /[0-9]/.test(newPassword);
		const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
	  
		const isStrengthValid = [uppercaseValid, lowercaseValid, numberValid, specialCharValid].filter(Boolean).length >= 2;
		const isPasswordValid = lengthValid && isStrengthValid;
	  
		setLengthCheck(lengthValid);
		setPasswordStrengthCheck(isStrengthValid);
		setPasswordValidStatus(isPasswordValid);
	  
		setPassword(newPassword);
	};

	const handleConfirmPasswordChange = (e:any) => {
		const newConfirmPassword = e.target.value;
		setConfirmPassword(newConfirmPassword);
	};
	
	const handleSetPassword = () => {
		if (password === confirmPassword && passwordValid) {
			setIsSuccessful(!isSuccessful);
		}
		setIsSubmitted(true);
	};

	return (
		<div className=" container-fluid h-100">
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
								{(isChange && !isVerified)? (
								<div>
									<MFAPassword isChange={isChange}/>
								</div>
								):(null)}
								{(!isChange && !isVerified)? (
								<div>
									<OtpPassword otpType='email' isChange={false} />
								</div>
								):(null)}
								{( ((!isChange && isVerified) || (isChange && isVerified)) && !isSuccessful) ? (
								<div>
									<div className="text-start">Password must:</div>
									<ul className="text-start">
										<li
											style={{ color: password ? (lengthCheck ? "green" : "red") : "black"  }}
										>
											Be between 9-64 characters
										</li>
										<div style={{ color: password ? (passwordStrengthCheck ? "green" : "red") : "black" }}>
											<li>
												Include at least two of the following:
											</li>
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
											type={showPassword ? 'text' : 'password'}
											className="form-control"
											placeholder="Password"
											aria-label="Password"
											aria-describedby="basic-addon2"
											value={password}
          									onChange={handlePasswordChange}
										/>
										<button
											className="input-group-text"
											onClick={() => setShowPasswordStatus(!showPassword)}
											>
											{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
										</button>
									</div>
									<div className="input-group mb-3 w-100">
										<input
											type={showConfirmPassword ? 'text' : 'password'}
											className="form-control"
											placeholder="Confirm Password"
											aria-label="Password"
											aria-describedby="basic-addon2"
											value={confirmPassword}
         									onChange={handleConfirmPasswordChange}
										/>
										<button
											className="input-group-text"
											onClick={() => setShowConfirmPasswordStatus(!showConfirmPassword)}
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
								):(null)}
								{(isSuccessful)?(
									<div>
										<Notifications message={"Password set successfully!"} isError={!isSuccessful}/>
										<button className='defaultBtn mt-3' onClick={isChange? () => navigate('/profile') :() => navigate('/')}>Continue</button>
									</div>
								):(null)}
								{(!isSuccessful && isSubmitted)?(
									<Notifications message={"Invalid password or passwords do not match"} isError={!isSuccessful}/>
								):(null)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SetPassword;
