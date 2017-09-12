import keycloak from 'keycloak-js';

class KeycloakAuth {
  constructor( config ) {
    this.keycloak = keycloak( config );
    window.keycloak = this.keycloak;
  }

  getKeycloak() {
    return this.keycloak;
  }

  isLoggedIn() {
    return false;
  }

  setLogoutHandler( handler ) {
    this.keycloak.onAuthLogout = () => handler();
  }
}

export default KeycloakAuth;
