import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import CreateEvent from './container/CreateEvent/CreateEvent';
import Events from './container/Events/Events';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/events" component={Events} />
        <Route path="/" component={CreateEvent} exact />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div className="app">
        <Navbar />
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
