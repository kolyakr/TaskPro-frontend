import React from "react";
import styles from "./StartText.module.css";

const StartText: React.FC = () => {
  return (
    <div className={styles.columnCont}>
      <div className={styles.startText}>
        Before starting your project, it is essential{" "}
        <span className={styles.startTextSpan}>to create a board</span> to
        visualize and track all the necessary tasks and milestones. This board
        serves as a powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </div>
    </div>
  );
};

export default StartText;
