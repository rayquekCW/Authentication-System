import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { AccountContext } from "./services/Account";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
	const [cookie] = useCookies();
	const { getSession } = useContext(AccountContext) || {};
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true); // To track loading state

	useEffect(() => {
		async function checkAuthentication() {
			if (getSession) {
				try {
					const sessionData = await getSession();
					console.log(sessionData);
					// eslint-disable-next-line no-unused-vars
					const accessToken = sessionData.accessToken.jwtToken;
					console.log(accessToken);
					setIsAuthenticated(true);
				} catch (error) {
					if (cookie.userData) {
						setIsAuthenticated(true);
					} else {
						setIsAuthenticated(false);
					}
				} finally {
					setLoading(false); // Set loading to false once done
				}
			}
		}
		checkAuthentication();
	}, [getSession, cookie]);

	if (loading) return null; // Or return a loader/spinner
	return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
