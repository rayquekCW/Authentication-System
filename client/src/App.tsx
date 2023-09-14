import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import PatientListPage from '../src/components/exampleComponent'; // example of a component
import LoginPage from './pages/loginPage';
import './App.css';
import '../src/styles/styles.scss';
import SetPassword from './pages/setPassword';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					{/* example of a route with a parameter */}
					{/* <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} /> */}
					<Route path="/" element={<LoginPage />} />
					<Route path="/password" element={<SetPassword />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
