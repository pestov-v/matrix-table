import type { Cell, CellId, Matrix, MatrixRow } from "../types";

let cellIdCounter = 0;

export const generateCellId = (): CellId => {
  return ++cellIdCounter;
};

export const resetCellIdCounter = (): void => {
  cellIdCounter = 0;
};

export const generateRandomAmount = (): number => {
  return Math.floor(Math.random() * 900) + 100;
};

export const createCell = (): Cell => ({
  id: generateCellId(),
  amount: generateRandomAmount(),
});

export const createMatrixRow = (columns: number): MatrixRow => {
  return Array.from({ length: columns }, () => createCell());
};

export const createMatrix = (rows: number, columns: number): Matrix => {
  resetCellIdCounter();
  return Array.from({ length: rows }, () => createMatrixRow(columns));
};

export const findCellById = (matrix: Matrix, id: CellId): Cell | null => {
  for (const row of matrix) {
    const cell = row.find((cell) => cell.id === id);
    if (cell) return cell;
  }
  return null;
};

export const updateCellAmount = (
  matrix: Matrix,
  id: CellId,
  newAmount: number
): Matrix => {
  return matrix.map((row) =>
    row.map((cell) => (cell.id === id ? { ...cell, amount: newAmount } : cell))
  );
};
