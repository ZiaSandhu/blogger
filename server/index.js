require('dotenv').config()
const express = require('express')
const dbConnect = require('./database/index')
const errorHandle = require('./middleware/errorHandle')
const router = require('./routes/index')
const {URI}  = require('./config/index')
const {PORT}  = require('./config/index')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
// const jwt = require('express-jwt')
// const jwks = require('jwks-rsa')
// const axios = require('axios')
// const jwtCheck = auth({
//     audience: 'https://bloggerdemo.com',
//     issuerBaseURL: 'https://blogger.uk.auth0.com/',
//     tokenSigningAlg: 'RS256'
//   });
  

//   const verifyJwt = jwt({
//     secret: jwks.expressJwtSecret({
//         cache: true,
//         rateLimit: true,

//     }),
//     audience: 'https://bloggerdemo.com',
//     issuer: 'https://blogger.uk.auth0.com/',
//     algorithm: ['RS256']
//   })
  // enforce on all endpoints
function start(){
    try {
        // app.use(jwtCheck);
        app.use(express.json({limit: '50mb'}))
        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
        }))
        app.use(cookieParser())
        app.use('/api',router)
        dbConnect(URI)
        app.use('/assets',express.static('assets'))
        app.use(errorHandle)

        app.listen(PORT,()=>{
            console.log(`Server is connected to port : ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}
start();