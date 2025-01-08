import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/auth";
import { selectBoards, selectIsLoading } from "../../redux/boards/selectors";
import { Board } from "../../types/boards";
import { Icon } from "../Icon/Icon";
import styles from "./BoardsList.module.css";
import clsx from "clsx";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../service/localStorage";
import { deleteBoard } from "../../redux/boards/operations";
import Loader from "../Loader/Loader";

const BoardsList: React.FC = () => {
  const boards = useAppSelector(selectBoards);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (boardId === undefined && boards.length > 0) {
      const boardIdFromStorage: string | null = getFromLocalStorage("boardId");

      if (boardIdFromStorage) {
        setSelectedBoardId(boardIdFromStorage);
        navigate(`${boardIdFromStorage}`);
        return;
      }

      navigate(`${selectedBoardId}`);
    }
  }, []);

  useEffect(() => {
    const boardIdFromStorage: string | null = getFromLocalStorage("boardId");
    if (boardIdFromStorage) {
      const element = document.getElementById(boardIdFromStorage);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [boards]);

  const [selectedBoardId, setSelectedBoardId] = useState<string>(
    boards[0].boardId
  );

  const selectBoard = (boardId: string) => {
    setSelectedBoardId(boardId);
    saveToLocalStorage("boardId", boardId);
  };

  const handleDeleteBoard = async (boardId: string) => {
    await dispatch(deleteBoard(boardId));
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
                <div>
                  <Icon id="pencil" size={16} />
                </div>
                <div onClick={() => handleDeleteBoard(board.boardId)}>
                  {isLoading ? (
                    <Loader height="25" width="25" />
                  ) : (
                    <Icon id="trash" size={16} />
                  )}
                </div>
              </div>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default BoardsList;
