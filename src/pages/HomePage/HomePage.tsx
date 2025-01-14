import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage";
import styles from "./HomePage.module.css";
import { getBoards } from "../../redux/boards/operations";
import { useAppDispatch } from "../../hooks/auth";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchBoards = async () => {
      await dispatch(getBoards());
    };

    fetchBoards();
  }, [dispatch]);

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
