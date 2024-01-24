//AppClass.tsx
import { Component } from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import CountryInfo from "./components/CountryInfo";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryName" element={<CountryInfo />} />
      </Routes>
    );
  }
}

export default App;
