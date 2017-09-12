import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Keycloak, KeycloakStatus } from '../src';

class App extends Component {
  render() {
    const config = {
      url: 'https://keycloak.pleasedproperty.com.au/auth',
      realm: 'pleased',
      clientId: 'pleased',
    };

    return (
      <Keycloak config={config}>
        <KeycloakStatus>
          {keycloak => (
            <span>{keycloak.isLoggedIn() ? 'Logged In': 'Not Logged In'}</span>
          )}
        </KeycloakStatus>
      </Keycloak>
    );
  }
}

ReactDOM.render( <App />, document.getElementById( 'root' ));
