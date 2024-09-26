import { useMediaQuery, Theme } from "@mui/material";
import React from "react";
import { List, SimpleList, Datagrid, TextField, EmailField, TextInput, ReferenceInput } from "react-admin";

const userFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];

export const UserList = () => {
    // eslint-disable-next-line no-mixed-operators
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <List filters={userFilters}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" label="Id" />
                    <TextField source="name" label="Nome" />
                    <TextField source="username" label="Sobrenome" />
                    <TextField source="company.bs" label="Nome Social" />
                    <TextField source="company.catchPhrase" label="Sexo" />
                    <TextField source="company.name" label="Instituição" />
                    <TextField source="website" label="Função" />
                    <TextField source="company.bs" label="Escolaridade" /> 
                    <EmailField source="email" label="Email" />
                    <TextField source="address.street" label="Endereço" />
                    <TextField source="phone" label="Telefone" />
                </Datagrid>
            )}
        </List>
    );
};