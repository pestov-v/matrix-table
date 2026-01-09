import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useMatrixContext } from "../context";

export const useInputForm = () => {
  const { initializeMatrix } = useMatrixContext();

  const [m, setM] = useState<string>("5");
  const [n, setN] = useState<string>("5");
  const [x, setX] = useState<string>("3");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const xLimit = useMemo(() => {
    const mVal = parseInt(m) || 0;
    const nVal = parseInt(n) || 0;
    return mVal * nVal;
  }, [m, n]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const mVal = parseInt(m);
    const nVal = parseInt(n);
    const xVal = parseInt(x);

    if (isNaN(mVal) || mVal < 0 || mVal > 100) {
      newErrors.m = "M повинно бути від 0 до 100";
    }
    if (isNaN(nVal) || nVal < 0 || nVal > 100) {
      newErrors.n = "N повинно бути від 0 до 100";
    }
    if (isNaN(xVal) || xVal < 0 || xVal > xLimit) {
      newErrors.x = `X повинно бути від 0 до ${xLimit}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSetM = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseInt(value) > 100) return;
    setM(value);
  };

  const handleSetN = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseInt(value) > 100) return;
    setN(value);
  };

  const handleSetX = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseInt(value) > xLimit) return;
    setX(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    initializeMatrix({
      M: parseInt(m),
      N: parseInt(n),
      X: parseInt(x),
    });
  };

  return {
    m,
    n,
    x,
    xLimit,
    errors,
    handleSetM,
    handleSetN,
    handleSetX,
    handleSubmit,
  };
};
