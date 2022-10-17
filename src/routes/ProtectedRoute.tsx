import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  isAllowed,
  redirectPath,
}: {
  children: JSX.Element;
  isAllowed: boolean;
  redirectPath: string;
}) => {
  const location = useLocation();

  if (!isAllowed)
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  return children;
};

export default ProtectedRoute;
