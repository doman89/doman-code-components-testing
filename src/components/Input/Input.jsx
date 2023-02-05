import { clsx } from "clsx";

export function Input({
  isDisabled,
  isError,
  isReadOnly,
  ...props
}) {
  return (
    <input
      className={clsx([
        "input",
        {
          "input--disabled": isDisabled,
          "input--error": isError,
        },
      ])}
      disabled={isDisabled}
      readOnly={isReadOnly}
      {...props}
    />
  );
}
