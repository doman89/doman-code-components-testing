import { clsx } from "clsx";

// type ButtonProps = {
//   children: ReactNode;
//   "data-testid"?: string;
//   isDisabled?: boolean;
//   isLoading?: boolean;
//   size?: "small" | "medium";
//   variant?: "solid" | "outlined";
// };

export function Button({
  children,
  isDisabled,
  isLoading,
  size = "medium",
  variant = "solid",
  ...restProps
}) {
  return (
    <button
      className={clsx([
        "button",
        {
          "button--disabled": isDisabled,
          "button--loading": isLoading,
          "button--small": size === "small",
          "button--outlined": variant === "outlined",
        },
      ])}
      disabled={isDisabled}
      {...restProps}
    >
      {children}
    </button>
  );
}
