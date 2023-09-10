import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import PatientListPage from '../src/components/exampleComponent'; // example of a component
import HomePage from "./pages/homePage";
import ComponentTest from "./pages/componentTest";
import "./App.css";
import "../src/styles/styles.scss";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* example of a route with a parameter */}
          {/* <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/componentTest" element={<ComponentTest />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
