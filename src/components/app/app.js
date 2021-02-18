import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import { SwapiServiceProvider } from "../swapi-service-context";
import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";

import "./app.css";
import { StarshipDetails } from "../sw-components";

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService(),
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      console.log(Service.name);

      return {
        swapiService: new Service(),
      };
    });
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />
              <Route path="/" exact render={() => <h2>Welcome to StarDB</h2>} />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" component={StarshipsPage} exact />
              <Route
                path="/starships/:id"            
                render={({match, location, history}) => {
                  const {id} = match.params;
                  return <StarshipDetails itemId={id}/>;
                }}
              />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
