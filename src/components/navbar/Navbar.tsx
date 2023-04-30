import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./NavbarListItems";
import Avatar from "@mui/material/Avatar";
import { Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Logo = () => (
  <Typography variant="h1" sx={{ color: "white", m: 0 }}>
    ICU
    <span style={{ color: "#21B34B", fontSize: "0.6em" }}> connect</span>
  </Typography>
);

const Profile = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      p: 1,
      m: 4,
      gap: "1.5em",
      borderRadius: 1,
      justifyContent: "left",
      position: "absolute",
      bottom: "0",
    }}
  >
    <Avatar sx={{ bgcolor: "secondary.main", color: "#000000" }}>
      {localStorage.getItem("Username")?.charAt(0).toUpperCase()}
    </Avatar>
    <div style={{ margin: "auto" }}>
      <p style={{ margin: "0" }}>Profile</p>
      <small style={{ margin: "0" }}>{localStorage.getItem("Username")}</small>
    </div>
  </Box>
);

const Navbar = () => {
  const drawerWidth = 340;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(
    !useMediaQuery("(min-width:750px)")
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  React.useEffect(() => {
    //this is needed that the navbar component reloads on navigate and the min-widht size is recalculated
  }, []);

  const NavDrawer = (
    <Drawer
      className="Drawer"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          m: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            mr: 2,
            alignSelf: "flex-end",
            "&:hover": {
              color: "black",
              backgroundColor: "white",
            },
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Toolbar />
      <Divider />
      <List sx={{ ml: 1 }}>
        {mainNavbarItems.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            onClick={() => navigate(item.route)}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Profile />
    </Drawer>
  );

  return isOpen ? (
    <Box sx={{ m: 3 }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{
          mr: 2,
          "&:hover": {
            color: "white",
            backgroundColor: "rgba(17, 8, 47, 1)",
          },
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  ) : (
    NavDrawer
  );
};

export default Navbar;
