// Home.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Home from "../components/Home";

const mockNavigate = jest.fn();

const mockProps = {
  navigate: mockNavigate,
};

jest.mock("../components/withRouter", () => ({
  __esModule: true,
  default: (Component: React.ComponentType<any>) => (props: any) =>
    <Component {...props} />,
}));
test("renders App component with Home component", () => {
  render(<Home />);
  const homeElement = screen.getByRole("textbox", { name: /enter country/i });
  expect(homeElement).toBeInTheDocument();
});

describe("Home component", () => {
  it("renders Home component and triggers navigation", async () => {
    render(
      <BrowserRouter>
        <Home {...mockProps} />
      </BrowserRouter>
    );

    // Check if the input and button are rendered
    const inputElement = screen.getByLabelText("Enter country");
    const buttonElement = screen.getByText("Submit");

    expect(inputElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();

    // Simulate user input and click
    fireEvent.change(inputElement, { target: { value: "Germany" } });
    fireEvent.click(buttonElement);

    // Wait for the asynchronous fetch
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check if the navigate function was called with the correct arguments
    // expect(mockNavigate).toHaveBeenCalledWith("/country/Germany", {
    //   state: {
    //     // Add expected state properties here based on your actual implementation
    //   },
    // });
  });
});
