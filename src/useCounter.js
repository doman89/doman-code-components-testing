import { useState } from "react";

export function useCounter({
  defaultValue = 0,
  maxValue = Infinity,
  minValue = -Infinity,
} = {}) {
  const [counterValue, setCounterValue] =
    useState(defaultValue);

  const increment = () => {
    if (counterValue === maxValue) {
      return;
    }

    setCounterValue((previousValue) => ++previousValue);
  };

  const decrement = () => {
    if (counterValue === minValue) {
      return;
    }

    setCounterValue((previousValue) => --previousValue);
  };

  const reset = () => {
    if (
      defaultValue > maxValue ||
      defaultValue < minValue
    ) {
      return setCounterValue(0);
    }

    setCounterValue(defaultValue);
  };

  const setValue = (value = defaultValue) => {
    if (value > maxValue || value < minValue) {
      return setCounterValue(0);
    }

    setCounterValue(value);
  };

  return {
    counterValue,
    decrement,
    increment,
    reset,
    setValue,
  };
}
