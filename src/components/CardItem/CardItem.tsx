import React, { useState, useEffect } from "react";
import { Card } from "../../types/cards";
import { Icon } from "../Icon/Icon";
import { formatDate } from "../../service/formatDate";
import Ellipsis from "react-ellipsis-component";
import styles from "./CardItem.module.css";
import { priorityColor } from "../../constants";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useAppSelector } from "../../hooks/auth";
import { selectColumn, selectIsLoading } from "../../redux/boards/selectors";
import ModalCard from "../ModalCard/ModalCard";
import { useParams } from "react-router-dom";

interface CardProps {
  card: Card;
}

const CardItem: React.FC<CardProps> = ({ card }) => {
  const priorityStyle = priorityColor[card.priority];
  const { boardId } = useParams();

  const column = useAppSelector(selectColumn(boardId, card.cardId));
  const isLoading = useAppSelector(selectIsLoading);

  const updatedCard =
    column?.cards.find((c) => c.cardId === card.cardId) || card;

  const [localCard, setLocalCard] = useState<Card>(updatedCard);

  useEffect(() => {
    if (updatedCard) {
      setLocalCard(updatedCard);
    }
  }, [updatedCard]);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const toggleEditModal = (status: boolean) => {
    setIsEditModalOpen(status);
  };

  const handleAction = (action: "edit" | "delete" | "move") => {
    if (action === "edit") {
      toggleEditModal(true);
    }
  };

  return (
    <li
      style={{
        borderLeft: `4px solid ${priorityStyle}`,
      }}
      className={styles.card}
    >
      <div className={styles.titleCont}>
        <p className={styles.title}>{localCard.title}</p>
        <div className={styles.description}>
          <Ellipsis ellipsis={true} text={localCard.description} maxLine={2} />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.details}>
          <div className={styles.detail}>
            <p className={styles.detailsText}>Priority</p>
            <div className={styles.detailValue}>
              <div
                style={{
                  backgroundColor: priorityStyle,
                }}
                className={styles.priorityColor}
              ></div>
              <p className={styles.priority}>
                {`${localCard.priority
                  .charAt(0)
                  .toUpperCase()}${localCard.priority.slice(1)}`}
              </p>
            </div>
          </div>
          <div className={styles.detail}>
            <p className={styles.detailsText}>Deadline</p>
            <p className={styles.detailValue}>
              {formatDate(localCard.deadline)}
            </p>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.actionCont}>
            <Icon id="move" size={16} />
          </div>
          <div
            className={styles.actionCont}
            onClick={() => handleAction("edit")}
          >
            <Icon id="pencil" size={16} />
          </div>
          <div className={styles.actionCont}>
            <Icon id="trash" size={16} />
          </div>
        </div>
      </div>

      <ModalWindow
        isOpen={isEditModalOpen}
        closeModal={() => toggleEditModal(false)}
        formId="editCardForm"
        width="350px"
        height="522px"
        title="Edit card"
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
        <ModalCard
          type="edit"
          closeModal={() => toggleEditModal(false)}
          columnId={column ? column.columnId : ""}
          card={localCard}
        />
      </ModalWindow>
    </li>
  );
};

export default React.memo(CardItem);
