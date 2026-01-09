import type { FC } from "react";
import styles from "./Header.module.css";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Matrix Table Generator</h1>
      <p className={styles.description}>
        Генератор інтерактивної матричної таблиці
      </p>
    </header>
  );
};
