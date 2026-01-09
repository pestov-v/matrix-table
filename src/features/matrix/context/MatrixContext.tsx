import { createContext, useContext } from "react";
import type { MatrixContextType } from "../../../shared/types";

export const MatrixContext = createContext<MatrixContextType | null>(null);

export const useMatrixContext = (): MatrixContextType => {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error("useMatrixContext must be used within MatrixProvider");
  }
  return context;
};
