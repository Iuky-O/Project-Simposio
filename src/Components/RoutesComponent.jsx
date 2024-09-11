import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Removemos o "Router"
import Home from './Home';
import ContactArea from './ContactArea';
import Cursos from './CourseArea';
import Speakers from './Speakers';
import AboutSpeaker from './AboutSpeaker'

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactArea />} />
      <Route path="/course" element={<Cursos />} />
      <Route path="/speakers" element={<Speakers />} />
      <Route path="/aboutspeaker/:id" element={<AboutSpeaker />} /> 
    </Routes>
  );
}

export default RoutesComponent;
