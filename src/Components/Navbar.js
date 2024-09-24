import React from "react";
import Logo from "../Assets/Logo.svg";
import NavBarStyles from "../Styles/NavBarStyles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2";
import {
    Box,
    Drawer,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import TodayIcon from '@mui/icons-material/Today';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import Groups3Icon from '@mui/icons-material/Groups3';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { SiCodenewbie } from "react-icons/si";


const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate(); // Hook para navegação

    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon />,
            path: "/"
        },
        {
            text: "Sobre",
            icon: <InfoIcon />,
            path: "/about"
        },
        {
            text: "Inscrições",
            icon: <PersonAddIcon />,
            path: "/registrations"
        },
        {
            text: "Contato",
            icon: <PhoneRoundedIcon />,
            path: "/contact"
        },
        {
            text: "Cronograma",
            icon: <TodayIcon />,
            path: "/schedule"
        },
        {
            text: "Colaboradores",
            icon: <Groups3Icon />,
            path: "/collaborators"
        },
        {
            text: "Palestrantes",
            icon: <SpatialAudioOffIcon />,
            path: "/speakers"
        },
        {
            text: "Palestras",
            icon: <HomeIcon />,
            path: "/lectures"
        },
        {
            text: "Cursos",
            icon: <HomeIcon />,
            path: "/course"
        },
    ];

    const handleNavigation = (path) => {
        setOpenMenu(false);
        navigate(path);
    };

    return (
        <nav className="header">
            <div className="nav-logo-container">
                <Link to="/" className="logo">
                    <SiCodenewbie />
                </Link>
            </div>
            <div className="navbar-links-container">
                <Link to="/">Home</Link>
                <Link to="/about">Sobre</Link>
                <Link to="/enrollment">Inscrições</Link>
                <Link to="/contact">Contato</Link>
                <Link to="/timeline">Cronograma</Link>
                <Link to="/collaborators">Colaboradores</Link>
                <Link to="/speakers">Palestrantes</Link>
                <Link to="/lectures">Palestras</Link>
                <Link to="/course">Cursos</Link>
            </div>
            <div className="navbar-menu-container">
                <HiOutlineBars3 className="haburguer" onClick={() => setOpenMenu(true)} />
            </div>

            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={() => handleNavigation(item.path)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </nav>
        
    );
};

export default Navbar;
