import axios from 'axios'

const authApiCall = axios.create({
    baseURL: 'https://blogger.uk.auth0.com/api/v2',
    // withCredentials: true,
    headers:{
        'Content-Type': 'application/json'
    }
})

export const getAllUsers = async(token) => {
    try {
        return await authApiCall.get('/userinfo',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        return error.response
    }
}