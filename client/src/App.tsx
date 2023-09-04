import {useState} from 'react';
// eslint-disable-next-line
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import PatientListPage from '../src/components/exampleComponent'; // example of a component
import './App.css';
import '../src/styles/styles.scss';
// eslint-disable-next-line
import * as bootstrap from 'bootstrap';

const App = () => {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React + Bootstrap + Sass</h1>
			<div className="card">
				<button className="btn btn-primary" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
			<Router>
				<Routes>
					{/* example of a route with a parameter */}
					{/* <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} /> */}
				</Routes>
			</Router>
		</>
	);
};

export default App;
