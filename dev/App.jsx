import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Keycloak, KeycloakStatus, KeycloakLogin, KeycloakLogout, KeycloakRegister, KeycloakLoggedIn, KeycloakLoggedOut } from '../src';
import keycloak from 'keycloak-js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggingIn: false,
      loggingOut: false,
      registering: false,
    };
  }

  onAuthSuccess = ( keycloak ) => {
    console.log( keycloak.getInfo());
  }

  render() {
    const config = {
      url: 'https://keycloak.pleasedproperty.com.au/auth',
      realm: 'pleased',
      clientId: 'pleased',
    };

    const { registering, loggingIn, loggingOut } = this.state;

    return (
      <Keycloak config={config} adapter={keycloak} defaultRedirectUri={'http://localhost:7000/'} onAuthSuccess={this.onAuthSuccess}>
        { registering && <KeycloakRegister force /> }
        { loggingIn && <KeycloakLogin force /> }
        { loggingOut && <KeycloakLogout force /> }

        <KeycloakLoggedIn>
          <b>This only shows when you are logged in</b>
          <br />
          <KeycloakStatus>
            {keycloak => (
              <div>
                <div><b>Token: </b>{keycloak.getToken()}</div>
                <br />
                <div><b>ID: </b>{keycloak.getInfo().id}</div>
                <div><b>Email: </b>{keycloak.getInfo().email}</div>
                <div><b>First Name: </b>{keycloak.getInfo().given_name}</div>
                <div><b>Last Name: </b>{keycloak.getInfo().family_name}</div>
                <div><b>Roles: </b>{keycloak.getRoles().join( ', ' )}</div>
              </div>
            )}
          </KeycloakStatus>

          <br />

          <div>
            <a href='#' onClick={() => this.setState({ loggingOut: true })}>Logout</a>
          </div>

          <KeycloakLoggedIn role="wizard">
            Only magical wizards will see this one
          </KeycloakLoggedIn>
        </KeycloakLoggedIn>

        <KeycloakLoggedOut>
          <b>This only shows when you are logged out</b>
          <br />
          <div>
            <a href='#' onClick={() => this.setState({ loggingIn: true })}>Login</a>
          </div>
          <div>
            <a href='#' onClick={() => this.setState({ registering: true })}>Register</a>
          </div>
        </KeycloakLoggedOut>
      </Keycloak>
    );
  }
}

ReactDOM.render( <App />, document.getElementById( 'root' ));
