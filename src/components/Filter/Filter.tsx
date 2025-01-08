import React from "react";
import styles from "./Filter.module.css";
import { Icon } from "../Icon/Icon";

interface FilterProps {
  title: string | undefined;
}

const Filter: React.FC<FilterProps> = ({ title }) => {
  return (
    <div className={styles.filterSection}>
      <p className={styles.boardName}>{title}</p>
      <div className={styles.filterCont}>
        <Icon id="filter" size={16} />
        <p className={styles.filterText}>Filters</p>
      </div>
    </div>
  );
};

export default Filter;
