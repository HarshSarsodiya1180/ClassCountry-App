// CountryInfo.test.tsx
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import CountryInfo from "../components/CountryInfo";

jest.mock("../components/withRouter", () => ({
  __esModule: true,
  default: (Component: React.ComponentType<any>) => (props: any) =>
    <Component {...props} />,
}));

const mockLocationState = {
  state: {
    countryName: "Mock Country",
    countryCapital: "Mock Capital",
    countryPopulation: 1000000,
    countryLatlng: [0, 0],
    countryFlag: "mock-flag-url",
  },
};

const mockFetch = async () => {
  return {
    json: async () => ({
      main: {
        temp: 25,
        humidity: 60,
      },
    }),
  };
};

jest.mock("node-fetch", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(mockFetch),
}));

describe("CountryInfo component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders CountryInfo component with mock data", async () => {
    render(
      <BrowserRouter>
        <CountryInfo location={mockLocationState} />
      </BrowserRouter>
    );

    expect(screen.getByText("Mock Country")).toBeInTheDocument();
    expect(screen.getByText("Capital: Mock Capital")).toBeInTheDocument();
    expect(screen.getByText("Population: 1000000")).toBeInTheDocument();
    expect(screen.getByText("Latitude: 0")).toBeInTheDocument();
    expect(screen.getByText("Longitude: 0")).toBeInTheDocument();

    // Click the button to trigger weather fetch
    fireEvent.click(screen.getByText("Capital Weather"));

    // Wait for the asynchronous state update
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check if the weather data is displayed
    waitFor(() => {
      expect(screen.getByText("Temperature: 25")).toBeInTheDocument();
      expect(screen.getByText("Humidity: 60")).toBeInTheDocument();
    });
  });
});
