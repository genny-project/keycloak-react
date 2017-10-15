import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Keycloak, KeycloakStatus, KeycloakLogin, KeycloakLogout, KeycloakRegister, KeycloakLoggedIn, KeycloakLoggedOut, KeycloakAccount } from '../src';
//import { Keycloak, KeycloakStatus, KeycloakLogin, KeycloakLogout, KeycloakRegister, KeycloakLoggedIn, KeycloakLoggedOut, KeycloakAccount } from '../src';
import keycloak from 'keycloak-js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggingIn: false,
      loggingOut: false,
      registering: false,
      loadingAccountPage: false,
    };
  }

  onAuthSuccess = ( keycloak ) => {
    console.log( keycloak.getInfo());
  }

  render() {
    const config = {
      url: 'http://192.168.99.100:8180/auth',
      realm: 'wildfly-swarm-keycloak-example',
      clientId: 'curl',
      credentials: {
        secret: '056b73c1-7078-411d-80ec-87d41c55c3b4'
      }
    };

    const { registering, loggingIn, loggingOut, loadingAccountPage } = this.state;

    return (
      <Keycloak config={config} adapter={keycloak} defaultRedirectUri={'http://localhost:7000/'} onAuthSuccess={this.onAuthSuccess}>
        { registering && <KeycloakRegister force /> }
        { loggingIn && <KeycloakLogin force /> }
        { loggingOut && <KeycloakLogout force /> }
        { loadingAccountPage && <KeycloakAccount force /> }

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
            <br />
            <a href='#' onClick={() => this.setState({ loadingAccountPage: true })}>View Account page</a>
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
