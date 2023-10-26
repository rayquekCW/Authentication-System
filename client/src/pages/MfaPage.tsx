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

  const enableMFA = (event: any) => {
    event.preventDefault()

    console.log('USER CODE:', userCode)
    if (getSession) {
      getSession().then(({ user, accessToken, headers }) => {
        if (typeof accessToken !== 'string') {
          accessToken = accessToken.jwtToken
        }

        const uri = `${API}?accessToken=${accessToken}&userCode=${userCode}`
        console.log(headers)
        console.log(accessToken)
        fetch(uri, {
          method: 'POST',
          headers,
        })
          .then((data) => data.json())
          .then((result) => {
            console.log(result)
            if (result.Status && result.Status === 'SUCCESS') {
              setEnabled(true)
              console.log("entered")
              const settings = {
                PreferredMfa: true,
                Enabled: true,
              }

              user.setUserMfaPreference(null, settings, () => { })

              if (logout) {
                logout();
                navigate('/');
              }


            } else {
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
