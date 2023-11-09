import {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import "../src/styles/styles.scss";
import SetPassword from "./pages/SetPassword";
import ProfilePage from "./pages/ProfilePage";
import MfaPage from "./pages/MfaPage";
import HomePage from "./pages/HomePage";
import CustomerManagementDashboard from "./pages/admin/CmDashboard";
import Enrollment from "./pages/admin/CmEnrollment";
import Logs from "./pages/admin/CmLogs";
import Orders from "./pages/admin/CmOrders";
import Pricing from "./pages/admin/CmPricing";
import CmProfile from "./pages/admin/CmProfile";
import { Account } from "./services/Account";
import { CookiesProvider } from "react-cookie";
import ProtectedRoute from "./ProtectedRoute";
const bankName = import.meta.env.VITE_BANK_NAME;
const bankConfig = await import(`../config/${bankName}.json`);

const App = () => {
	useEffect(() => {
			// Generate CSS custom properties dynamically from brandColors data
			const root = document.documentElement;
			Object.entries(bankConfig.brandColors).forEach(([name, value]) => {
				return root.style.setProperty(`--${name}`, value as string);
			});
		}
	);
	return (
		<>
			<CookiesProvider>
				<Router>
					<Account>
						<Routes>
							<Route path="/" element={<LoginPage />} />
							<Route path="/password" element={<SetPassword />} />
							<Route path="/mfa" element={<MfaPage />} />
							<Route path="/profile" element={<ProfilePage />} />
							<Route element={<ProtectedRoute />}>
								<Route path="/home" element={<HomePage />} />

								{/* TODO - protect the routes from non admins and differentiate based on admin roles*/}
								<Route
									path="/cm-dashboard"
									element={<CustomerManagementDashboard />}
								/>
								<Route
									path="/cm-enrollment"
									element={<Enrollment />}
								/>
								<Route path="/cm-logs" element={<Logs />} />
								<Route path="/cm-orders" element={<Orders />} />
								<Route
									path="/cm-pricing"
									element={<Pricing />}
								/>
								<Route
									path="/cm-profile"
									element={<CmProfile />}
								/>
							</Route>
						</Routes>
					</Account>
				</Router>
			</CookiesProvider>
		</>
	);
};

export default App;
