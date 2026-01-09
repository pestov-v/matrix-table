import { useCallback, useMemo, useState, type FC, type ReactNode } from "react";
import type {
  CellId,
  Matrix,
  MatrixContextType,
  MatrixParams,
} from "../../../shared/types";
import { findNearestCells } from "../../../shared/utils/calculations";
import {
  createMatrix,
  createMatrixRow,
  findCellById,
  updateCellAmount,
} from "../../../shared/utils/matrixUtils";
import { MatrixContext } from "./MatrixContext";

interface MatrixProviderProps {
  children: ReactNode;
}

export const MatrixProvider: FC<MatrixProviderProps> = ({ children }) => {
  const [matrix, setMatrix] = useState<Matrix>([]);
  const [params, setParams] = useState<MatrixParams>({ M: 0, N: 0, X: 0 });
  const [hoveredCellId, setHoveredCellId] = useState<CellId | null>(null);
  const [hoveredSumRowIndex, setHoveredSumRowIndex] = useState<number | null>(
    null
  );

  const initializeMatrix = useCallback((newParams: MatrixParams) => {
    const newMatrix = createMatrix(newParams.M, newParams.N);
    setMatrix(newMatrix);
    setParams(newParams);
    setHoveredCellId(null);
    setHoveredSumRowIndex(null);
  }, []);

  const incrementCell = useCallback((id: CellId) => {
    setMatrix((prevMatrix) => {
      const cell = findCellById(prevMatrix, id);
      if (!cell) return prevMatrix;
      return updateCellAmount(prevMatrix, id, cell.amount + 1);
    });
  }, []);

  const addRow = useCallback(() => {
    if (params.N === 0) return;
    setMatrix((prevMatrix) => [...prevMatrix, createMatrixRow(params.N)]);
    setParams((prev) => ({ ...prev, M: prev.M + 1 }));
  }, [params.N]);

  const removeRow = useCallback((rowIndex: number) => {
    setMatrix((prevMatrix) =>
      prevMatrix.filter((_, index) => index !== rowIndex)
    );
    setParams((prev) => ({ ...prev, M: Math.max(0, prev.M - 1) }));
  }, []);

  const setHoveredCell = useCallback((id: CellId | null) => {
    setHoveredCellId(id);
  }, []);

  const setHoveredSumRow = useCallback((rowIndex: number | null) => {
    setHoveredSumRowIndex(rowIndex);
  }, []);

  const nearestCellIds = useMemo(() => {
    if (hoveredCellId === null || params.X <= 0) {
      return new Set<CellId>();
    }
    return findNearestCells({
      matrix,
      targetCellId: hoveredCellId,
      x: params.X,
    });
  }, [matrix, hoveredCellId, params.X]);

  const contextValue: MatrixContextType = useMemo(
    () => ({
      matrix,
      params,
      hoveredCellId,
      hoveredSumRowIndex,
      nearestCellIds,
      initializeMatrix,
      incrementCell,
      addRow,
      removeRow,
      setHoveredCell,
      setHoveredSumRow,
    }),
    [
      matrix,
      params,
      hoveredCellId,
      hoveredSumRowIndex,
      nearestCellIds,
      initializeMatrix,
      incrementCell,
      addRow,
      removeRow,
      setHoveredCell,
      setHoveredSumRow,
    ]
  );

  return (
    <MatrixContext.Provider value={contextValue}>
      {children}
    </MatrixContext.Provider>
  );
};
