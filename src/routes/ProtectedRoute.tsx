import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { TokenContext } from "context/TokenProvider";

const ProtectedRoute = ({
  children,
  tokenRequired,
  redirectPath,
}: {
  children: JSX.Element;
  tokenRequired: boolean;
  redirectPath: string;
}) => {
  const [token] = useContext(TokenContext);
  const location = useLocation();

  //홈,회원가입 페이지, 토큰이 있으면 리다이렉트
  //투두 페이지, 토큰이 없으면 리다이렉트
  if (tokenRequired === (token !== null))
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  return children;
};

export default ProtectedRoute;
