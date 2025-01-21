import React from "react";
import { Card } from "../../types/cards";
import CardItem from "../CardItem/CardItem";
import styles from "./CardsList.module.css";

interface CardsListProps {
  cards: Card[];
}

const CardsList: React.FC<CardsListProps> = ({ cards }) => {
  return (
    <ul className={styles.list}>
      {cards.map((card) => (
        <CardItem key={card.cardId} card={card}></CardItem>
      ))}
    </ul>
  );
};

export default CardsList;
