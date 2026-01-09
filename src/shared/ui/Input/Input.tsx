import { type FC, type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input: FC<InputProps> = (props) => {
  const { label, error, className = "", id, hint, ...rest } = props;
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={styles.input}
        {...rest}
      />
      {error && <span className={styles.errorText}>{error}</span>}
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
};
