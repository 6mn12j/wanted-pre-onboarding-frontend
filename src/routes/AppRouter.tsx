import React from "react";

import NotFound from "Pages/404";
import Signin from "Pages/Signin";
import Signup from "Pages/Signup";
import Todo from "Pages/Todo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  const isAuth = window.localStorage.getItem("jwt");
  console.log("router", isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAllowed={isAuth ? false : true}
              redirectPath="/todo"
            >
              <Signin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <ProtectedRoute
              isAllowed={isAuth ? false : true}
              redirectPath="/todo"
            >
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todo"
          element={
            <ProtectedRoute isAllowed={isAuth ? true : false} redirectPath="/">
              <Todo />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
