import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Components/Login';
import Navbar1 from './Components/Navbar';
import Navbar2 from './Components/Home/Navbar2';
import RoutesComponent1 from './Components/RoutesComponent';
import RoutesComponent2 from './Components/Home/RoutesComponent2';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Controle de autenticação

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Login setIsAuthenticated={setIsAuthenticated} /> 
          <Navbar2 />   {/* Navbar para usuários autenticados */}
          <RoutesComponent2 />  {/* Rotas para usuários autenticados */}
        </>
      ) : (
        <>
          <Navbar1 />   {/* Navbar para usuários não autenticados */}
          <RoutesComponent1 />  {/* Rotas para usuários não autenticados */}
  
        </>
      )}
    </Router>
  );
}

export default App;
