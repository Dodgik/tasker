import React, { Component } from 'react';
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
          
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/login" component={Login} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/preview/" component={View} />
      </div>
    );
  }
}

export default App;