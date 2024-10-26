import React, { useContext, useState, useEffect } from "react";
import "../Styles/NavBarStyles.css";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, List } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import TodayIcon from '@mui/icons-material/Today';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import Groups3Icon from '@mui/icons-material/Groups3';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../Scripts/AuthContext";
import { SiCodenewbie } from "react-icons/si";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        console.log("Usuário no Navbar:", user);
    }, [user]);

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
            text: "Cronograma",
            icon: <TodayIcon />,
            path: "/timeline"
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
    ];

    if (user) {
        menuOptions.push(
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
            {
                text: "Contato",
                icon: <PhoneRoundedIcon />,
                path: "/contact"
            },
            {
                text: "Inscrições",
                icon: <PersonAddIcon />,
                path: "/enrollment2"
            },
            {
                text: "Perfil",
                icon: <PersonAddIcon />,
                path: "/user"
            },
            {
                text: "Sair",
                icon: <LogoutIcon />,
                path: "/logout"
            }
        );
    }

    const handleNavigation = async (path) => {
        setOpenMenu(false);

        if (path === "/logout") {
            try {
                console.log("Chamando a função de logout...");
                await logout();
                console.log("Logout realizado com sucesso.");
                navigate("/login");
            } catch (error) {
                console.error("Erro durante o logout:", error);
            }
        } else {
            navigate(path);
        }
    };
    return (
        <nav className="header">
            <div className="nav-logo-container">
                <Link to="/" className="logoNav">
                    <SiCodenewbie/>
                </Link>
            </div>
            
            <div className="navbar-links-container"> 
                {menuOptions.map((item) => {
                    if (item.text === "Sair") { //{links e função para sair}
                        return (
                            <button
                                key={item.text}
                                onClick={logout}
                                className="navbar-logout-button" 
                            >
                                {item.text}
                            </button>
                        );
                    } else {
                        return (
                            <Link to={item.path} key={item.text}>
                                {item.text}
                            </Link>
                        );
                    }
                })}
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

                    {user ? (
                        <>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => handleNavigation("/user")}>
                                    <ListItemText primary="Perfil" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleNavigation("/login")}>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>
                    )}
                </Box>
            </Drawer>
        </nav>
    );
};

export default Navbar;
