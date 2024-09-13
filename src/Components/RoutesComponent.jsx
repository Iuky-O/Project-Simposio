import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Removemos o "Router"
import Home from './Home';
import ContactArea from './ContactArea';
import Cursos from './CourseArea';
import EnrollmentArea from './EnrollmentArea';
import Speakers from './Speakers';
import AboutSpeaker from './AboutSpeaker';
import AboutCourses from './AboutCourses';
import TimelineArea from './TimelineArea';
import About from './About';
import Collaborators from './Collaborators';

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactArea />} />
      <Route path="/course" element={<Cursos />} />
      <Route path="/enrollment" element={<EnrollmentArea />} />
      <Route path="/timeline" element={<TimelineArea />} />
      <Route path="/speakers" element={<Speakers />} />
      <Route path="/aboutspeaker/:id" element={<AboutSpeaker />} /> 
      <Route path="/aboutscourses/:id" element={<AboutCourses />} /> 
      <Route path="/about/" element={<About />} />
      <Route path="/collaborators" element={<Collaborators />} /> 
    </Routes>
  );
}

export default RoutesComponent;
