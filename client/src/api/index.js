import axios from 'axios' 
// import {useAuth0} from "@auth0/auth0-react"

const BACKENDURL = import.meta.env.VITE_REACT_APP_BACKENDURL

const apiCall = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json'
    }
})

export const getUsers = async() => {

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://blogger.uk.auth0.com/api/v2/users',
          headers: { 
            'Accept': 'application/json'
          }
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
        
}

export const createBlogApiCall = async(data) => {
    let response
    try {
        response = await apiCall.post('/blog',data)
    } catch (error) {
        response = error
    }
    return response
} 
export const getAllBlogsApiCall = async() => {
    let response
    try {
        response = await apiCall.get('/blogs')
        
    } catch (error) {
        response = error.response
    }
    return response
} 
export const getBlogByIdApiCall = async(id) => {
    let response
    try {
        response = await apiCall.get(`/blog/${id}`)
    } catch (error) {
        response = error.response
    }
    return response
} 
export const getBlogByUserApiCall = async(id) => {
    let response
    try {
        response = await apiCall.get(`/blogs/user/${id}`)
    } catch (error) {
        response = error.response
    }
    return response
} 
export const addCommentApiCall = async(data) => {
    let response
    try {
        response = await apiCall.post(`/addComment`,data)
    } catch (error) {
        response = error.response
    }
    return response
} 
export const addReplyApiCall = async(data) => {
    let response
    try {
        response = await apiCall.post(`/addReply`,data)
    } catch (error) {
        response = error.response
    }
    return response
} 
export const getCommentsApiCall = async(id) => {
    let response
    try {
        response = await apiCall.get(`/getCommentsByBlog/${id}`)
    } catch (error) {
        response = error.response
    }
    return response
} 

// axios.defaults.baseURL = 'http://localhost:5000';

// export const protectedApiCall = async(token) => {
//     let data = {
//         test: 'Testing',
//         id: 'id'
//     }
//     try {
//         const response = await axios.get('api/blog',{
//             headers:{
//                 authorization: `Bearer ${token}`,
//                 // 'Content-Type' : 'application/json'
//             }
//         })
//         console.log("success",response.data)
//     } catch (error) {
//         console.log("error",error.code)
//     }
// }
// export const simpleApiCall = async() => {
    
//     try {
//         const response = await axios.get('api/blog/1',{
//             headers:{
//                 // 'Authorization': `Bearer ${token}`,
//                 'Content-Type' : 'application/json'
//             }
//         })
//         console.log("success",response.data)
//     } catch (error) {
//         console.log("error",error.code)
//     }
// }