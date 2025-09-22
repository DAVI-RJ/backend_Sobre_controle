import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authConfig from '../../config/authConfig.js';
import Companies from '../models/Companies.js';

class LoginController {
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
}
export default new LoginController();