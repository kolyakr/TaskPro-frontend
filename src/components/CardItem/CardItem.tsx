import React, { useState, useEffect, useRef } from "react";
import { Card } from "../../types/cards";
import { Icon } from "../Icon/Icon";
import { formatDate } from "../../service/formatDate";
import Ellipsis from "react-ellipsis-component";
import styles from "./CardItem.module.css";
import { priorityColor } from "../../constants";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useAppDispatch, useAppSelector } from "../../hooks/auth";
import {
  selectBoard,
  selectColumn,
  selectIsLoading,
} from "../../redux/boards/selectors";
import ModalCard from "../ModalCard/ModalCard";
import { useParams } from "react-router-dom";
import { deleteCard, moveCard } from "../../redux/boards/operations";
import Dropdown, { Option } from "../Dropdown/Dropdown";

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

  const dispatch = useAppDispatch();

  const handleAction = async (action: "edit" | "delete" | "move") => {
    if (action === "edit") {
      toggleEditModal(true);
    }

    if (action === "delete") {
      await dispatch(deleteCard({ cardId: card.cardId }));
    }

    if (action === "move") {
      await dispatch(
        moveCard({
          cardData: {
            columnId: selectedColumnId as string,
          },
          cardId: card.cardId,
          oldColumnId: column?.columnId as string,
        })
      ).then(() => {
        toggleDropdown();
      });
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);

  useEffect(() => {
    const moveCard = async () => {
      await handleAction("move");
    };

    if (selectedColumnId) {
      moveCard();
    }
  }, [selectedColumnId]);

  const moveBtnRef = useRef<HTMLDivElement | null>(null);

  const handleSelectColumn = (option: string | null) => {
    if (option) {
      setSelectedColumnId(option);
    }
  };

  const board = useAppSelector(selectBoard(boardId));

  let options: Option[] = [];
  if (board) {
    options = board.columns
      .filter((optionColumn) => optionColumn.columnId !== column?.columnId)
      .map((optionColumn) => {
        return {
          value: optionColumn.title,
          label: <Icon id="move" size={14} />,
          id: optionColumn.columnId,
        };
      });
  }

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
          <div
            ref={moveBtnRef}
            className={styles.actionCont}
            onClick={toggleDropdown}
          >
            <Icon id="move" size={16} />
          </div>
          <div
            className={styles.actionCont}
            onClick={() => handleAction("edit")}
          >
            <Icon id="pencil" size={16} />
          </div>
          <div
            onClick={() => handleAction("delete")}
            className={styles.actionCont}
          >
            <Icon id="trash" size={16} />
          </div>
          <Dropdown
            ref={moveBtnRef}
            className={styles.themeDropdown}
            isDropdownOpen={isDropdownOpen}
            options={options}
            handleOption={handleSelectColumn}
            onClose={() => setIsDropdownOpen(false)}
          />
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

export default CardItem;
