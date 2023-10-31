import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from '../services/Account'

const MfaPage = () => {
  const navigate = useNavigate();
  const [userCode, setUserCode] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [image, setImage] = useState('')
  const { getSession, logout } = useContext(AccountContext) || {};

  useEffect(() => {
    if (getSession) {
      getSession().then(({ mfaEnabled }) => {
        setEnabled(mfaEnabled)
      })
    }
  }, [])

  const API = 'https://nu0bf8ktf0.execute-api.ap-southeast-1.amazonaws.com/dev/mfa'

  /**
   * The function `getQRCode` retrieves a QR code image by making a request to an API using an access
   * token obtained from a session.
   */
  const getQRCode = () => {
    if (getSession) {
      getSession().then(({ accessToken, headers }) => {
        if (typeof accessToken !== 'string') {
          accessToken = accessToken.jwtToken
        }

        const uri = `${API}?accessToken=${accessToken}`
        fetch(uri, {
          headers,
        })
          .then((data) => data.json())
          .then(setImage)
          .catch(console.error)
      }).catch(console.error);
    }
  }

  /**
   * The above function enables multi-factor authentication (MFA) for a user by making a POST request
   * to an API endpoint with the user's access token and user code.
   * @param {any} event - The `event` parameter is an object that represents the event that triggered
   * the function. It is typically an event object that is passed to an event handler function. In this
   * case, the function is an event handler for a form submission, so the `event` object would contain
   * information about the form submission
   */
  const enableMFA = (event: any) => {
    event.preventDefault()

    if (getSession) {
      getSession().then(({ user, accessToken, headers }) => {
        if (typeof accessToken !== 'string') {
          accessToken = accessToken.jwtToken
        }

        const uri = `${API}?accessToken=${accessToken}&userCode=${userCode}`

        /* Enable the MFA (TOTP) setting for the user */
        fetch(uri, {
          method: 'POST',
          headers,
        })
          .then((data) => data.json())
          .then((result) => {
            console.log(result)
            if (result.Status && result.Status === 'SUCCESS') {
              setEnabled(true) // Set state to enabled

              const settings = {
                PreferredMfa: true,
                Enabled: true,
              }

              user.setUserMfaPreference(null, settings, () => { }) // set the MFA Setting on Cognito to enabled and assign to TOTP Preferred

              // Logout user and navigate to login page
              if (logout) {
                logout();
                navigate('/');
              }
            } else {
              // Handle errors alert if the user enters the wrong code
              if (result.errorType === 'EnableSoftwareTokenMFAException') {
                alert('Incorrect 6-digit code!')
              } else if (result.errorType === 'InvalidParameterException') {
                alert('Please provide a 6-digit number')
              }
            }
          })
          .catch(console.error)
      })
    }
  }


  return <>
    <div>
      <h1>Multi-Factor Authentication</h1>

      {enabled ? (
        <div>
          <div>MFA is enabled</div>
        </div>
      ) : image ? (
        <div>
          <h3>Scan this QR code:</h3>
          <img src={image} />

          <form onSubmit={enableMFA}>
            <input
              value={userCode}
              onChange={(event) => setUserCode(event.target.value)}
              required
            />

            <button type="submit">Confirm Code</button>
          </form>
        </div>
      ) : (
        <button onClick={getQRCode}>Enable MFA</button>
      )}
    </div>

  </>;
};

export default MfaPage;
