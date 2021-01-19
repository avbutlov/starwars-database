import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {

  constructor() {
    super();

    this.swapiService = new SwapiService();

    this.state = {
      peopleList: null,
    }

    this.renderItems = (arr) => {
      return arr.map(({id, name}) => {
        return (
          <li className="list-group-item" 
          key={id} 
          onClick={() => this.props.onItemSelected(id)}>
            {name}
          </li>
        )
      })
    }
  }

  componentDidMount() {
    this.swapiService
    .getAllPeople()
    .then((peopleList) => {
      this.setState({
        peopleList
      })
    })
  }

  render() {

    const { peopleList } = this.state;

    if (!peopleList) {
      return <Spinner />
    }

    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
       {items}
      </ul>
    );
  }
}
