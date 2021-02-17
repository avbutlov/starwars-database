import React, { Component } from 'react';
import Row from '../row';
import {
    PlanetDetails,
    PlanetList,
  } from "../sw-components";

export default class PlanetsPage extends Component {


    state = {
        selectedItem: null,
    }

    onItemSelected = (selectedItem) => {
        this.setState({ selectedItem });
    }

    render() {

        const {selectedItem} = this.state;

        return (
            <Row left = {  <PlanetDetails itemId={selectedItem}/>}
            right = {<PlanetList onItemSelected={this.onItemSelected}/>}
            />
            
        )

    }

}