import { useState } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import {Admin, Resource, ShowGuesser } from 'react-admin';
//import jsonServerProvider from 'ra-data-json-server';
//import { dataProvider } from './Admin/dataProvider.js';
import { UserList } from './Admin/users.tsx';
import { PostList } from "./Admin/posts.tsx";
import { Dashboard } from './Admin/Dashboard.tsx';
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

//const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');


const AdminArea = () => {
  return (
    <Admin dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource name="posts" list={PostList}  icon={PostIcon} />
        <Resource name="users" list={UserList} show={ShowGuesser} icon={UserIcon} />
    </Admin>
  );
};

export default AdminArea;