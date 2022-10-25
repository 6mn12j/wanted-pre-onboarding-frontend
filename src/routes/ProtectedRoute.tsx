import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "context/AuthProvider";

const ProtectedRoute = ({
  children,
  tokenRequired,
  redirectPath,
}: {
  children: JSX.Element;
  tokenRequired: boolean;
  redirectPath: string;
}) => {
  const [token] = useContext(AuthContext);
  const location = useLocation();

  if (tokenRequired === (token !== null))
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  return children;
};

export default ProtectedRoute;
