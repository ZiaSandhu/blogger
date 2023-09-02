const { auth } = require('express-oauth2-jwt-bearer');
// const jwt = require('express-jwt')
// const jwks = require('jwks-rsa')
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: 'https://bloggerdemo.com',
    issuerBaseURL: 'https://blogger.uk.auth0.com/',
    // tokenSigningAlg: 'RS256'
  });
//   const verifyJwt = jwt({
//         secret: jwks.expressJwtSecret({
//             cache: true,
//             rateLimit: true,
//             jwksRequestsPerMinute:5,
//             jwksUri:
    
//         }),
//         audience: 'https://bloggerdemo.com',
//         issuer: 'https://blogger.uk.auth0.com/',
//         algorithm: ['RS256']
//       })
module.exports = checkJwt