import { type FC } from "react";

import { Button, Input } from "../../../../shared/ui";
import { useInputForm } from "../../hooks/useInputForm";

import styles from "./InputForm.module.css";

export const InputForm: FC = () => {
  const state = useInputForm();
  const { m, n, x, xLimit, errors } = state;
  const { handleSetM, handleSetN, handleSetX, handleSubmit } = state;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="M (рядки)"
        id="input-m"
        type="number"
        min="0"
        max="100"
        value={m}
        onChange={handleSetM}
        error={errors.m}
      />

      <Input
        label="N (стовпці)"
        id="input-n"
        type="number"
        min="0"
        max="100"
        value={n}
        onChange={handleSetN}
        error={errors.n}
      />

      <div className={styles.inputGroup}>
        <Input
          label="X (найближчі)"
          id="input-x"
          type="number"
          min="0"
          max={xLimit}
          value={x}
          onChange={handleSetX}
          error={errors.x}
          hint={`Максимум: ${xLimit}`}
        />
      </div>

      <Button type="submit" variant="secondary" className={styles.submitButton}>
        Згенерувати таблицю
      </Button>
    </form>
  );
};
