class KeycloakAuth {
  constructor( adapter, config ) {
    this.defaultRedirectUri = '';
    this.keycloak = adapter( config );
    this.ready = false;
    this.readyHandler = () => {};
    window.keycloak = this.keycloak;
  }

  init() {
    this.keycloak.init({ onLoad: 'check-sso' }).success(() => {
      this.ready = true;
      this.readyHandler();
    }).error( err => {
      console.error( err );
    });
  }

  getKeycloak() {
    return this.keycloak;
  }

  isLoggedIn() {
    return this.keycloak.authenticated ? this.keycloak.authenticated : false;
  }

  isReady() {
    return this.ready;
  }

  setReadyHandler( handler ) {
    this.readyHandler = handler;
  }

  setLogoutHandler( handler ) {
    this.keycloak.onAuthLogout = () => handler();
  }

  getDefaultRedirectUri() {
    return this.defaultRedirectUri;
  }

  setDefaultRedirectUri( uri ) {
    this.defaultRedirectUri = uri;
  }

  login( options ) {
    this.keycloak.login( options );
  }
}

export default KeycloakAuth;
