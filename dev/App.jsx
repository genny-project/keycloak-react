import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Keycloak } from '../src';

class App extends Component {
  render() {
    return (
      <Keycloak />
    );
  }
}

ReactDOM.render( <App />, document.getElementById( 'root' ));
