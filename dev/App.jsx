import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Keycloak, KeycloakStatus, KeycloakLogin } from '../src';
import keycloak from 'keycloak-js';

class App extends Component {
  render() {
    const config = {
      url: 'https://keycloak.pleasedproperty.com.au/auth',
      realm: 'pleased',
      clientId: 'pleased',
    };

    return (
      <Keycloak config={config} adapter={keycloak} defaultRedirectUri={'http://localhost:7000/'}>
        <KeycloakStatus>
          {keycloak => (
            <span>{keycloak.isLoggedIn() ? 'Logged In': 'Not Logged In'}</span>
          )}
        </KeycloakStatus>
        <KeycloakLogin />
      </Keycloak>
    );
  }
}

ReactDOM.render( <App />, document.getElementById( 'root' ));
