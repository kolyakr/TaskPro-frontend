import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/auth";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";

interface RestrictedRouteProps {
  children: React.ReactNode;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default RestrictedRoute;
