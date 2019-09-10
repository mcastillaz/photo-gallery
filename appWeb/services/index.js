const jwt = require('jwt-simple');
const moment = require('moment');
const {  SECRET_TOKEN } = require('../keys');

function createToken (user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  return jwt.encode(payload, SECRET_TOKEN.key)
}

function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, SECRET_TOKEN.key)

      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'The token has expired'
        })
      }
      resolve(payload.sub)
    } catch (err) {
      reject({
        status: 500,
        message: 'Invalid Token'
      })
    }
  })

  return decoded
}

module.exports = {
  createToken,
  decodeToken
}