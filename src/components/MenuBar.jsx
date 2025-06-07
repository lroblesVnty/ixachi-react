import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState,useContext,useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Dangerous } from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from 'react-router-dom';



const drawerWidth = 240;

const menuItem=[
  {
    path:"/home",
    name:"Home",
    icon:<HomeIcon/>
  },
  {
    path:"/dashboard",
    name:"Dashboard",
    icon:<DashboardIcon/>
  },
  {
    path:"/permisos",
    name:"Permisos",
    icon:<BorderColorIcon/>
  },
  {
    path:"add/levantamiento",
    name:"Levantamientos",
    icon:<Dangerous/>
  }
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


function MenuBar({children}) {
    const theme = useTheme();
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [open, setOpen] = useState(false);
    const [userInitials, setUserInitials] = useState(false);
    const location=useLocation();
    const {logout,user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    useEffect(() => {
        getUserInitials();
    }, []);
    

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleListItemClick = (event,name) => {
        
      console.log({name})
    };

    const handleLogout = async () => {
     
      const result = await logout();
      //console.log({result})
      if (result?.success === false) {
        console.error('Error al cerrar sesión:', result?.error);
        // Aquí podrías mostrar un mensaje de error al usuario
      } else {
        // Redirigir al usuario a la página de inicio de sesión o a donde sea necesario
        navigate('/login');
      }
    };
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        console.log(event.currentTarget)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleMenuItemClick = (setting) => {
        console.log(`Clic en: ${setting}`);
        handleCloseUserMenu(); // Si quieres que el menú se cierre después del clic
        if (setting=='Logout') {
            handleLogout()
        }
       
    };

    const getUserInitials = () => {
        console.log(user) 
        const username = user?.name || ''; 
        if (username!=''){
            const initialsName=username.split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
            setUserInitials(initialsName);
        }
            
    };



    return (
    <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>{/* alinear el boton de login a la dereacha con flexGrow  */}
            Mini variant drawer
            </Typography>
           {/*  <IconButton aria-label="logout" color="secondary" onClick={handleLogout}> 
              <LogoutIcon/>
            </IconButton> */}
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu} >
                <Avatar >{userInitials}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}  onClick={() => handleMenuItemClick(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                    ) : (
                    <ChevronLeftIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {menuItem.map(({icon,name,path},index) => (
                  <ListItem key={name} disablePadding sx={{ display: "block" }}>
                    <NavLink
                        to={path}
                        key={index}
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                        style={({ isActive }) => ({
                            color: isActive ? 'blue' : 'gray',
                            textDecoration: 'none',
                        })}
                      >
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        }}
                        onClick={(event) => handleListItemClick(event,name)}
                        //onClick={handleListItemClick(name)}
                        selected={path === location.pathname}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                        }}
                        >
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                        {icon}
                        </ListItemIcon>
                        <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    </NavLink>
                  </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                        }}
                        >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3,overflow: 'auto'}} >
            <DrawerHeader />
            {children}
        </Box>
    </Box>
  );
}

/* const MenuBar = () => {
    return (
        <>
        
        </>
    )
} */
export default MenuBar
