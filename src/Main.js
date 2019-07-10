
import React, { Component } from 'react';
import {  Route, Redirect, Switch } from 'react-router-dom';
import Example from '../src/Example/Example';


class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
         
                <Switch>
                    <Route path='/Board/:id' component={ Example } />
                 
                    <Route exact path='/login' component={ Example } />
                    <Redirect from='*' to='/' />
                </Switch>
           
        );
    }
};

export default Main;