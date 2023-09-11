import { useState } from "react";
import MFASetupPrompt from "../components/mfaSetupSteps/MFASetupPrompt";
import Setup from "../components/mfaSetupSteps/Setup";

type MfaPageProps = {
    email: string;
    logoURL: string;
}


const MfaPage = ({ email, logoURL }: MfaPageProps) => {

    const [steps, setSteps] = useState(0);

    const renderComponents = () => {
        if (steps === 0) {
            return (
                <div className='my-5'>
                    <MFASetupPrompt stateChanger={setSteps} email={email} logoURL={logoURL} />
                </div >
            )
        }

        if (steps === 1) {
            return (
                <div className='my-5'>
                    <Setup stateChanger={setSteps} />
                </div>
            )
        }

        if (steps === 2) {
            return (
                <div className='my-5'>
                    <h3>Setup Complete!</h3>
                    <p>You have successfully setup MFA for your account.</p>
                </div>
            )
        }
    }

    return (
        <>
            {renderComponents()}
        </>
    );
};

export default MfaPage;
