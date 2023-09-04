import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
// import history from './utils/historyFile.js'

const AUTH_DOMAIN = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN 
const AUTH_CLIENTID = import.meta.env.VITE_REACT_APP_AUTH0_CLIENTID

// const onRedirectCallback = (appState) => {
//   history.push(
//     appState && appState.returnTo ? appState.returnTo : window.location.pathname
//   );
// };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH_DOMAIN}
      clientId={AUTH_CLIENTID}
      // onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://bloggerdemo.com",
        scope: "openid profile email",
      }}
      // state='mystateabc'
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
