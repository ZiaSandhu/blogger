var axios = require("axios").default;

const getAccessToken = async() => {
  // console.info('Get access token')
    var options = {
        method: 'POST',
        url: 'https://blogger.uk.auth0.com/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'ayb6QRcz7W4VOsrCsfQVqtjTpzd67a4J',
          client_secret: 'k-Bx75S4g5EVYTPADjF2Wo7NIcsLcKcwb4CzHBBihjIuufx_m0pdru2O9YIbZOHn',
          audience: 'https://blogger.uk.auth0.com/api/v2/'
        })
      };
    //   let accessToken
    try {
      let response = await axios.request(options)
      return response.data.access_token
    } catch (error) {
      console.log("🚀 ~ file: getUserDetail.js:23 ~ getAccessToken ~ error:", error.response.data)
    }
}

const getUserDetailById = async(userId,token) => {
    // let id = userId.replace('|','%')
    // console.log("🚀 ~ file: getUserDetail.js:27 ~ getUserDetailById ~ id:", id)
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://blogger.uk.auth0.com/api/v2/users/${userId}?fields=name%2Cpicture%2Cnickname`,
        headers: { 
            'Accept': 'application/json', 
          'Authorization': `Bearer ${token}`
        }
    };
      
    try {
      let response = await axios.request(config)
      // console.log("🚀 ~ file: getUserDetail.js:39 ~ getUserDetailById ~ response:", response)
      let user = JSON.stringify(response.data)
      // console.log("🚀 ~ file: getUserDetail.js:40 ~ getUserDetailById ~ user:", user)
      return user
    } catch (error) {
      console.log("🚀 ~ file: getUserDetail.js:43 ~ getUserDetailById ~ error:", error.response.data)
      // return error.response.data
    }
      
}

module.exports = {
    getAccessToken,
    getUserDetailById
}
// get users
// let config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     url: 'https://blogger.uk.auth0.com/api/v2/users',
//     headers: { 
//       'Accept': 'application/json', 
//       'Authorization': 'Bearer 🔒'
//     }
//   };
  
//   axios.request(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// // user deatial

