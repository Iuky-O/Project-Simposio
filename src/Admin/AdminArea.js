import React from 'react';
import { Admin, Resource, EditGuesser } from 'react-admin';
import { dataProvider } from './dataProvider';
import UserList from './UsersList'; 
import { Dashboard } from './Dashboard';
import UserIcon from '@mui/icons-material/Group';
import customTheme from './CustomTheme';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '../Scripts/AuthContext';

const AdminArea = () => (
  <ThemeProvider theme={customTheme}>
    <Admin basename="/admin" dataProvider={dataProvider} dashboard={Dashboard} theme={customTheme}>
      <Resource name="users" list={UserList} edit={EditGuesser} icon={UserIcon} />
    </Admin>
  </ThemeProvider>
);

export default AdminArea;
