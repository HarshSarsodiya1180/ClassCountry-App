import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import withRouter from "./withRouter";

interface IPROS {
  navigate: any;
}
interface CountryInfoState {
  countryName: string;
  countryInput: string;
  countryCapital: string;
  countryPopulation: number;
  countryLatlng: number[];
  temperature: number;
  humidity: number;
  countryFlag: string;
  // weatherData: any;
}

class Home extends Component<IPROS, CountryInfoState> {
  state: CountryInfoState = {
    countryInput: "",
    countryName: "",
    countryCapital: "",
    countryPopulation: 0,
    countryLatlng: [],
    temperature: 0,
    humidity: 0,
    countryFlag: "",
    // weatherData: null,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (!/\d/.test(inputValue)) {
      this.setState({ countryInput: inputValue });
    }
  };

  handleSubmit = async () => {
    const { countryInput } = this.state;
    if (countryInput.trim() !== "") {
      console.log("Submit form working", countryInput);
      // Use Navigate to programmatically navigate
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryInput.trim()}?fullText=true`
        );
        const data = await response.json();
        console.log(data);
        this.props.navigate(`/country/${countryInput.trim()}`, {
          state: {
            countryCapital: data[0].capital,
            countryName: data[0].name.common,
            countryPopulation: data[0].population,
            countryLatlng: data[0].latlng,
            countryFlag: data[0].flags.png,
          },
        });
      } catch (error) {
        console.error("Error fetching country data", error);
      }
    }
  };

  render() {
    const { countryInput } = this.state;

    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <TextField
          label="Enter country"
          placeholder="Enter country"
          value={countryInput}
          onChange={this.handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}
          disabled={!countryInput.trim()}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default withRouter(Home);
