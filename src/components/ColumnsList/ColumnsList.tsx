import React from "react";
import { Column } from "../../types/columns";
import ColumnItem from "../ColumnItem/ColumnItem";
import styles from "./ColumnsList.module.css";

interface ColumnsListProps {
  columns: Column[];
}

const ColumnsList: React.FC<ColumnsListProps> = ({ columns }) => {
  return (
    <ul className={styles.columnsList}>
      {columns.map((column) => (
        <ColumnItem key={column.columnId} column={column} />
      ))}
    </ul>
  );
};

export default ColumnsList;
