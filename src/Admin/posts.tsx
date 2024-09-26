import React from "react";
import { List, Datagrid, TextField, ReferenceField, TextInput, ReferenceInput } from "react-admin";

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];
export const PostList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <ReferenceField source="userId" reference="users" label="Usuários" />
            <TextField source="id" label="Id" />
            <TextField source="title" label="Título" />
            <TextField source="body" label="Texto" />
        </Datagrid>
    </List>
);