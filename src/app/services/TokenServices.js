import JWT from "jsonwebtoken"; 
import authConfig from "../../config/authConfig.js";

class TokenServices {
  createAccessToken(payload){
    return JWT.sign(payload, authConfig.secret, {expiresIn: authConfig.expiresIn})
  }

  createRefreshToken(payload){
    return JWT.sign(payload, authConfig.refreshSecret, {expiresIn: authConfig.expiresIn})
  }

  verifyAccessToken(token) {
    return JWT.verify(token, authConfig.secret);
  }
}
export default new TokenServices();