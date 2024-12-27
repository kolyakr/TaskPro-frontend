import React from "react";
import { useAppSelector } from "../../hooks/auth";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return <>{isLoggedIn === true ? <>{children}</> : <>forbidden</>}</>;
};

export default PrivateRoute;
