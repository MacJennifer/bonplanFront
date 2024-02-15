import React, { Component } from "react";
import Map from "../components/Map";
import Menu from "../components/Navigation";
import "../styles/style.scss";

export class Home extends Component {
  render() {
    return (
      <div>
        <Menu />
        <h1>Quoi faire à Reims</h1>
        <Map />
      </div>
    );
  }
}

export default Home;
