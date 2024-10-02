import { useState } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import {Admin, Resource, ShowGuesser } from 'react-admin';
import { dataProvider } from './dataProvider.js';
import { UserList } from './users.tsx';
import { PostList } from "./posts.tsx";
import { Dashboard } from './Dashboard.tsx';
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

const AdminArea = () => {
  return (
    <Admin dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource name="posts" list={PostList}  icon={PostIcon} />
        <Resource name="users" list={UserList} show={ShowGuesser} icon={UserIcon} />
    </Admin>
  );
};

export default AdminArea;