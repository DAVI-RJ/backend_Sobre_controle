import TokenServices from "../services/TokenServices.js";
import AppError from "../utils/AppErrors.js";

// middleware para verificar o token no cabeçalho
export default async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ error: "Token not provided" });
	}

	// Primeiro declare o token
	const [, token] = authHeader.split(" ");
	try {
		const decoded = await TokenServices.verifyAccessToken(token);
		req.userId = decoded.id;
		req.companyId = decoded.company_id;
		
		return next();

	} catch(err) {
		return next(new AppError("Token invalid", 401, err));
	}
};

