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

    const handleRedirectToHomePage = () => {
        // Redirect the user to the homepage
        navigate('/');
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
                        <Setup requireSetup={true} stateChanger={setSteps} />
                    </div>
                );

            case 3:
                return (
                    <div className='my-5'>
                        <h3>Setup Complete!</h3>
                        <p>You have successfully set up MFA for your account.</p>
                        <p>Click the button below to go back to the login page.</p>
                        <button className="btn defaultBtn" onClick={handleRedirectToHomePage}>Login</button>
                    </div>
                );

            default:
                return null; // Handle unexpected steps or provide a default case
        }
    };

    return <>{renderComponents()}</>;
};

export default MfaPage;
