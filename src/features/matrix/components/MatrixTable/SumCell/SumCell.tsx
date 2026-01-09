import { type FC } from "react";
import { useMatrixContext } from "../../../context";
import { calculateRowSum } from "../../../../../shared/utils/calculations";
import styles from "./SumCell.module.css";

interface SumCellProps {
  rowIndex: number;
}

export const SumCell: FC<SumCellProps> = ({ rowIndex }) => {
  const { matrix, setHoveredSumRow, hoveredSumRowIndex } = useMatrixContext();

  const row = matrix[rowIndex];
  const sum = calculateRowSum(row);

  const handleMouseEnter = () => {
    setHoveredSumRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredSumRow(null);
  };

  const isHovered = hoveredSumRowIndex === rowIndex;

  return (
    <td
      className={`${styles.sumCell} ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {sum}
    </td>
  );
};
