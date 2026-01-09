import { type FC } from "react";

import { useMatrixContext } from "../../context";

import { Button } from "../../../../shared/ui";
import { MatrixTableBody } from "./MatrixTableBody/MatrixTableBody";

import styles from "./MatrixTable.module.css";

export const MatrixTable: FC = () => {
  const { matrix, params, removeRow, addRow } = useMatrixContext();

  if (matrix.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Введіть параметри M, N та X для генерації таблиці</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>#</th>
            {Array.from({ length: params.N }, (_, i) => (
              <th key={i} className={styles.headerCell}>
                Cell {i + 1}
              </th>
            ))}
            <th className={styles.headerCell}>Sum</th>
            <th className={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <MatrixTableBody matrix={matrix} removeRow={removeRow} />
      </table>

      <Button variant="success" className={styles.addRowBtn} onClick={addRow}>
        + Додати рядок
      </Button>
    </div>
  );
};
