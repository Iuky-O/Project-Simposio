import React from 'react';
import './Styles/App.css';
import Home from './Components/Home';
import CourseArea from './Components/CourseArea';
import ContactArea from './Components/ContactArea';

function App() {
  return (
    <div className="App">
      <Home />
      <ContactArea />
    </div>
  );
}

export default App;
