import React from "react";
import { Icon } from "../../components/Icon/Icon";
import styles from "./ScreensPage.module.css";

const ScreensPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.filterSection}>
        <p className={styles.boardName}></p>
        <div className={styles.filterCont}>
          <Icon id="filter" size={16} />
          <p className={styles.filterText}>Filters</p>
        </div>
      </div>
      <div className={styles.columnCont}>
        <div className={styles.startText}>
          Before starting your project, it is essential{" "}
          <span className={styles.startTextSpan}>to create a board</span> to
          visualize and track all the necessary tasks and milestones. This board
          serves as a powerful tool to organize the workflow and ensure
          effective collaboration among team members.
        </div>
      </div>
    </main>
  );
};

export default ScreensPage;
