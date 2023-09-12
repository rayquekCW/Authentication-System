import { useState, SyntheticEvent } from 'react';
import NavBar from '../components/NavBar';

const ProfilePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMfaPopup, setShowMfaPopup] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");

  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Add password change logic here
    // Make sure to validate oldPassword, newPassword, and confirmNewPassword

    // After successful password change, close the popup
    handlePopupClose();
  };
  const handleMfaSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Add logic to verify the 6-digit MFA code
    // If successful, proceed with account deletion
    // Otherwise, show an error message

    setShowMfaPopup(false);
  };

  const handleDeleteButtonClick = () => {
    setShowMfaPopup(true);
  };

  return (
    <>
      <style>
        {`
          .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            background-color: #f8f9fa; /* Set to table bg color */
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
            border-radius: 10px;
            max-width: 400px;
          }

          .popup-content {
            text-align: center;
          }

          .popup-content h2 {
            margin-bottom: 20px;
          }

          .popup-content button {
            margin-top: 10px;
          }
        `}
      </style>
      <NavBar />
      <div className="container bg-light shadow-sm mt-4 p-4">
        <div className="row p-3">
          <div className="col-md-4 col-12 text-start">
            <h2>Profile</h2>
          </div>
        </div>
        <table className="table table-bordered h-50 text-center">
          <tr>
            <th className="text-start p-3">Full Name</th>
            <td></td>
          </tr>
          <tr>
            <th className="text-start p-3">ID</th>
            <td></td>
          </tr>
          <tr>
            <th className="text-start p-3">Email</th>
            <td></td>
          </tr>
          <tr>
            <th className="text-start p-3">Phone Number</th>
            <td></td>
          </tr>
          <tr>
            <th className="text-start p-3">Birth Date</th>
            <td></td>
          </tr>
        </table>
        <div className="col pt-md-0 text-md-end text-start">
          <button className="btn mt-md-0 mt-3 btn-primary mx-2 primary" onClick={handlePopupOpen}>
            Change Password
          </button>
          <button className="btn mt-md-0  mt-3 btn-danger mr-2" onClick={handleDeleteButtonClick} >Delete Account</button>
        </div>
      </div>

      <div className="container bg-light shadow-sm mt-4 p-4">
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

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary m-1">Submit</button>
              <button type="button" className="btn btn-secondary m-1" onClick={handlePopupClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {showMfaPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>MFA Verification</h2>
            <form onSubmit={handleMfaSubmit}>
              <div className="mb-3">
                <label htmlFor="mfaCode" className="form-label">Enter 6-digit code</label>
                <input
                  type="text"
                  className="form-control"
                  id="mfaCode"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  pattern="\d{6}"
                  maxLength={6}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary m-1">Submit</button>
              <button type="button" className="btn btn-secondary m-1" onClick={() => setShowMfaPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
