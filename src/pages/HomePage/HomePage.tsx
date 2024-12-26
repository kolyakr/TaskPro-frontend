import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage";

const HomePage = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <ScreensPage />
    </div>
  );
};

export default HomePage;
