/* eslint-disable */ 
import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: 'go-everpay.auth0.com', //process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: "OLKwEH0FnuOs7yT7lcNSHXCrY5H8K6Oh",
      redirectUri: window.location.origin+ '/callback',
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  register = (params) => {

    // this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if(authResult && authResult.accessToken && authResult.idToken){
        this.setSession(authResult);
        {setTimeout(() => {
            alert(JSON.stringify(localStorage.getItem('data'), null, 2));
            this.history.push("/");
          }, 100);}
      }else if(err){
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = authResult => {
    console.log(authResult);
    // set the time that the access token will expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  };

  isAuthenticated(){
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}