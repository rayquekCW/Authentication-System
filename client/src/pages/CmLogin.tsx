import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FaLock, FaRegEye, FaRegEyeSlash} from 'react-icons/fa';
import bankLogo from '../assets/posb.svg'; // T

const CustomerManagementLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = () => {
        //TODO: verify username and password with backend
        navigate('/cmdashboard');
    };

	return (
        <>
            <div className="container-fluid d-flex vh-80">
                <div className="col-md-6 align-items-center flex-column justify-content-center d-md-flex d-none">
                    <img src={bankLogo} alt="bank-logo" className="bank-logo" />
                    <h1 className='bank-name'>Welcome to POSB</h1> {/*TODO: Dynamic client name*/}
                    <p className="fst-italic bank-slogan">
                        Neighbors first, bankers second {/*TODO: Dynamic slogan*/}
                    </p>
                </div>
                <div
                    id="signInContainer"
                    className="col-md-6 col-12 d-flex align-items-center flex-column justify-content-center"
                >
                    <h1 className="mb-3">Customer Management Login</h1>
                    <div className="d-flex flex-column gap-3 w-100 align-items-center justify-content-center">
                        <div className="input-group mb-3 w-75">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                aria-label="username"
                                aria-describedby="signin-username"
                                onChange={(e) => setUsername(e.target.value)}
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
                    <button
                        className="defaultBtn"
                        onClick={handleSignIn}
                    >
                        Sign In
                    </button>{' '}
                </div>
            </div>
        </>
	);
}

export default CustomerManagementLogin