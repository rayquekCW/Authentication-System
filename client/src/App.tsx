import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import PatientListPage from '../src/components/exampleComponent'; // example of a component
import LoginPage from './pages/loginPage';
import './App.css';
import '../src/styles/styles.scss';
import SetPassword from './pages/setPassword';
import ProfilePage from './pages/profilePage';
import MfaPage from './pages/mfaPage';
import HomePage from './pages/homePage';
import CustomerManagementLogin from './pages/CmLogin';
import CustomerManagementDashboard from './pages/CmDashboard';
import MultiFactAuth from './components/MultiFactAuth';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/password" element={<SetPassword />} />
					<Route path="/mfa" element={<MfaPage />} />
					<Route path="/choosemfa" element={<MultiFactAuth />} />
					<Route path="/home" element={<HomePage />} />
					<Route
						path="/cmlogin"
						element={<CustomerManagementLogin />}
					/>
					<Route
						path="/cmdashboard"
						element={<CustomerManagementDashboard />}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
