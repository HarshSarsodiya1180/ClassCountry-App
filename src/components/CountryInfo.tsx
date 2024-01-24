// CountryInfo.tsx
import { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import withRouter from "./withRouter";

interface CountryInfoProps {
  location: any;
}

interface CountryInfoState {
  countryName: string;
  countryCapital: string;
  countryPopulation: number;
  countryLatlng: number[];
  temperature: number;
  humidity: number;
  countryFlag: string;
}

class CountryInfo extends Component<CountryInfoProps, CountryInfoState> {
  constructor(props: CountryInfoProps) {
    super(props);
    if (!this.props.location.state) {
      window.location.assign("/");
    }
    this.state = {
      countryName: this.props.location.state.countryName,
      countryCapital: this.props.location.state.countryCapital,
      countryPopulation: this.props.location.state.countryPopulation,
      countryLatlng: this.props.location.state.countryLatlng,
      temperature: 0,
      humidity: 0,
      countryFlag: this.props.location.state.countryFlag,
    };
    console.log("State", this.state);
  }
  handleCapitalWeather = async () => {
    const API_KEY = "219a2192a6aa4bd110a5dcdc49aa72a0";
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.countryName}&appid=${API_KEY}`
      );
      const data = await response.json();

      this.setState({
        temperature: data.main.temp,
        humidity: data.main.humidity,
      });

      console.log("weather", data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  render() {
    const {
      countryName,
      countryCapital,
      countryPopulation,
      countryLatlng,
      temperature,
      humidity,
      countryFlag,
    } = this.state;

    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {countryName ? (
          <>
            <h2>{countryName}</h2>
            <p>Capital: {countryCapital}</p>
            <p>Population: {countryPopulation}</p>
            <p>Latitude: {countryLatlng[0]}</p>
            <p>Longitude: {countryLatlng[1]}</p>
            {temperature !== 0 && humidity !== 0 && (
              <div>
                <p>Temperature: {temperature}</p>
                <p>Humidity: {humidity}</p>
              </div>
            )}
            <img
              src={countryFlag}
              alt="Flag"
              style={{ width: "100px", height: "auto" }}
            />
            <hr />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleCapitalWeather}
            >
              Capital Weather
            </Button>
            <br />
            <Link to="/">Back to Home</Link>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default withRouter(CountryInfo);
