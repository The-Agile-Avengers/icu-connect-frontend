import { Switch } from "@mui/material";
import React from "react";
import { BrowserRouter,Routes, Route, redirect } from "react-router-dom";

const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
  
          <Route path="/">
            redirect("/login");
          </Route>
          <Route path="/singUp">
 
          </Route>
  
        </Routes>
      </BrowserRouter>
    );
  };
  
  /*
  * Don't forget to export your component!
   */
  export default AppRouter;