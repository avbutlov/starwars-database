import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';

import './app.css';
import ErrorButton from '../error-button/error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page/people-page';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ItemDetails from '../item-details';
import ErrorBoundry from '../error-boundry';
import { Record } from '../item-details/item-details';

import {
  SwapiServiceProvider,
} from '../swapi-context-service';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

export default class App extends Component {
  constructor() {
    super();

    this.swapiService = new SwapiService();

    this.state = {
      showRandomPlanet: true,
      selectedPerson: null,
      hasError: false,
    }

    

  }

  componentDidCatch() {
    console.log('error')
    this.setState({
      hasError: true
    })
  }


  render() {

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPeople,
            getAllPlanets } = this.swapiService;


    // const personDetails = (
    //   <ItemDetails 
    //   itemId={11} 
    //   getData={getPerson} 
    //   getImageUrl={getPersonImage}>
    //   <Record field="gender" label="Gender" />
    //   <Record field="eyeColor" label="Eye Color" />
    // </ItemDetails>
    // )

    // const starshipDetails = (
    //   <ItemDetails 
    //   itemId={9} 
    //   getData={getStarship} 
    //   getImageUrl={getStarshipImage}
    //   >
      
    //   <Record field="model" label="Model" />
    //   <Record field="length" label="Length" />
    //   <Record field="costInCredits" label="Cost" />

    //  </ItemDetails>   
    // )

    if (this.state.hasError) {
      return <ErrorIndicator/>
    }

  return (
   
    <ErrorBoundry>

    <SwapiServiceProvider value={this.swapiService}>

    <div className="stardb-app">
      <Header />

      <PersonDetails itemId={11}/>
      <PlanetDetails itemId={11}/>
      <StarshipDetails itemId={11}/>


      <PersonList />

      <PlanetList />

      <StarshipList />
   

    </div>
    </SwapiServiceProvider>
  </ErrorBoundry>


  );
  }
};
