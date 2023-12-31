import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./Home";
import EmployeeProof from "./components/EmployeeProof";
import EmployeeInfo from "./components/EmployeeInfo";
function App() {
  return (
    <div className="App">
      {/* <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/EmployeeProofs/:id" element={<EmployeeProof />} />
        </Routes>
      </Router> */}
      <EmployeeInfo />
    </div>
  );
}

export default App;
