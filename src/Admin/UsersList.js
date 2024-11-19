import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';

const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" label="Nome" />
      <EmailField source="email" label="E-mail" />
      <TextField source="role" label="Função" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default UserList;
