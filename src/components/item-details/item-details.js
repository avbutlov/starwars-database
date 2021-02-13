import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import ErrorButton from '../error-button/error-button';
import Spinner from '../spinner';

import './item-details.css';

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
          <span className="term">{label}</span>
          <span>{item[field]}</span>
        </li>
  )
}

export { Record };

export default class ItemDetails extends Component {

  constructor() {
    super();

    this.swapiService = new SwapiService();

    this.state = {
      item: null,
      loading: true,
      image: null
    };


   
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
        loading: false,
        image: getImageUrl(itemId) 
        });
      });
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
      this.setState({
        loading: true,
      })
    }
  }

  


  render() {
    console.log(this.state.image)
    const hasData = !(this.state.loading || !this.state.item)
    const noSelectedPersonWarning = !this.state.item ? <span>Select a person from a list</span> : null;
    const loading = this.state.loading && this.state.item ? <Spinner /> : null;
    const selectedPerson = hasData ? <PersonView itemDetails={this.state} itemProps={this.props}/> : null;

    return (
      <ErrorBoundry>
      <div className="person-details card">
    {noSelectedPersonWarning}
    {loading} 
    {selectedPerson}
      </div>
      </ErrorBoundry>
    )
  }
}


const PersonView = (props) => {

  const {item: {
    name
  }, item, image} = props.itemDetails;
console.log(item);
  const itemProps = props.itemProps;
  return (
    <React.Fragment>
    <img className="person-image"
      src={image} alt="character"/>

    <div className="card-body">
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
       {
       React.Children.map(itemProps.children, (child) => {
        return React.cloneElement(child, {item});
       })
       }
      </ul>
      <div className="row mb2 button-row">
        <ErrorButton/>
      </div>
    </div>
    
    </React.Fragment>
  )
}