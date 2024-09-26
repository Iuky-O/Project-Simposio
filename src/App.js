import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from "./Components/RoutesComponent"
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import {Admin, Resource, ShowGuesser } from 'react-admin';
//import jsonServerProvider from 'ra-data-json-server';
//import { dataProvider } from './Admin/dataProvider.js';
import { UserList } from './Admin/users.tsx';
import { PostList } from "./Admin/posts.tsx";
import { Dashboard } from './Admin/Dashboard.tsx';
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

//const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

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

/*

      <Admin dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource name="posts" list={PostList}  icon={PostIcon} />
        <Resource name="users" list={UserList} show={ShowGuesser} icon={UserIcon} />
      </Admin>
*/