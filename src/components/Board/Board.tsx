import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/auth";
import { selectBoard, selectIsLoading } from "../../redux/boards/selectors";
import ColumnsList from "../ColumnsList/ColumnsList";
import styles from "./Board.module.css";
import { Icon } from "../Icon/Icon";
import ModalWindow from "../ModalWindow/ModalWindow";
import ModalColumn from "../ModalColumn/ModalColumn";

const Board: React.FC = () => {
  const { boardId } = useParams();
  const board = useAppSelector(selectBoard(boardId));

  const isLoading = useAppSelector(selectIsLoading);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <div>
      {board && board?.columns.length > 0 && <ColumnsList />}
      <button onClick={openCreateModal} className={styles.addBtn}>
        <div className={styles.addWrap}>
          <Icon
            fill="var(--screens-page-add-btn-fill)"
            stroke="var(--screens-page-add-btn-stroke)"
            size={28}
            id="add"
          />
          <p className={styles.addText}>Add another column</p>
        </div>
      </button>

      <ModalWindow
        isOpen={isCreateModalOpen}
        closeModal={closeCreateModal}
        formId="addColumnForm"
        width="350px"
        height="221px"
        title="Add column"
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
        <ModalColumn
          type="add"
          closeModal={closeCreateModal}
          boardId={board?.boardId || ""}
        />
      </ModalWindow>
    </div>
  );
};

export default Board;
