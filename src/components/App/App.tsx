import React from "react";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div data-theme="light">
      <div className={styles.testStyle}>hello!</div>
      <p className={styles.testColorText}>this nis test color example</p>
    </div>
  );
};

export default App;
