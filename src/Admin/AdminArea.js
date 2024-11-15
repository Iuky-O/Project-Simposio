import React from 'react';
import { Admin, Resource, ShowGuesser } from 'react-admin';
import { dataProvider } from './dataProvider';
import UserList from './users'; 
import { Dashboard } from './Dashboard.tsx';
import UserIcon from '@mui/icons-material/Group';
import customTheme from './CustomTheme.js';
import { ThemeProvider } from '@mui/material/styles';

const AdminArea = () => (
  <ThemeProvider theme={customTheme}>
    <Admin dataProvider={dataProvider} dashboard={Dashboard} theme={customTheme}>
      <Resource name="users" list={UserList} show={ShowGuesser} icon={UserIcon} />
    </Admin>
  </ThemeProvider>
);

export default AdminArea;
