import React  from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth0 } from '@auth0/auth0-react'
import { withAuthenticationRequired } from '@auth0/auth0-react';
const Protected = ({children}) => {
  const navigate = useNavigate();

  const onRedirectCallback = () => {
    // After a successful login, Auth0 will call this function.
    // You can use it to redirect the user back to the originally requested URL.

    // Retrieve the originally requested URL from sessionStorage
    const returnUrl = sessionStorage.getItem("returnUrl");

    // Redirect the user back to the originally requested URL or a default route if returnUrl is not set
    navigate(returnUrl || "/");
  };
  return <>{children}</>
}

export default withAuthenticationRequired(Protected,{
    onRedirectCallback,
})