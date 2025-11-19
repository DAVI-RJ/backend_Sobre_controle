import bcrypt from "bcryptjs"
import Companies from "../models/Companies.js";
import AppError from "../utils/AppErrors.js";
import TokenServices from "./TokenServices.js";

class AuthService {
  async validateUser(email, password){
    const company = await Companies.findOne({where: {email}})
    if(!company) throw new AppError("User not found", 404)

    const passwordMatch = await bcrypt.compare(password, company.password);
    if (!passwordMatch) throw new AppError("Incorrect password", 401);

    return company
  }

  async getToken(company){
    const payload = {id: company.id}; 
    const accessToken = TokenServices.createAccessToken(payload);
    const refreshToken = TokenServices.createRefreshToken(payload);
  
    return {accessToken, refreshToken}
  } 

}

export default new AuthService(); 