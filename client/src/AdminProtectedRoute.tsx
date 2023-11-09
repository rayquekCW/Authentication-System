import {useState, useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';
import {AccountContext} from './services/Account';
import {Navigate, Outlet} from 'react-router-dom';

function AdminProtectedRoute() {
	const [cookie] = useCookies();
	const {getSession} = useContext(AccountContext) || {};
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(true); // To track loading state

	useEffect(() => {
		async function checkAdmin() {
			if (getSession) {
				try {
					getSession().then(async (sessionData) => {
						console.log(sessionData['custom:role']);
						setIsAdmin(
							sessionData['custom:role'] === 'admin' ||
								sessionData['custom:role'] === 'super_admin'
						);
					});
				} catch (error) {
					if (cookie['userData']) {
						setIsAdmin(false);
					}
				} finally {
					setLoading(false);
				}
			}
		}
		checkAdmin();
	}, [getSession, cookie]);

	if (loading) return null;
	return isAdmin ? <Outlet /> : <Navigate to="/home" />;
}

export default AdminProtectedRoute;
