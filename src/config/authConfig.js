import dotenv from "dotenv";
dotenv.config();

export default
	{
		secret: process.env.JWT_SECRET,
		expiresIn: "7d",
		// refresh token settings (use env vars in production)
		refreshSecret: process.env.REFRESH_SECRET || process.env.JWT_SECRET,
		refreshExpiresIn: process.env.REFRESH_EXPIRES || "30d",
	}   
