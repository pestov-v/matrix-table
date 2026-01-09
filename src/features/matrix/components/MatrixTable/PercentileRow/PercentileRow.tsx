import { useMemo, type FC } from "react";

import { useMatrixContext } from "../../../context";

import { calculateAllPercentiles } from "../../../../../shared/utils/calculations";

import styles from "./PercentileRow.module.css";

export const PercentileRow: FC = () => {
  const { matrix } = useMatrixContext();
  const percentiles = useMemo(() => calculateAllPercentiles(matrix), [matrix]);

  if (matrix.length === 0) return null;

  return (
    <tr className={styles.percentileRow}>
      <td className={styles.label}>60th Percentile</td>
      {percentiles.map((value, index) => (
        <td key={index} className={styles.value}>
          {value.toFixed(1)}
        </td>
      ))}
      <td className={styles.empty} />
      <td className={styles.empty} />
    </tr>
  );
};
