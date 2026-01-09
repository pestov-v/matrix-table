export type CellId = number;
export type CellValue = number;

export interface Cell {
  id: CellId;
  amount: CellValue;
}

export type MatrixRow = Cell[];

export type Matrix = MatrixRow[];

export interface MatrixParams {
  M: number;
  N: number;
  X: number;
}

export interface MatrixState {
  matrix: Matrix;
  params: MatrixParams;
  hoveredCellId: CellId | null;
  hoveredSumRowIndex: number | null;
  nearestCellIds: Set<CellId>;
}

export interface MatrixActions {
  initializeMatrix: (params: MatrixParams) => void;
  incrementCell: (id: CellId) => void;
  addRow: () => void;
  removeRow: (rowIndex: number) => void;
  setHoveredCell: (id: CellId | null) => void;
  setHoveredSumRow: (rowIndex: number | null) => void;
}

export interface MatrixContextType extends MatrixState, MatrixActions {}
