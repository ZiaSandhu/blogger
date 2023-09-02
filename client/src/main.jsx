import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
// import { Provider } from 'react-redux';
// import {store, persistor} from './store';
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="blogger.uk.auth0.com"
      clientId="MJUAFa2JhDANaAV8RH8rfPKyqG9Ym345"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      audience='https://bloggerdemo.com'
      // scope='openid profile email'

    >
      {/* <Provider store={store}> */}
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <App />
        {/* </PersistGate> */}
      {/* </Provider> */}
    </Auth0Provider>
    ,
  </React.StrictMode>
);
