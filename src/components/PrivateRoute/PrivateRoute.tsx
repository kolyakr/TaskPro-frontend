import React from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  //check if user is logined
  return <>{children}</>;
};

export default PrivateRoute;
