import React, { PropTypes, Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';
import Login from './components/Login';
import View from './components/View';


class App extends Component {
  render() {
    return (
      <div className="app-root">
        <Header />
          
        <Route exact path="/" render={(props) => (
          <Home {...props} />
        )} />
        <Route exact path="/create" render={(props) => (
          <Create {...props} />
        )} />
        <Route exact path="/login" render={(props) => (
          <Login {...props} />
        )} />
        <Route path="/edit/:id" render={(props) => (
          <Edit {...props} />
        )} />
        <Route path="/preview/" render={(props) => (
          <View {...props} />
        )} />
      </div>
    );
  }
}

export default App;