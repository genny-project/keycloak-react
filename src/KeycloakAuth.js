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

  logout( options ) {
    this.keycloak.logout( options );
  }

  register( options ) {
    window.location.href = this.keycloak.createRegisterUrl( options );
  }

  account( options ) {
    this.keycloak.accountManagement( options );
  }

  getToken() {
    return this.keycloak.token;
  }

  getRealm() {
    return this.keycloak.realm;
  }

  getRoles() {
    return this.keycloak.realmAccess.roles;
  }

  getRefreshToken() {
    return this.keycloak.refreshToken;
  }

  getInfo() {
    if ( !this.keycloak.tokenParsed ) {
      return null;
    }

    const { email, family_name, given_name, name, sub } = this.keycloak.tokenParsed;
    return {
      email,
      family_name,
      given_name,
      name,
      id: sub,
    };
  }
}

export default KeycloakAuth;
