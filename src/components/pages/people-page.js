import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Row from '../row';
import {
    PersonDetails,
    PersonList,
  } from "../sw-components";

const PeoplePage = ({match, history}) => {

    const { id } = match.params;


        return (
            <Row left = {  <PersonDetails itemId={id} />}
            right = {<PersonList onItemSelected={(id) => {
                history.push(id);
            }} />}
            />
            
        )

}

export default withRouter(PeoplePage)