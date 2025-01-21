import React from "react";
import { Column } from "../../types/columns";
import styles from "./ColumnItem.module.css";
import { Icon } from "../Icon/Icon";
import CardsList from "../CardsList/CardsList";
import { useAppDispatch } from "../../hooks/auth";
import { deleteColumn } from "../../redux/boards/operations";

interface ColumnProps {
  column: Column;
}

const ColumnItem: React.FC<ColumnProps> = ({ column }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    dispatch(deleteColumn(column.columnId));
  };

  return (
    <li className={styles.column}>
      <div className={styles.columnHeader}>
        <p>{column.title}</p>
        <div className={styles.actionCont}>
          <div className={styles.editColumn}>
            <Icon id="pencil" size={16} />
          </div>
          <div onClick={handleDelete} className={styles.deleteColumn}>
            <Icon id="trash" size={16} />
          </div>
        </div>
      </div>
      <CardsList cards={column.cards} />
      <button className={styles.addBtn}>
        <Icon
          id="add"
          fill="var(--modal-add-btn-fill)"
          stroke="var(--modal-add-btn-stroke)"
          size={28}
        />
        <p className={styles.btnText}>Add another card</p>
      </button>
    </li>
  );
};

export default ColumnItem;
