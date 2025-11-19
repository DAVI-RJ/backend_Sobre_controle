import AuthService from '../services/AuthServices.js';
import AppError from '../utils/AppErrors.js';
import TokenServices from '../services/TokenServices.js';

class LoginController {
  // login user
  async show (req, res, next) { 
    const { email, password } = req.body;
    
    try {
      if(!email || !password) new AppError("Email and password are required", 400); 

      const company = await AuthService.validateUser(email,password); 
      const {accessToken, refreshToken} = await AuthService.getToken(company)    

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict', 
        path: '/refresh',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      return res.json({ accessToken});

    }catch (err) {
      next(err); 
    }
  }

  async refresh (req, res, next) {
    const cookiesToken = req.cookies.refreshToken; 

    try {
      if(!cookiesToken) throw new AppError('Refresh token not provided', 401);

      let payload;
      try {
        payload = TokenServices.verifyRefreshToken(cookiesToken)
      } catch {
        throw new AppError("Invalid refresh token", 401);
      }

      const {accessToken, refreshToken} = await AuthService.getToken({id: payload.id});
      
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict', 
        path: '/refresh',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      return res.json({accessToken});

    }catch(err){
      next(err);
    }
  }
}
export default new LoginController();
