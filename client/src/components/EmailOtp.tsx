// TODO: Component border with shadow

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';

const EmailOtp = () => {
	const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digit OTP
	const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null)); // to store references to the 6 input fields
	const [time, setTime] = useState(300); // 5 minutes timer

	useEffect(() => {
		let timer: NodeJS.Timeout; // to store the timer

		// if time is greater than 0, decrement time by 1 every second
		if (time > 0) {
			timer = setTimeout(() => setTime(time - 1), 1000);
		}

		return () => clearTimeout(timer); // clear the timer when the component unmounts
	}, [time]);

	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const value = e.target.value;

		// check if value is a number and length of value is 1 (1 digit per input field)
		if (/^[0-9]*$/.test(value) && value.length <= 1) {
			// copy all the current OTP values into a new array
			const updatedOtp = [...otp];

			// update the OTP value at the given index with the new value
			updatedOtp[index] = value;
			setOtp(updatedOtp);

			// if value is not empty and the index is less than 5 and the next input field exists, focus on the next input field
			if (value !== '' && index < 5 && inputRefs.current[index + 1]) {
				inputRefs.current[index + 1]?.focus();
				// if value is empty and the index is greater than 0 and the previous input field exists, focus on the previous input field
			} else if (value === '' && index > 0 && inputRefs.current[index - 1]) {
				inputRefs.current[index - 1]?.focus();
			}
		}
	};

	return (
		<div>
			<h1>OTP Verification</h1>
			<FontAwesomeIcon icon={faMobileScreen} size='3x' fade />
			<p id='otp-text' className='my-3'>
				A one-time password has been sent to xav******@gmail.com. {/* to be replaced with user's email */}
			</p>
			<div className="container text-center">
				<div className="mx-auto" style={{ maxWidth: '400px' }}>
					{otp.map((value, index) => (
						<div key={index} style={{ display: 'inline-block', marginRight: '10px', marginBottom: '10px' }}>
							<input
								type="text"
								className="form-control text-center"
								value={value}
								onChange={(e) => handleInputChange(e, index)}
								maxLength={1}
								style={{ height: '50px', width: '40px', borderBottom: '1px solid #000' }}
								ref={(input) => (inputRefs.current[index] = input)}
							/>
						</div>
					))}
				</div>
				<p id='otp-text' className='my-3'>
					OTP is only valid for {formatTime(time)} seconds.
				</p>
				<p id='otp-text' className='my-3'>
					Did not receive the OTP? <a href='#'>Resend OTP</a>
				</p>
				<button className="btn defaultBtn" id="login">
					<span className="btn-text">Login</span>
				</button>
			</div>
			{/* <div className="container text-center">
				{msg && <Notification message={msg} isError={error} />}
			</div> */}
		</div>
	);
};

export default EmailOtp;
