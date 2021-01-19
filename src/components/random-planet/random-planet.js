import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './random-planet.css';

export default class RandomPlanet extends Component {


  constructor() {
    super();

    this.SwapiService = new SwapiService();

    this.state = {
    planet: {},
    loading: true,
    }

    this.onPlanetLoaded = (planet) => {
      this.setState({
        planet,
        loading: false,
        error: false,
      })
    }

    this.onError = (err) => {
      this.setState({
        error: true,
        loading: false,
      })
    }

    this.updatePlanet = () => {
      const id = Math.floor(Math.random() * 25) + 3; 
      this.SwapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
    }

    setInterval(this.updatePlanet, 1500)
  }


  render() {

    const {planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;
    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>

    );
  }
}

const PlanetView = ({planet}) => {

  const { id, name, population, rotationPeriod, diameter } = planet;

  return(
    <React.Fragment>
      <img className="planet-image"
    src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`
    } alt='planetImage'/>
<div>
 <h4>{name}</h4>
 <ul className="list-group list-group-flush">
   <li className="list-group-item">
     <span className="term">Population</span>
     <span>{population}</span>
   </li>
   <li className="list-group-item">
     <span className="term">Rotation Period</span>
     <span>{rotationPeriod}</span>
   </li>
   <li className="list-group-item">
     <span className="term">Diameter</span>
     <span>{diameter}</span>
   </li>
 </ul>
</div>
    </React.Fragment>
  )
}