import React, { Component } from 'react';
import { object, string, bool } from 'prop-types';

class KeycloakLogout extends Component {
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

    /* Log the user out */
    if ( keycloak.isLoggedIn() || force ) {
      keycloak.logout({ redirectUri: uri });
    }
  }

  render() {
    return null;
  }
}

export default KeycloakLogout;
