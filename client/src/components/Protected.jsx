import React  from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
const Protected = ({children}) => {
    // const location = useLocation()
    // const isAuth = useSelector((state)=>state.user.auth)
    // function protect()
        const {isAuthenticated} = useAuth0()
        if(isAuthenticated){
            return children
        }
        else{
            return <Navigate to='/login' />
        }

}

export default Protected