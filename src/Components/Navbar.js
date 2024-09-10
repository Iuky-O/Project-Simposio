import React from "react";
import Logo from "../Assets/Logo.svg";
import NavBarStyles from "../Styles/NavBarStyles.css"
import { useState} from "react";
import { Link } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2";
import {
    Box, 
    Drawer, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText} 
from "@mui/material" 
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import CommentRoundedIcon from "@mui/icons-material/CommentRounded"
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded"
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded"
import { SiCodenewbie } from "react-icons/si";


const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(false);
    const menuOptions = [
        {
            text: "Home",
            icon:<HomeIcon/>
        },
        {
            text: "Sobre",
            icon:<InfoIcon/>
        },
        {
            text: "Inscrições",
            icon:<CommentRoundedIcon/>
        },
        {
            text: "Contato",
            icon:<PhoneRoundedIcon/>
        },
        {
            text: "Cronograma",
            icon:<ShoppingCartRoundedIcon/>
        },
        {
            text: "Colaboradores",
            icon:<HomeIcon/>
        },
        {
            text: "Palestrantes",
            icon:<HomeIcon/>
        },
        {
            text: "Palestras",
            icon:<HomeIcon/>
        },
        {
            text: "Cursos",
            icon:<HomeIcon/>
        },
    ];

    return (
        <nav className="header">
            <div className="nav-logo-container">
                <Link to="/" class="logo">
                    <SiCodenewbie />
                </Link>
            </div>
            <div className="navbar-links-container">
                <Link to="/">Home</Link>
                <Link to="">Sobre</Link>
                <Link to="">Inscrições</Link>
                <Link to="/contact">Contato</Link>
                <Link to="">Cronograma</Link>
                <Link to="">Colaboradores</Link>
                <Link to="">Palestrantes</Link>
                <Link to="">Palestras</Link>
                <Link to="/course">Cursos</Link>
            </div>   
            <div className="navbar-menu-container">
                <HiOutlineBars3 onClick={() => setOpenMenu(true)}/>
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
                        <ListItemButton>
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
    )
}

export default Navbar;