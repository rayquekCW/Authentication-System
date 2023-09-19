import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MFASetupPrompt from "../components/mfaSetupSteps/MFASetupPrompt";
import Setup from "../components/mfaSetupSteps/Setup";
import Otp from "../components/Otp";

const MfaPage = () => {

    const [steps, setSteps] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state.email;
    const logoURL = location.state.logoURL;

    // if logoURL is provided, use that, otherwise use "../src/assets/logo.png"
    const logoData = logoURL || '../src/assets/posb.svg';

    const handleRedirectToHomePage = () => {
        // Redirect the user to the homepage
        navigate('/home');
    };

    const renderComponents = () => {
        switch (steps) {
            case 0:
                return (
                    <div className='my-5 text-center'>
                        <Otp otpType="email" stateChanger={setSteps} />
                    </div>
                )

            case 1:
                return (
                    <div className='my-5'>
                        <MFASetupPrompt stateChanger={setSteps} email={email} logoURL={logoURL} />
                    </div>
                );

            case 2:
                return (
                    <div className='my-5'>
                        <Setup requireSetup={true} stateChanger={setSteps} logoURL={logoURL} />
                    </div>
                );

            case 3:
                return (
                    <div className='my-5'>
                        <div className="container text-start" style={{ backgroundColor: 'white' }}>
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col mx-2 my-2">
                                    <img src={logoData} style={{ width: '150px' }} alt="Logo" />
                                    <h3>Setup Complete!</h3>
                                    <p>You have successfully set up MFA for your account.</p>
                                    <p>Click the button below to go back to the login page.</p>
                                    <button className="btn defaultBtn" onClick={handleRedirectToHomePage}>Continue</button>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </div>
                    </div >
                );

            default:
                return null; // Handle unexpected steps or provide a default case
        }
    };

    return <>{renderComponents()}</>;
};

export default MfaPage;
