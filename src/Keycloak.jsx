import React, { Component } from 'react';
import { object, func, any } from 'prop-types';
import KeycloakAuth from './KeycloakAuth';

class Keycloak extends Component {
  static propTypes = {
    config: object,
    onHandleLogout: func,
    children: any,
  };

  static childContextTypes = {
    keycloak: object,
  };

  constructor( props ) {
    super( props );

    /* Get the config from the props */
    const { config, onHandleLogout } = props;

    /* Create a new instance of Keycloak authentication */
    const keycloak = new KeycloakAuth( config );

    /* Create the logout handler if it is specified */
    if ( onHandleLogout ) {
      keycloak.setLogoutHandler( onHandleLogout );
    }

    this.keycloak = keycloak;
  }

  getChildContext() {
    console.log( this );
    return {
      keycloak: this.keycloak,
    };
  }

  render() {
    return this.props.children;
  }
}

export default Keycloak;
