import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faMobileScreen,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import Notifications from "./Notifications";
import UserPool from "../services/UserPool";
import { CognitoUser } from "amazon-cognito-identity-js";

type OtpProps = {
  otpType: string; // email or phone
  email: string;
  password: string;
};

const OtpPassword = ({ otpType, email, password }: OtpProps) => {
  const isEmail = otpType === "email" ? true : false; // check if OTP is sent to email or phone

  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6 digit OTP
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null)); // to store references to the 6 input fields
  const [time, setTime] = useState(300); // 5 minutes timer
  const [msg, setMsg] = useState(""); // message to be displayed
  const [error, setError] = useState(false); // true if error, false if not
  const [maskedEmail, setMaskedEmail] = useState(""); // masked email to be displayed

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool: UserPool,
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout; // to store the timer

    // if time is greater than 0, decrement time by 1 every second
    if (time > 0) {
      timer = setTimeout(() => setTime(time - 1), 1000);
    }

    // Mask the email
    const splitEmail = email.split("@");
    const maskedEmail = splitEmail[0].slice(0, 1) + "******@" + splitEmail[1];
    setMaskedEmail(maskedEmail);

    return () => clearTimeout(timer); // clear the timer and update the masked email when the component unmounts
  }, [time, email]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const navigate = useNavigate();

  // handle input change of OTP
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // check if value is a number and length of value is 1 (1 digit per input field)
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      // copy all the current OTP values into a new array
      const updatedOtp = [...otp];

      // update the OTP value at the given index with the new value
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // if value is not empty and the index is less than 5 and the next input field exists, focus on the next input field
      if (value !== "" && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
        // if value is empty and the index is greater than 0 and the previous input field exists, focus on the previous input field
      } else if (value === "" && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleLogin = () => {
    // if time is less than or equal to 0, set message to "OTP is invalid" and set error to true
    if (time <= 0) {
      setMsg("OTP is invalid");
      setError(true);
    }
    // if otp contains any empty string, set message to "OTP is invalid" and set error to true
    if (otp.includes("")) {
      setMsg("OTP is invalid");
      setError(true);
    }
    // TODO: check if OTP is valid
    console.log(password);
    console.log(email);
    const otpJoined = otp.join("");
    if (otpJoined.length === 6) {
      getUser().confirmPassword(otpJoined, password, {
        onSuccess: (data) => {
          console.log("onSuccess:", data);
          navigate("/mfa");
        },
        onFailure: (err) => {
          console.error("onFailure:", err);
          setMsg("OTP is invalid");
          setError(true);
        },
      });
    }
  };

  return (
    <div>
      <h1 aria-label="OTP Verification">OTP Verification</h1>
      {isEmail && (
        <>
          <FontAwesomeIcon
            icon={faEnvelopeOpenText}
            size="3x"
            fade
            aria-label="Envelope Icon"
          />
          <p id="otp-text" className="my-3">
            A one-time password has been sent to {maskedEmail}.
            {/* to be replaced with user's email */}
          </p>
        </>
      )}
      {!isEmail && (
        <>
          <FontAwesomeIcon
            icon={faMobileScreen}
            size="3x"
            fade
            aria-label="Mobile Screen Icon"
          />
          <p id="otp-text" className="my-3">
            A one-time password has been sent to +65 **** 5432.{" "}
            {/* to be replaced with user's phone number */}
          </p>
        </>
      )}
      <div className="container text-center">
        <div className="mx-auto" style={{ maxWidth: "400px" }}>
          {otp.map((value, index) => (
            <div
              key={index}
              style={{
                display: "inline-block",
                marginRight: "10px",
                marginBottom: "10px",
              }}
            >
              <input
                type="text"
                className="form-control text-center"
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                maxLength={1}
                style={{
                  height: "50px",
                  width: "40px",
                  borderBottom: "1px solid #000",
                }}
                ref={(input) => (inputRefs.current[index] = input)}
                aria-label={`Digit ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <p id="otp-text" className="my-3" aria-labelledby="email-description">
          OTP is only valid for {formatTime(time)} seconds.
        </p>
        <p id="otp-text" className="my-3">
          Did not receive the OTP?{" "}
          <a href="#" aria-label="Resend OTP">
            Resend OTP
          </a>
        </p>
        <button
          className="btn defaultBtn"
          id="login"
          onClick={() => {
            handleLogin();
          }}
          aria-label="Login"
        >
          <span className="btn-text">Verify</span>
        </button>
      </div>
      <div className="container text-center">
        {msg && <Notifications message={msg} isError={error} />}
      </div>
    </div>
  );
};

export default OtpPassword;
