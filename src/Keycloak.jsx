import React, { Component } from 'react';
import { object, func, any, string } from 'prop-types';
import KeycloakAuth from './KeycloakAuth';

class Keycloak extends Component {
  static propTypes = {
    config: object.isRequired,
    onHandleLogout: func,
    onAuthSuccess: func,
    children: any,
    defaultRedirectUri: string,
    adapter: func.isRequired,
    loadingView: func,
  };

  static childContextTypes = {
    keycloak: object,
  };

  componentDidMount() {

    this._ismounted = true;
  }

  constructor( props ) {
    super( props );

    this.state = {
      ready: false
    };

    /* Get the config from the props */
    const { config, onHandleLogout, defaultRedirectUri, adapter, onAuthSuccess } = props;

    /* Create a new instance of Keycloak authentication */
    const keycloak = new KeycloakAuth( adapter, config );

    keycloak.setReadyHandler(() => {

        let timer = 0;
        if(!this._ismounted) {
            timer = 500;
        }

        setTimeout(() => {
            this.setState({ ready: true });
        }, timer)

        onAuthSuccess && onAuthSuccess( keycloak );
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
    const { loadingView } = this.props;

    if ( !ready ) {
      return loadingView ? loadingView() : null;
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Keycloak;
