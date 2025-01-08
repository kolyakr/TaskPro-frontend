import React, { useState } from "react";
import { useAppSelector } from "../../hooks/auth";
import { selectBoards } from "../../redux/boards/selectors";
import { Board } from "../../types/boards";
import { Icon } from "../Icon/Icon";
import styles from "./BoardsList.module.css";
import clsx from "clsx";
import { NavLink, useParams } from "react-router-dom";

const BoardsList: React.FC = () => {
  const boards = useAppSelector(selectBoards);
  const { boardId } = useParams();

  const [selectedBoardId, setSelectedBoardId] = useState<string>(
    boards[0].boardId
  );

  const selectBoard = (boardId: string) => {
    setSelectedBoardId(boardId);
  };

  return (
    <ul className={styles.list}>
      {boards.map((board: Board) => (
        <li
          onClick={() => selectBoard(board.boardId)}
          key={board.boardId}
          id={board.boardId}
        >
          <NavLink
            className={clsx(styles.item, {
              [styles.selectedItem]: board.boardId === selectedBoardId,
            })}
            to={
              boardId === undefined
                ? `${board.boardId}`
                : `/home/${board.boardId}`
            }
          >
            <div className={styles.titleCont}>
              <Icon
                color={
                  board.boardId === selectedBoardId
                    ? "var(--text-color)"
                    : "var(--not-active-color)"
                }
                id={board.icon}
                size={18}
              />
              <p
                className={clsx(styles.title, {
                  [styles.selectedTitle]: board.boardId === selectedBoardId,
                })}
              >
                {board.title}
              </p>
            </div>
            {board.boardId === selectedBoardId && (
              <div className={styles.actionsCont}>
                <Icon id="pencil" size={16} />
                <Icon id="trash" size={16} />
              </div>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default BoardsList;
