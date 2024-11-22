import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import Lectures from './Lectures';
import AboutLectures from './AboutLectures';
import Register from './Register';
import Userpage from './UserPage';
import Login from './Login';
import Admin from '../Admin/AdminArea'
import Article from "../Components/Article"
import EnrollmentArea2 from './EnrollmentArea2';
import SubmiteTimeline from './SubmiteTimelineArea'
import { AuthContext } from '../Scripts/AuthContext';
import Organizer from '../Organizer/OrganizerArea'

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function RoutesComponet() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<PrivateRoute><ContactArea /></PrivateRoute>} />
      <Route path="/course" element={<PrivateRoute><Cursos /></PrivateRoute>} />
      <Route path="/enrollment" element={<EnrollmentArea />} />
      <Route path="/enrollment2" element={<PrivateRoute><EnrollmentArea2 /></PrivateRoute>} />
      <Route path="/timeline" element={<TimelineArea />} />
      <Route path="/speakers" element={<Speakers />} />
      <Route path="/aboutspeaker/:id" element={<AboutSpeaker />} />
      <Route path="/aboutscourses/:id" element={<AboutCourses />} />
      <Route path="/aboutslectures/:id" element={<AboutLectures />} />
      <Route path="/about/" element={<About />} />
      <Route path="/collaborators" element={<Collaborators />} />
      <Route path="/lectures" element={<PrivateRoute><Lectures /></PrivateRoute>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/submitetimeline" element={<SubmiteTimeline />} />
      <Route path="/user" element={<PrivateRoute><Userpage /></PrivateRoute>} />
      <Route path="/article" element={<Article/>} //depois adicionar o </PrivateRoute>
      />
      
      <Route path="/Organizer/*" element={<Organizer />} />

      <Route path="/admin/*" element={<Admin />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesComponet;
