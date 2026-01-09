import { useMemo, type FC } from "react";

import type { Cell } from "../../../../../shared/types";

import { useMatrixContext } from "../../../context";
import {
  calculateCellPercentage,
  calculateHeatmapPercentage,
  calculateRowSum,
  getMaxValueInRow,
} from "../../../../../shared/utils/calculations";

import styles from "./TableCell.module.css";

interface TableCellProps {
  cell: Cell;
  rowIndex: number;
}

export const TableCell: FC<TableCellProps> = ({ cell, rowIndex }) => {
  const {
    incrementCell,
    setHoveredCell,
    nearestCellIds,
    hoveredSumRowIndex,
    matrix,
  } = useMatrixContext();

  const handleClick = () => {
    incrementCell(cell.id);
  };

  const handleMouseEnter = () => {
    setHoveredCell(cell.id);
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const isNearest = nearestCellIds.has(cell.id);
  const isShowingPercentage = hoveredSumRowIndex === rowIndex;

  const percentageData = useMemo(() => {
    if (!isShowingPercentage) return null;

    const row = matrix[rowIndex];
    const rowSum = calculateRowSum(row);
    const maxValue = getMaxValueInRow(row);

    return {
      percentage: calculateCellPercentage({ cellAmount: cell.amount, rowSum }),
      heatmapPercentage: calculateHeatmapPercentage({
        cellAmount: cell.amount,
        maxValueInRow: maxValue,
      }),
    };
  }, [isShowingPercentage, matrix, rowIndex, cell.amount]);

  const cellClasses = [
    styles.cell,
    isNearest && styles.nearest,
    isShowingPercentage && styles.percentage,
  ]
    .filter(Boolean)
    .join(" ");

  const backgroundStyle = useMemo(() => {
    if (!percentageData) return {};
    return {
      background: `linear-gradient(90deg, 
        rgba(var(--primary-rgb), ${percentageData.heatmapPercentage / 100}) 0%, 
        rgba(var(--primary-rgb), ${percentageData.heatmapPercentage / 100}) ${
        percentageData.heatmapPercentage
      }%, 
        transparent ${percentageData.heatmapPercentage}%)`,
    };
  }, [percentageData]);

  const cellValue = isShowingPercentage
    ? `${percentageData?.percentage.toFixed(1)}%`
    : cell.amount;

  return (
    <td
      className={cellClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={backgroundStyle}
    >
      {cellValue}
    </td>
  );
};
