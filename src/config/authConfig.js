import dotenv from "dotenv";
dotenv.config();

export default
	{
		secret: process.env.JWT_SECRET,
		expiresIn: "1h",

		// refresh token 
		refreshSecret: process.env.JWT_REFRESH_TOKEN, //process.env.REFRESH_SECRET || 
		refreshExpiresIn:"30d",
	}   
