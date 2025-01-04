import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./RefreshPage.module.css";

const RefreshPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <Skeleton className={styles.sidebar}></Skeleton>
      </div>
      <div className={styles.mainCont}>
        <div>
          <Skeleton className={styles.header}></Skeleton>
        </div>
        <div className={styles.main}>
          <Skeleton className={styles.main}></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default RefreshPage;
