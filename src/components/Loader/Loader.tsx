import React from "react";
import { Vortex } from "react-loader-spinner";

interface LoaderProps {
  height?: string;
  width?: string;
}

const Loader: React.FC<LoaderProps> = ({ height, width }) => {
  return (
    <Vortex
      height={height || "60"}
      width={width || "60"}
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={["green", "white", "green", "white", "green", "white"]}
    />
  );
};

export default Loader;
