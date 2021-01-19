import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './person-details.css';

export default class PersonDetails extends Component {

  constructor() {
    super();

    this.swapiService = new SwapiService();

    this.state = {
      person: null,
      loading: true,
    };


   
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({ 
        person,
        loading: false, 
        });
      });
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
      this.setState({
        loading: true,
      })
    }
  }

  


  render() {

    const hasData = !(this.state.loading || !this.state.person)
    const noSelectedPersonWarning = !this.state.person ? <span>Select a person from a list</span> : null;
    const loading = !hasData ? <Spinner /> : null;
    const selectedPerson = hasData ? <PersonView personDetails={this.state}/> : null;

    return (
      <div className="person-details card">
    {noSelectedPersonWarning}
    {loading} 
    {selectedPerson}
      </div>
    )
  }
}


const PersonView = (props) => {

  const {person: {
    id, name, gender, eyeColor, birthYear,
  }} = props.personDetails;

  return (
    <React.Fragment>
    <img className="person-image"
      src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="character"/>

    <div className="card-body">
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Gender</span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Birth Year</span>
          <span>{birthYear}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Eye Color</span>
          <span>{eyeColor}</span>
        </li>
      </ul>
    </div>
    </React.Fragment>
  )
}