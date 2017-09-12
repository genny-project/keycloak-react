import React, { Component } from 'react';
import { string, bool, object } from 'prop-types';

class KeycloakRegister extends Component {
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

    /* Take the user to the registration page */
    if ( !keycloak.isLoggedIn() || force ) {
      keycloak.register({ redirectUri: uri });
    }
  }

  render() {
    return null;
  }
}

export default KeycloakRegister;
