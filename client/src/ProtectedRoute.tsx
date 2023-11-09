import {Navigate, Outlet} from 'react-router-dom';

function ProtectedRoute() {
	return sessionStorage.getItem('access_token') ? (
		<Outlet />
	) : (
		<Navigate to="/" />
	);
}

export default ProtectedRoute;
