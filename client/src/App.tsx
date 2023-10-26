import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import PatientListPage from '../src/components/exampleComponent'; // example of a component
import LoginPage from './pages/LoginPage';
import './App.css';
import '../src/styles/styles.scss';
import SetPassword from './pages/SetPassword';
import ProfilePage from './pages/ProfilePage';
import MfaPage from './pages/MfaPage';
import HomePage from './pages/HomePage';
import CustomerManagementDashboard from './pages/CmDashboard';
import Enrollment from './pages/CmEnrollment';
import Logs from './pages/CmLogs';
import Orders from './pages/CmOrders';
import Pricing from './pages/CmPricing';
import Redirect from './pages/Redirect';
import { Account } from './services/Account';

const App = () => {
	return (
		<>
			<Account>
				<Router>
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/password" element={<SetPassword />} />
						<Route path="/mfa" element={<MfaPage />} />
						<Route path="/bank" element={<Redirect />} />
						<Route path="/home" element={<HomePage />} />
						{/*TODO: protect the routes from non admins and differentiate based on admin roles*/}
						<Route
							path="/cm-dashboard"
							element={<CustomerManagementDashboard />}
						/>
						<Route path="/cm-enrollment" element={<Enrollment />} />
						<Route path="/cm-logs" element={<Logs />} />
						<Route path="/cm-orders" element={<Orders />} />
						<Route path="/cm-pricing" element={<Pricing />} />
					</Routes>
				</Router>
			</Account>
		</>
	);
};

export default App;
