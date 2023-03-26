import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./NavbarListItems";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Logo = () => (
  <Typography variant="h1" sx={{ color: "white", p: 4, paddingTop: 5.2 }}>
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
    <Avatar sx={{ bgcolor: "secondary.main", color: "#000000" }}>S</Avatar>
    <div style={{ margin: "auto" }}>
      <p style={{ margin: "0" }}>Profile</p>
      <small style={{ margin: "0" }}>username</small>
    </div>
  </Box>
);

const Navbar = () => {
  const drawerWidth = 250;
  const navigate = useNavigate();

  return (
    <Drawer
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
      <Logo />
      <Toolbar />
      <Divider />
      <List>
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
};

export default Navbar;
