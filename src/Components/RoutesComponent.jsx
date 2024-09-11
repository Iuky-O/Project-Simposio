import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Removemos o "Router"
import Home from './Home';
import ContactArea from './ContactArea';
import Cursos from './CourseArea';
<<<<<<< HEAD
import EnrollmentArea from './EnrollmentArea';
=======
import Speakers from './Speakers';
>>>>>>> 2c1d478a78336e909260ec764bd2a37908cff70d

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactArea />} />
      <Route path="/course" element={<Cursos />} />
<<<<<<< HEAD
      <Route path="/enrollment" element={<EnrollmentArea/>} />
=======
      <Route path="/speakers" element={<Speakers />} />
>>>>>>> 2c1d478a78336e909260ec764bd2a37908cff70d
    </Routes>
  );
}

export default RoutesComponent;
