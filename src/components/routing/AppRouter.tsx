import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CoursePage from "../../pages/CoursePage";
import LoginPage from "../../pages/LoginPage";
import MyCommunitiesPage from "../../pages/MyCommunitiesPage";
import SearchPage from "../../pages/SearchPage";
import SignUpPage from "../../pages/SignUpPage";
import { isLoggedIn } from "../../utils/utils";
import CourseReviewForm from "../../pages/CourseReviewForm";
import CoursePostForm from "../../pages/CoursePostForm";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {isLoggedIn() ? (
        /* User is logged in */
        <>
          <Route index path="/" element={<MyCommunitiesPage />} />
          <Route index path="/coursepage/:id" element={<CoursePage />} />
          <Route index path="/reviewForm/:id" element={<CourseReviewForm />} />
          <Route index path="/postForm/" element={<CoursePostForm />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
        </>
      ) : (
        /* User is NOT logged in */
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
