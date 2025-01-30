import React from "react";
import styles from "./ScreensPage.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/auth";
import { selectBoard } from "../../redux/boards/selectors";
import Filter from "../../components/Filter/Filter";
import StartText from "../../components/StartText/StartText";
import Board from "../../components/Board/Board";

const ScreensPage: React.FC = () => {
  const { boardId } = useParams();
  const board = useAppSelector(selectBoard(boardId));

  return (
    <main
      className={styles.page}
      style={{
        backgroundImage:
          board?.background === "/src/assets/images/default_background-1x.png"
            ? "none"
            : `url(${board?.background})`,
      }}
    >
      <Filter title={board?.title} />
      {board ? <Board /> : <StartText />}
    </main>
  );
};

export default ScreensPage;
