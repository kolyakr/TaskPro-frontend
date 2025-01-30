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
          board?.background ===
          `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHPSURBVHgBvZbZbcJAEIbHNvclAy95QZAOkg6STuggrSQVJJ0kqSDpICDeEfd9ZL4RSEQCTITtX1ppdrXM5392bNaRnRqNhr/ZbJ4cx3nQ6YOEo2/N+dLpdN72C84O1thut++EEo1aauSxpTJgvV7/iRB2CL33arVaU4OmRC9fqzj3yuXyq05uJAapMXG0nFuJUa7ErIRcKcqUzWYtns/nsl6vz+6/yqHneVKpVCSRSNjwfd8eIDJgOp2W5XIpg8HABvHebSRApK1+NA4FSAmLxaI5Q9PpVFKplK0xiDnH0IAk5YwKhYLBcdTr9axRGN1uN7ymyefz4rqundVkMjE4AsCcEVpJcUMz9Pt9m1NKlMvl7EGq1aokk8lLUl0GpN1xcFiu4XBowEwmI6PRSEqlUuArcREQB7Q7wEMBH4/HVsbFYmHNwt6rgJQSByQ+JkoLGBB76N6g0p4FUkoSnes8mggQXxrioNKe/JaSAOEyqFSr1cpAs9nMYPyWY/gXkCS4Axgk9jIQDXQKdhaIeOKwFfv/IcAPiU/frh7yp8QkZb04XID15f2SGK6J7Xb71tW7aY9LKgsSnVo7hvx5Q9VtU90+aXgn4ehjd2TPGGPhF1mG2SoTf2RvAAAAAElFTkSuQmCC`
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
