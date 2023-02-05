import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { cloneElement } from "react";

import { Input } from "./Input";

describe("<Input />", () => {
  describe("match snapshot", () => {
    it("should pass for no props case", () => {
      snapshotComponent(<Input />);
    });
  });

  describe("testing interaction", () => {
    describe("controlled", () => {
      it("should call onChange handler after user interaction", async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();

        render(
          <Input
            data-testid="test"
            onChange={handleChange}
          />,
        );

        const inputElement = screen.getByTestId("test");

        await user.type(inputElement, "Test");
        expect(handleChange).toHaveBeenCalled();
      });

      it("should not change value when value prop is provided", async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();

        render(
          <Input
            data-testid="test"
            value="Doman"
            onChange={handleChange}
          />,
        );

        const inputElement = screen.getByTestId("test");

        await user.type(inputElement, "Test");
        expect(inputElement).toHaveValue("Doman");
      });

      it("should change value when both value and onChange props are provided", async () => {
        const ControlledInput = function () {
          const [value, setValue] = useState("");

          return (
            <Input
              data-testid="test"
              value={value}
              onChange={({ currentTarget }) =>
                setValue(currentTarget.value)
              }
            />
          );
        };

        const user = userEvent.setup();

        render(<ControlledInput />);

        const inputElement = screen.getByTestId("test");
        expect(inputElement).toHaveValue("");

        await user.type(inputElement, "Test");
        expect(inputElement).toHaveValue("Test");
      });
    });

    describe("uncontrolled", () => {
      it("should change vale after user interaction when is not disabled", async () => {
        const user = userEvent.setup();

        render(
          <Input data-testid="test" defaultValue="Doman" />,
        );

        const inputElement = screen.getByTestId("test");
        expect(inputElement).toHaveValue("Doman");
        expect(inputElement).toBeEnabled();

        await user.type(inputElement, "Test");
        expect(inputElement).toHaveValue("DomanTest");
      });

      it("should not change value after user interaction when is disabled", async () => {
        const user = userEvent.setup();

        render(
          <Input
            data-testid="test"
            defaultValue="Doman"
            isDisabled
          />,
        );

        const inputElement = screen.getByTestId("test");
        expect(inputElement).toHaveValue("Doman");
        expect(inputElement).toBeDisabled();

        await user.type(inputElement, "Test");
        expect(inputElement).toHaveValue("Doman");
      });

      it("should not change value after user interaction when is readonly", async () => {
        const user = userEvent.setup();

        render(
          <Input
            data-testid="test"
            defaultValue="Doman"
            isReadOnly
          />,
        );

        const inputElement = screen.getByTestId("test");
        expect(inputElement).toHaveValue("Doman");
        expect(inputElement).toBeEnabled();

        await user.type(inputElement, "Test");
        expect(inputElement).toHaveValue("Doman");
      });
    });
  });
});

function snapshotComponent(component) {
  const { asFragment, getByTestId } = render(
    cloneElement(component, {
      "data-testid": "test",
    }),
  );

  const renderedComponent = getByTestId("test");

  expect(renderedComponent).toBeDefined();
  expect(asFragment()).toMatchSnapshot();
}
