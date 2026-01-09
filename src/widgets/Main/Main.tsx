import { type FC } from "react";

import { InputForm } from "../../features/matrix/components/InputForm";
import { MatrixTable } from "../../features/matrix/components/MatrixTable";

import styles from "./Main.module.css";

export const Main: FC = () => {
  return (
    <main className={styles.main}>
      <InputForm />
      <MatrixTable />
    </main>
  );
};
