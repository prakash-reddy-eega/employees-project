const {Users} = require('../models')
const jwt = require('jsonwebtoken')

const jwtTokenValidation = async (req, response, next) => {
    let jwtToken;
    const authHeader = req.headers.authorization
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(" ")[1];

      }
      if (jwtToken === undefined) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        jwt.verify(jwtToken, "my_jwt_token", async (error, payload) => {
          if (error) {
            response.status(401);
            response.send("Invalid JWT Token");
          } else {
            next();
          }
        });
      }

    // const dbUserDetails = await Users.find()
    // console.log(jwtToken)
}

module.exports = {
    jwtTokenValidation
}


