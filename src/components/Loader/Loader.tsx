import React from "react";
import { Vortex } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <Vortex
      height="60"
      width="60"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={["green", "white", "green", "white", "green", "white"]}
    />
  );
};

export default Loader;
