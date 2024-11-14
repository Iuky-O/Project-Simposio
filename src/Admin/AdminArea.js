import React from 'react';
import { Admin, Resource, ShowGuesser } from 'react-admin';
import DataProvider from './dataProvider';
import UserList from './users'; 
import { Dashboard } from './Dashboard.tsx';
import UserIcon from '@mui/icons-material/Group';

const AdminArea = () => (
  <Admin dataProvider={DataProvider} dashboard={Dashboard}>
    <Resource name="users" list={UserList} show={ShowGuesser} icon={UserIcon} />
  </Admin>
);

export default AdminArea;
