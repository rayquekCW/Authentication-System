import { FormHelperText, Input, InputLabel, Button, FormControl } from '@mui/material';
import '../../styles/_variable.scss';
import { useState } from 'react';


type Setup = {
    requireSetup: boolean;
    stateChanger: (value: number) => void;
}

const Setup = ({ stateChanger }: any) => {

    const [requestOTP, setRequestOTP] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    /**
     * The function `handlePhoneNumberChange` is used to update the `phoneNumber` state based on the value
     * of an input field, validate if the input is a valid phone number
     */
    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    /**
     * The function `handleVerificationCodeChange` is used to update the state variable `verificationCode`
     * with the value of the input element.
     */
    const handleVerificationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(event.target.value);
    };

    // TODO: add a function to request OTP from the backend
    const getOTP = () => {
        setRequestOTP(true)
        console.log('getOTP');
    }

    // TODO: add a function to process and check the OTP with the backend
    const verifyOTP = () => {
        console.log('verifyOTP');

        // TODO: if the OTP is correct, change the state to 2
        stateChanger(2);
    }

    /* The `renderRequestOTP` function is a helper function that determines which component to render based
    on the value of the `requestOTP` state variable. */
    const renderRequestOTP = () => {
        if (requestOTP) {
            return (
                <div className='my-5'>
                    <h3>Step 2: Enter your verification code from your mobile phone</h3>
                    <p>Enter the verification code displayed on your phone</p>
                    <FormControl>
                        <InputLabel htmlFor="verificationCode">Verification Code</InputLabel>
                        <Input type="text" onChange={handleVerificationCodeChange} id="verificationCode" aria-describedby="my-helper-text" value={verificationCode} />
                    </FormControl>
                    <Button className='ms-3' color='primary' onClick={verifyOTP}  >Verify</Button>

                </div >
            )
        }
        else {
            return (
                <div className='my-5'>
                    <h3>Step 1: How should we contact you?</h3>
                    <p>Choose a phone number to receive your verification code</p>
                    <FormControl>
                        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                        <Input type="text" onChange={handlePhoneNumberChange} id="phoneNumber" aria-describedby="my-helper-text" value={phoneNumber} />
                        <FormHelperText id="my-helper-text">We'll never share your Phone Number.</FormHelperText>
                    </FormControl>
                    <Button className='ms-3' color='primary' onClick={getOTP}  >Request OTP</Button>
                </div>
            )
        }
    }

    return (
        <>
            <div className="container text-start border" style={{
                backgroundColor: 'white',
            }}>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col mx-2 my-2 py-5">

                        <h1>Additional security verification</h1>
                        <p>Secure your account by adding phone verification to your password</p>
                        {renderRequestOTP()}

                    </div>

                    <div className="col-md-1"></div>
                </div>
            </div >
        </>
    );
};


export default Setup;
