import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Scripts/AuthContext';
import Navbar from './Components/Navbar';
import RoutesComponent from './Components/RoutesComponet';
import Authenticator from './hook/Authenticator';
import AdminArea from './Admin/AdminArea'; // Importando o React Admin

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Authenticator>
          <Router>
            {/* Rotas Gerais */}
            <Routes>
              <Route path="/*" element={<><Navbar /><RoutesComponent /></>} />
            </Routes>

            {/* Isolando o React Admin */}
            <Routes>
              <Route path="/admin/*" element={<AdminArea />} />
            </Routes>
          </Router>
        </Authenticator>
      </AuthProvider>
    </div>
  );
}

export default App;