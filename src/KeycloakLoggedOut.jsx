import React, { Component } from 'react';
import { object, any } from 'prop-types';

class KeycloakLoggedOut extends Component {
  static contextTypes = {
    keycloak: object,
  }

  static propTypes = {
    children: any,
  };

  render() {
    if ( this.context.keycloak.isLoggedIn()) {
      return null;
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default KeycloakLoggedOut;
