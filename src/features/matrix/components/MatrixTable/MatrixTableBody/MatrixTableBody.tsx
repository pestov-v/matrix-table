import { type FC } from "react";

import type { Cell } from "../../../../../shared/types";

import { PercentileRow } from "../PercentileRow";
import { SumCell } from "../SumCell";
import { TableCell } from "../TableCell";

import styles from "./MatrixTableBody.module.css";

interface MatrixTableBodyProps {
  matrix: Cell[][];
  removeRow: (rowIndex: number) => void;
}
export const MatrixTableBody: FC<MatrixTableBodyProps> = ({
  matrix,
  removeRow,
}) => {
  return (
    <tbody>
      {matrix.map((row, rowIndex) => {
        const handleRemoveRow = () => removeRow(rowIndex);
        return (
          <tr key={rowIndex} className={styles.row}>
            <td className={styles.rowNumber}>{rowIndex + 1}</td>
            {row.map((cell) => (
              <TableCell key={cell.id} cell={cell} rowIndex={rowIndex} />
            ))}
            <SumCell rowIndex={rowIndex} />
            <td className={styles.actionCell}>
              <button
                className={styles.deleteBtn}
                onClick={handleRemoveRow}
                title="Видалити рядок"
              >
                ✕
              </button>
            </td>
          </tr>
        );
      })}
      <PercentileRow />
    </tbody>
  );
};
