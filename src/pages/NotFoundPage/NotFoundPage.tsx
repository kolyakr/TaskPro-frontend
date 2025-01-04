import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  const [time, setTime] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (time === 0) {
      navigate("/home");
    }

    setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  }, [time, navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.text}>
        Not found page <span className={styles.textTime}>404</span>
      </div>
      <div className={styles.text}>
        Navigate to home after <span className={styles.textTime}>{time}</span>{" "}
        seconds
      </div>
    </div>
  );
};

export default NotFoundPage;
