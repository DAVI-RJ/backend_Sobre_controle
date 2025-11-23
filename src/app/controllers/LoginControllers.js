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

      return res.json({accessToken});

    }catch (err) {
      next(err); 
    }
  }
  
  // atualiza o token
  async refresh (req, res, next) {
    const cookiesToken = req.cookies.refreshToken; 
      if(!cookiesToken) throw new AppError('Refresh token not provided', 401);
      try {
        const payload = TokenServices.verifyRefreshToken(cookiesToken); 
        const company = await AuthService.validateUserById(payload.id);

          if(!company) throw new AppError('Company not found', 404);
          const {accessToken, refreshToken} = await AuthService.getToken(company);
        
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
