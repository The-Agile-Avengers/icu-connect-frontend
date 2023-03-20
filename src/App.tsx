import * as React from "react";
import AppRouter from "./components/routing/AppRouter";


export default function App() {
  const drawerWidth = 220; 
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar/>
      <CoursePage/>
    </Box>
  );
}

/*
export default function App() {
  return (
    <AppRouter />
  );
}*/