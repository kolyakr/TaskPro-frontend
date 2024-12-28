import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <>
        <Header />
        <ScreensPage />
      </>
    </div>
  );
};

export default HomePage;
