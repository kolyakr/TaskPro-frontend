import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/auth";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/welcome");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};
export default PrivateRoute;
