import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Table from  './Table';

function App() {


  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Table/>}/>
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
  