import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.mainCont}>
        <Header />
        <ScreensPage />
      </div>
    </div>
  );
};

export default HomePage;
