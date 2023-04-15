import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Community from "../../pages/Community";
import Login from "../../pages/Login";
import MyCommunities from "../../pages/MyCommunities";
import Communities from "../../pages/Communities";
import SignUp from "../../pages/SignUp";
import { isLoggedIn } from "../../utils/utils";
import CreateCommunity from "pages/CreateCommunity";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {isLoggedIn() ? (
        /* User is logged in */
        <>
          <Route index path="/" element={<MyCommunities />} />
          <Route index path="/community/:id?" element={<Community />} />
          <Route index path="/community/create" element={<CreateCommunity />} />
          <Route index path="/communities" element={<Search />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
        </>
      ) : (
        /* User is NOT logged in */
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
