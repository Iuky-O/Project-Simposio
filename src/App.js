import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthProvider}  from "./Scripts/AuthContext";
import Navbar from './Components/Navbar';
import RoutesComponent from './Components/RoutesComponet'; 
import Authenticator from './hook/Authenticator';
import Submite from './Components/SubmiteTimelineArea';

function App() {
  return (
    <div className="App">
     <AuthProvider>
        <Authenticator>
          <Router>
            <Navbar />
            <RoutesComponent />
          </Router>
        </Authenticator>
      </AuthProvider>
    </div>
  );
}

export default App;
/*
 <Router>
    <Submite/>
  </Router>
*/