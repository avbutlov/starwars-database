import React, { Component } from 'react';
import Row from '../row';
import {
    PersonDetails,
    PersonList,
  } from "../sw-components";

export default class PeoplePage extends Component {


    state = {
        selectedItem: null,
    }

    onItemSelected = (selectedItem) => {
        this.setState({ selectedItem });
    }

    render() {

        const { selectedItem } = this.state;

        return (
            <Row left = {  <PersonDetails itemId={selectedItem} />}
            right = {<PersonList onItemSelected={this.onItemSelected} />}
            />
            
        )

    }

}


