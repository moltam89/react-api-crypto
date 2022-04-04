import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Table from  './Table';
import RechartsDemo from  './RechartsDemo';

function App() {


  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Table/>}/>
          <Route path="/test" element={<RechartsDemo/>}/>
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
  