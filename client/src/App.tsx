import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import PatientListPage from '../src/components/exampleComponent'; // example of a component
import LoginPage from './pages/loginPage';
import './App.css';
import '../src/styles/styles.scss';
import SetPassword from './pages/setPassword';
import ProfilePage from './pages/profilePage';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					{/* example of a route with a parameter */}
					{/* <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} /> */}
					<Route path="/" element={<LoginPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/password" element={<SetPassword />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
