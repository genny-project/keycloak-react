import React, { Component } from 'react';
import { func, object } from 'prop-types';

class KeycloakStatus extends Component {
  static propTypes = {
    children: func,
  };

  static contextTypes = {
    keycloak: object,
  }

  render() {
    const { children } = this.props;

    if ( children ) {
      return children( this.context.keycloak );
    }
  }
}

export default KeycloakStatus;
