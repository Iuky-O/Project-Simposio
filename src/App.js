import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from "./Components/RoutesComponent"
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Admin from './Admin/AdminArea';
function App() {
  
  return ( 
    <Router>
      <div className="App">
      <Navbar />
      <RoutesComponent/>
      </div>
    </Router>
  );
}

export default App;