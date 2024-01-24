import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import withRouter from "../components/withRouter";

// Mock component to be wrapped with withRouter
const MockComponent: React.FC<any> = (props) => {
  return (
    <div>
      <p>{props.location.pathname}</p>
      <button onClick={() => props.navigate("/new-route")}>Navigate</button>
    </div>
  );
};

describe("withRouter", () => {
  it("passes navigate and location props", () => {
    const WrappedComponent = withRouter(MockComponent);

    const { getByText } = render(
      <MemoryRouter>
        <WrappedComponent />
      </MemoryRouter>
    );

    // Initial path
    expect(getByText("/")).toBeInTheDocument();

    // Navigate using the button
    act(() => {
      getByText("Navigate").click();
    });

    // Updated path
    expect(getByText("/new-route")).toBeInTheDocument();
  });
});
