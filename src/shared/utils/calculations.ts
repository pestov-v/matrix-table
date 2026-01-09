import type { CellId, Matrix, MatrixRow } from "../types";

export const calculateRowSum = (row: MatrixRow): number => {
  return row.reduce((sum, cell) => sum + cell.amount, 0);
};

export const calculate60thPercentile = (values: number[]): number => {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const index = 0.6 * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) {
    return sorted[lower];
  }

  const fraction = index - lower;
  return sorted[lower] + fraction * (sorted[upper] - sorted[lower]);
};

interface ColumnValuesParams {
  matrix: Matrix;
  columnIndex: number;
}
export const getColumnValues = ({
  matrix,
  columnIndex,
}: ColumnValuesParams): number[] => {
  return matrix.map((row) => row[columnIndex]?.amount ?? 0);
};

export const calculateAllPercentiles = (matrix: Matrix): number[] => {
  if (matrix.length === 0 || matrix[0].length === 0) return [];

  const columnCount = matrix[0].length;
  return Array.from({ length: columnCount }, (_, columnIndex) => {
    const columnValues = getColumnValues({ matrix, columnIndex });
    return calculate60thPercentile(columnValues);
  });
};

interface CalculateCellPercentageParams {
  cellAmount: number;
  rowSum: number;
}
export const calculateCellPercentage = ({
  cellAmount,
  rowSum,
}: CalculateCellPercentageParams): number => {
  if (rowSum === 0) return 0;
  return (cellAmount / rowSum) * 100;
};

interface CalculateHeatmapPercentageParams {
  cellAmount: number;
  maxValueInRow: number;
}
export const calculateHeatmapPercentage = ({
  cellAmount,
  maxValueInRow,
}: CalculateHeatmapPercentageParams): number => {
  if (maxValueInRow === 0) return 0;
  return (cellAmount / maxValueInRow) * 100;
};

export const getMaxValueInRow = (row: MatrixRow): number => {
  return Math.max(...row.map((cell) => cell.amount));
};

interface FindNearestCellsParams {
  matrix: Matrix;
  targetCellId: CellId;
  x: number;
}
export const findNearestCells = ({
  matrix,
  targetCellId,
  x,
}: FindNearestCellsParams): Set<CellId> => {
  const targetCell = matrix.flat().find((cell) => cell.id === targetCellId);
  if (!targetCell || x <= 0) return new Set();

  const targetAmount = targetCell.amount;

  const cellsWithDifference = matrix
    .flat()
    .filter((cell) => cell.id !== targetCellId)
    .map((cell) => ({
      id: cell.id,
      difference: Math.abs(cell.amount - targetAmount),
    }))
    .sort((a, b) => a.difference - b.difference);

  const nearestIds = cellsWithDifference.slice(0, x).map((item) => item.id);

  return new Set(nearestIds);
};
