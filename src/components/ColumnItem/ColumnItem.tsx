import React, { useState } from "react";
import { Column } from "../../types/columns";
import styles from "./ColumnItem.module.css";
import { Icon } from "../Icon/Icon";
import CardsList from "../CardsList/CardsList";
import { useAppDispatch, useAppSelector } from "../../hooks/auth";
import { deleteColumn } from "../../redux/boards/operations";
import ModalWindow from "../ModalWindow/ModalWindow";
import ModalColumn from "../ModalColumn/ModalColumn";
import { selectIsLoading } from "../../redux/boards/selectors";
import { useParams } from "react-router-dom";
import ModalCard from "../ModalCard/ModalCard";

interface ColumnProps {
  column: Column;
}

const ColumnItem: React.FC<ColumnProps> = ({ column }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const { boardId } = useParams();

  const handleDelete = async () => {
    dispatch(deleteColumn(column.columnId));
  };

  const toggleEditModal = (status: boolean) => {
    setIsEditModalOpen(status);
  };

  const toggleAddModal = (status: boolean) => {
    setIsAddModalOpen(status);
  };

  return (
    <li className={styles.column}>
      <div className={styles.columnHeader}>
        <p>{column.title}</p>
        <div className={styles.actionCont}>
          <div
            onClick={() => toggleEditModal(true)}
            className={styles.editColumn}
          >
            <Icon id="pencil" size={16} />
          </div>
          <div onClick={handleDelete} className={styles.deleteColumn}>
            <Icon id="trash" size={16} />
          </div>
        </div>
      </div>
      <CardsList cards={column.cards} />
      <button className={styles.addBtn} onClick={() => toggleAddModal(true)}>
        <Icon
          id="add"
          fill="var(--modal-add-btn-fill)"
          stroke="var(--modal-add-btn-stroke)"
          size={28}
        />
        <p className={styles.btnText}>Add another card</p>
      </button>

      <ModalWindow
        isOpen={isEditModalOpen}
        closeModal={() => toggleEditModal(false)}
        formId="editColumnForm"
        width="350px"
        height="221px"
        title="Edit column"
        submitBtnChildren={
          <div className={styles.modalBtn}>
            <Icon
              id="add"
              fill="var(--modal-add-btn-fill)"
              stroke="var(--modal-add-btn-stroke)"
              size={28}
            />
            <p>Edit</p>
          </div>
        }
        isLoading={isLoading}
      >
        <ModalColumn
          type="edit"
          closeModal={() => toggleEditModal(false)}
          boardId={boardId || ""}
          column={column}
        />
      </ModalWindow>

      <ModalWindow
        isOpen={isAddModalOpen}
        closeModal={() => toggleAddModal(false)}
        formId="addCardForm"
        width="350px"
        height="522px"
        title="Add card"
        submitBtnChildren={
          <div className={styles.modalBtn}>
            <Icon
              id="add"
              fill="var(--modal-add-btn-fill)"
              stroke="var(--modal-add-btn-stroke)"
              size={28}
            />
            <p>Add</p>
          </div>
        }
        isLoading={isLoading}
      >
        <ModalCard
          type="add"
          closeModal={() => toggleAddModal(false)}
          columnId={column.columnId}
        />
      </ModalWindow>
    </li>
  );
};

export default ColumnItem;
