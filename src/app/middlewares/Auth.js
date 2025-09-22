import JWT from 'jsonwebtoken';
import authConfig from '../../config/authConfig.js';

export default async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ error: "Token not provided" });
	}

	// Primeiro declare o token
	const [, token] = authHeader.split(" ");

	try {
		const decoded = await (JWT.verify)(token, authConfig.secret);

		req.userId = decoded.id;
		console.log(decoded);

		return next();

	} catch (err) {
		return res.status(401).json({ error: "Token invalid", err});
	}
};

