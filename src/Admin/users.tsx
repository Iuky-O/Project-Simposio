import { useMediaQuery, Theme } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    EmailField,
    TextInput,
    ReferenceInput,
    useNotify,
    useDataProvider,
} from "react-admin";

// Definindo a interface para o usuário
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
    };
    company: {
        name: string;
        bs: string;
        catchPhrase: string;
    };
}

// Definindo os filtros
const userFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const [users, setUsers] = useState<User[]>([]); // Especificando o tipo de estado como User[]
    const notify = useNotify();
    const dataProvider = useDataProvider();

    // Função para buscar os dados da API
    const fetchUsers = async () => {
        try {
            const response = await dataProvider.getList('users', {
                pagination: { page: 1, perPage: 10 },
                sort: { field: 'id', order: 'ASC' },
                filter: {},
            });
            setUsers(response.data); // Agora isso deve funcionar corretamente
        } catch (error) {
            notify("Erro ao buscar usuários", { type: "warning" });
            console.error("Erro ao buscar usuários:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
                    <TextField source="company.name" label="Instituição" />
                    <TextField source="website" label="Função" />
                    <TextField source="company.bs" label="Escolaridade" />
                    <EmailField source="email" label="Email" />
                    <TextField source="address.street" label="Endereço" />
                    <TextField source="phone" label="Telefone" />
                </Datagrid>
            )}
        </List>
    );
};
