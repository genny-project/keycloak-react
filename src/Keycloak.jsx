import React, { Component } from 'react';
import { object, func, any, string } from 'prop-types';
import KeycloakAuth from './KeycloakAuth';

class Keycloak extends Component {
  static propTypes = {
    config: object.isRequired,
    onHandleLogout: func,
    children: any,
    defaultRedirectUri: string,
    adapter: func.isRequired,
  };

  static childContextTypes = {
    keycloak: object,
  };

  constructor( props ) {
    super( props );

    this.state = {
      ready: false
    };

    /* Get the config from the props */
    const { config, onHandleLogout, defaultRedirectUri, adapter } = props;

    /* Create a new instance of Keycloak authentication */
    const keycloak = new KeycloakAuth( adapter, config );

    keycloak.setReadyHandler(() => {
      this.setState({ ready: true });
    });

    keycloak.init();

    /* Create the logout handler if it is specified */
    if ( onHandleLogout ) {
      keycloak.setLogoutHandler( onHandleLogout );
    }

    /* Set the default redirect uri if it is specified */
    if ( defaultRedirectUri ) {
      keycloak.setDefaultRedirectUri( defaultRedirectUri );
    }

    this.keycloak = keycloak;
  }

  getChildContext() {
    return {
      keycloak: this.keycloak,
    };
  }

  render() {
    const { ready } = this.state;

    if ( !ready ) {
      return null;
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Keycloak;
