import React, { Component } from "react";
import Menu from "../components/Navigation";

export class Home extends Component {
  render() {
    return (
      <div>
        <Menu />
        <h1>Accueil</h1>
      </div>
    );
  }
}

export default Home;
