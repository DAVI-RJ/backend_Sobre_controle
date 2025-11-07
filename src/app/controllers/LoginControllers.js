import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authConfig from '../../config/authConfig.js';
import Companies from '../models/Companies.js';

class LoginController {
  // login user
  async show (req, res, next) { 
    const { email, password } = req.body;
    
    try {
      const result = await Companies.findOne({ where: { email } });

      if (!result) {
        const error = new Error("user not found.");
        error.statusCode = 404;
        return next(error);
      }

      const passwordMatch = await bcrypt.compare(password, result.password);

      if (!passwordMatch) {
        const error = new Error("incorrect password.");
        error.statusCode = 401;
        return next(error);
      }

      const token = jwt.sign({ id: result.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      });

      res.json(token);

    } catch (err) {
      next(err); 
    }
  }

  //Endpoit para cookie HttpOnly
  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies && req.cookies.refreshToken;
      if (!refreshToken) {
        const error = new Error('Refresh token not provided');
        error.statusCode = 401;
        return next(error);
      }

      let payload;
      try {
        payload = jwt.verify(refreshToken, authConfig.refreshSecret);
      } catch (err) {
        err.statusCode = 401;
        return next(err);
      }

      const user = await Companies.findByPk(payload.id);
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        return next(error);
      }

      // novo access token
      const newAccessToken = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      });

      const newRefreshToken = jwt.sign({ id: user.id }, authConfig.refreshSecret, {
        expiresIn: authConfig.refreshExpiresIn
      });

      // HTTPS
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None', // frontend e Backend
        path: '/refresh',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 dias
      });

      return res.json({ token: newAccessToken });
    } catch (err) {
      next(err);
    }
  }
}
export default new LoginController();