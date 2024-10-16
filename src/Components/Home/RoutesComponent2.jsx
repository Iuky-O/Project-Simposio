import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './HomePaticipante';
import ContactArea from '../ContactArea';
import Cursos from '../CourseArea';
import EnrollmentArea from './EnrollmentArea2';
import Speakers from '../Speakers';
import AboutSpeaker from '../AboutSpeaker';
import AboutCourses from '../AboutCourses';
import TimelineArea from '../TimelineArea';
import About from '../About';
import Collaborators from '../Collaborators';
import Lectures from '../Lectures';
import AboutLectures from '../AboutLectures';
import UserPage from '../UserPages/UserPage'
import Home2 from './HomePaticipante'

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
      <Route path="/aboutslectures/:id" element={<AboutLectures />} />
      <Route path="/about/" element={<About />} />
      <Route path="/collaborators" element={<Collaborators />} />
      <Route path="/lectures" element={<Lectures />} />
      <Route path="/userpage" element={<UserPage />} />
      <Route path="/home2" element={<Home2 />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesComponent;
