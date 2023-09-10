import { useState } from "react";
import Otp from "./Otp";

const MultiFactAuth = () => {
  const [otpType, setOtpType] = useState(""); // email or phone
  const [typeSelected, setTypeSelected] = useState(false); // true if otpType is selected, false if not

  const handleOtpType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    if (id === "email") {
      setOtpType("email");
      setTypeSelected(true);
    }
    if (id === "phone") {
      setOtpType("phone");
      setTypeSelected(true);
    }
  };

  return (
    <div>
      {!typeSelected && (
        <>
          <h1 aria-label="OTP Verification">OTP Verification</h1>
          <p id="otp-text" className="my-3" aria-labelledby="otp-description">
            To secure your login identities, we will send you an OTP for
            verification.
          </p>
          <h5>
            <strong>Where would you like to receive it?</strong>
          </h5>
          <hr />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col text-center">
                <button
                  className="btn mfaBtn"
                  id="phone"
                  onClick={handleOtpType}
                  aria-label="Select phone as OTP type"
                >
                  +65 ***** 5432 {/* to be replaced with user's phone number */}
                </button>
              </div>
            </div>
            <div className="row justify-content-center mt-3">
              <div className="col text-center">
                <button
                  className="btn mfaBtn"
                  id="email"
                  onClick={handleOtpType}
                  aria-label="Select email as OTP type"
                >
                  x********@gmail.com {/* to be replaced with user's email */}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {typeSelected && <Otp otpType={otpType} />}
    </div>
  );
};

export default MultiFactAuth;
