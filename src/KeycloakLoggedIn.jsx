import React, { Component } from 'react';
import { object, any, string } from 'prop-types';

class KeycloakLoggedIn extends Component {
  static contextTypes = {
    keycloak: object,
  }

  static propTypes = {
    children: any,
    role: string,
  };

  render() {
    const { keycloak } = this.context;

    if ( !keycloak.isLoggedIn()) {
      return null;
    }

    if ( this.props.role && keycloak.getRoles().indexOf( this.props.role ) < 0 ) {
      return null;
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default KeycloakLoggedIn;
