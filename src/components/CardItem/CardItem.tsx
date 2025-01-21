import React from "react";
import { Card } from "../../types/cards";
import { Icon } from "../Icon/Icon";
import { formatDate } from "../../service/formatDate";
import Ellipsis from "react-ellipsis-component";
import styles from "./CardItem.module.css";
import { priorityColor } from "../../constants";

interface CardProps {
  card: Card;
}

const CardItem: React.FC<CardProps> = ({ card }) => {
  const priorityStyle = priorityColor[card.priority];
  console.log(priorityStyle);

  return (
    <li
      style={{
        borderLeft: `4px solid ${priorityStyle}`,
      }}
      className={styles.card}
      key={card.cardId}
    >
      <div className={styles.titleCont}>
        <p className={styles.title}>{card.title}</p>
        <div className={styles.description}>
          <Ellipsis ellipsis={true} text={card.description} maxLine={2} />
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
                {`${card.priority.charAt(0).toUpperCase()}${card.priority.slice(
                  1
                )}`}
              </p>
            </div>
          </div>
          <div className={styles.detail}>
            <p className={styles.detailsText}>Deadline</p>
            <p className={styles.detailValue}>{formatDate(card.deadline)}</p>
          </div>
        </div>
        <div className={styles.actions}>
          <Icon id="move" size={16} />
          <Icon id="pencil" size={16} />
          <Icon id="trash" size={16} />
        </div>
      </div>
    </li>
  );
};

export default CardItem;
