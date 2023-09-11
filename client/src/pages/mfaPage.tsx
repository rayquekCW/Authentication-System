import { useState } from "react";
import MFASetupPrompt from "../components/mfaSetupSteps/MFASetupPrompt";
import Setup from "../components/mfaSetupSteps/Setup";

type MfaPageProps = {
    requirePrompt: boolean;
    requireSetup: boolean;
};

const MfaPage = ({ requirePrompt }: MfaPageProps) => {

    const [requireSetup, setRequireSetup] = useState(false);


    return (
        <>
            <MFASetupPrompt requirePrompt={requirePrompt} email="" logoURL="" />
            <Setup />
        </>
    );
};

export default MfaPage;
