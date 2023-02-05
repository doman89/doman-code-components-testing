import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { cloneElement } from "react";

import { Button } from "./Button";

describe("<Button />", () => {
  const snapshot = snapshotComponentWithTextContent("Test");

  describe("match snapshot", () => {
    it("should pass when size=medium variant=solid isLoading=false isDiabled=false", () => {
      snapshot(
        <Button
          isDisabled={false}
          isLoading={false}
          size="medium"
          variant="solid"
        />,
      );
    });

    it("should only class button when there is any additional props passed", () => {
      snapshot(<Button />);
    });

    it("should has disabled and base class when isDisabled props is passed", () => {
      snapshot(<Button isDisabled />);
    });
  });

  describe("testing interaction", () => {
    it("should be called onClick for non disabled button", async () => {
      const handleOnClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Button data-testid="test" onClick={handleOnClick}>
          Test
        </Button>,
      );

      const buttonElement = screen.getByTestId("test");

      await user.click(buttonElement);
      expect(handleOnClick).toHaveBeenCalled();
    });

    it("should not be called onClick for disabled button", async () => {
      const handleOnClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Button
          data-testid="test"
          isDisabled
          onClick={handleOnClick}
        >
          Test
        </Button>,
      );

      const buttonElement = screen.getByTestId("test");

      await user.click(buttonElement);
      expect(handleOnClick).not.toHaveBeenCalled();
    });
  });
});

function snapshotComponentWithTextContent(content) {
  return function (component) {
    const { asFragment, getByTestId } = render(
      cloneElement(component, {
        children: content,
        "data-testid": "test",
      }),
    );

    const renderedComponent = getByTestId("test");

    expect(renderedComponent).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  };
}

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
