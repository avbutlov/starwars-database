import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";

import { SwapiServiceProvider } from "../swapi-service-context";
import { PeoplePage, PlanetsPage, StarshipsPage} from "../pages";

import "./app.css";

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService()
  };





  render() {


    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header />

              <RandomPlanet />
              <Switch>
              <Route path="/" exact render={() => <h2>Welcome to StarWars DataBase</h2>} />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets/:id?" component={PlanetsPage} />
              <Route path="/starships/:id?" component={StarshipsPage} exact />
        

              <Route render={() => <h2>Page not found</h2>}/>
              </Switch>
            </div>

          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
