import { useState, SyntheticEvent } from "react";
import NavBar from "../components/NavBar";
import Otp from "../components/Otp.tsx";
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';


const ProfilePage = () => {
  const [showMfaPopup, setShowMfaPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [mfaCode, setMfaCode] = useState("");

  const handleMfaSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Add logic to verify the 6-digit MFA code
    // If successful, proceed with account deletion
    // Otherwise, show an error message

    setShowMfaPopup(false);
  };

  const handleConfirmButtonClick = () => {
    setShowMfaPopup(true);
  }

  const handleDeleteButtonClick = () => {
    setShowConfirmPopup(true);
  }

  const closePopup = () => {
    setShowMfaPopup(false);
    setShowConfirmPopup(false);
  }

  const handleLogout = () => { }


  return (
    <>
      <NavBar />
      <div className="container bg-light shadow-sm mt-4 p-4">
        <div className="row p-3">
          <div className="col-md-4 col-12">
            <h2>Profile</h2>
          </div>
          <div className="col-md-8 col-12 d-flex justify-content-end">
            <div className="col-3 text-end">
              <button className="defaultBtn" style={{ width: 'auto' }} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
        <table className="table table-bordered h-50 text-center">
          <tr>
            <th className="text-start p-3">Full Name</th>
            <td className="text-start p-3">Dennis</td>
            <td className="text-start p-3">Dennis</td>
          </tr>
          <tr>
            <th className="text-start p-3">ID</th>
            <td className="text-start p-3">9392020</td>

            <td className="text-start p-3">9392020</td>

          </tr>
          <tr>
            <th className="text-start p-3">Email</th>
            <td className="text-start p-3">user@gmail.com</td>

            <td className="text-start p-3">user@gmail.com</td>

          </tr>
          <tr>
            <th className="text-start p-3">Phone Number</th>
            <td className="text-start p-3">839292849</td>

            <td className="text-start p-3">839292849</td>

          </tr>
          <tr>
            <th className="text-start p-3">Birth Date</th>
            <td className="text-start p-3">20-0-2000</td>

            <td className="text-start p-3">20-0-2000</td>

          </tr>
        </table>
        <div className="row justify-content-end">
          <div className="col-12 col-lg-4 text-md-end">
            <Link to="/password">
              <button className="defaultBtn me-3" style={{ width: 'auto' }}>
                Change Password
              </button>
            </Link>
            <button className="cancelBtn me-3" onClick={handleDeleteButtonClick} style={{ width: 'auto' }}>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <div className="container bg-light shadow-sm mt-4 p-4 mb-4">
        <div className="row p-3">
          <div className="col-md-4 col-12 text-start">
            <h3>MFA Verification</h3>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-md-4 col-12">
            <div className="form-check text-start">
              <input className="form-check-input" type="radio" id="mfaBiometrics" name="mfaOption" />
              <label className="form-check-label">
                Phone Number
              </label>
            </div>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-md-4 col-12">
            <div className="form-check text-start">
              <input className="form-check-input" type="radio" id="mfaBiometrics" name="mfaOption" />
              <label className="form-check-label">
                Email
              </label>
            </div>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-md-4 col-12 pr-4">
            <div className="form-check text-start">
              <input className="form-check-input" type="radio" id="mfaBiometrics" name="mfaOption" />
              <label className="form-check-label">
                Biometrics
              </label>
            </div>
          </div>
        </div>
      </div>
      {showConfirmPopup && (
        <div className="popup d-flex justify-content-center align-items-center">
          <div className="popup-content text-center">
            <h1>Delete Account</h1>
            <h6>Are you sure you want to delete your Account?</h6>
            <button className="defaultBtn me-2" style={{ width: 'auto' }} onClick={handleConfirmButtonClick}>
              Yes
            </button>
            <button className="cancelBtn" style={{ width: 'auto' }} onClick={closePopup}>
              No
            </button>
          </div>
        </div>
      )}

      {showMfaPopup && (
        <div className="popup">
          <div className="col-3">
            <button className="cancelBtn" onClick={closePopup}>
              <AiOutlineClose />
            </button>
          </div>
          <div className="popup-content">
            <div className='my-5'>
              <Otp otpType={"email"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
