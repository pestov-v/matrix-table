import type { ButtonHTMLAttributes, FC } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "success";
}

export const Button: FC<ButtonProps> = (props) => {
  const { className = "", variant = "primary", children, ...rest } = props;
  const variantClass = styles[variant];

  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
