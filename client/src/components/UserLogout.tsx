import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../services/Account';
import { useContext, useState } from 'react';
import Pool from '../services/UserPool';
import { jwtDecode } from "jwt-decode";
import { CognitoRefreshToken } from 'amazon-cognito-identity-js';


const UserLogoutPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { logout } = useContext(AccountContext) || {};
    const navigate = useNavigate()
    const user = Pool.getCurrentUser();
    const popupTimout = 120000
    const accessToken = sessionStorage.getItem("access_token")
    const RefreshToken = sessionStorage.getItem("refresh_token")


    function scheduleTokenExpiryCheck(): void {
        if (accessToken) {
            const payload = jwtDecode(accessToken)

            const exp = payload.exp ? payload.exp * 1000 : Date.now() + 300
            const timeToExpiry = exp - Date.now();

            if (!RefreshToken) {
                if (timeToExpiry <= 0) {
                    handleLogout("Token has expired")
                } else {
                    setTimeout(() => {
                        handleLogout("Token has expired")
                    }, timeToExpiry)
                }
                return
            }

            if (timeToExpiry <= 0) {
                if (!showPopup) setShowPopup(true)
                setTimeout(() => {
                    if (!showPopup) return;
                    handleLogout('Token has expired');
                }, popupTimout)
                return;
            }

            setTimeout(() => {
                setShowPopup(true)

                setTimeout(() => {
                    if (!showPopup) return;
                    handleLogout('Token has expired');
                }, popupTimout)

            }, timeToExpiry);
        } else {
            handleLogout("No token found")
        }
    }

    function handleLogout(_e: any) {
        console.log(_e);
        if (logout) logout();
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    function refreshUser(_e: any) {
        if (user && RefreshToken) {
            const token = new CognitoRefreshToken({RefreshToken});

            user.refreshSession(token, (err, _session) => {
                if (err) {
                    console.log(err);
                    handleLogout("Error refreshing session")
                } else {
                    console.log("Session refreshed");
                    setShowPopup(false)
                }
            });
            
            // scheduleTokenExpiryCheck()
        }
    }

    scheduleTokenExpiryCheck()

    return (
        showPopup ?
            <>
                <div
                    className={`overlay active`}
                ></div>
                {
                    true && (
                        <div className="popup d-flex justify-content-center align-items-center">
                            <div className="popup-content text-center">
                                <h1>Hello, are you still there?</h1>
                                <h6>Click yes to remain logged in!</h6>
                                <button
                                    className="defaultBtn me-2"
                                    style={{ width: 'auto' }}
                                    onClick={refreshUser}
                                >
                                    Yes
                                </button>
                                <button
                                    className="cancelBtn"
                                    style={{ width: 'auto' }}
                                    onClick={handleLogout}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )
                }
            </>
            : <></>
    );
};

export default UserLogoutPopup;