import React, { Component } from 'react';
import { object, string, bool } from 'prop-types';

class KeycloakLogin extends Component {
  static contextTypes = {
    keycloak: object,
  }

  static propTypes = {
    redirectUri: string,
    force: bool,
  }

  static defaultProps = {
    force: false,
  }

  componentDidMount() {
    /* Get the redirect uri from the props */
    const { redirectUri, force } = this.props;

    /* Get keycloak from the context */
    const { keycloak } = this.context;

    /* Use the default redirect uri if one wasn't provided */
    let uri = ( redirectUri ) ? redirectUri : keycloak.getDefaultRedirectUri();

    /* Log the user in */
    console.log( keycloak.isLoggedIn());
    if ( !keycloak.isLoggedIn() || force ) {
      keycloak.login({ redirectUri: uri });
    }
  }

  render() {
    return null;
  }
}

export default KeycloakLogin;
