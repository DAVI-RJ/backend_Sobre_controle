import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import routes  from "./Routes.js";
import errorMiddleware from "./app/middlewares/ErrorMiddlewares.js";

// import para conectar o postgres
import "./database/index.js";

class app {
	constructor(){
			this.server = express();

			// Quando estiver atrás de um proxy (heroku/nginx/etc) isso permite
			// que o express reconheça o protocolo original (https) e assim
			// cookies com { secure: true } possam funcionar.
			this.server.set('trust proxy', 1);

			this.middlewares();
			this.routes();

			// error middleware deve vir POR ÚLTIMO
			this.server.use(errorMiddleware);
	}

	middlewares() {
		this.server.use(express.json());
		// parser para cookies 
		this.server.use(cookieParser());

		const FRONTEND_URL = process.env.FRONTEND_URL;

		const corsOptions = {
			origin: (origin, callback) => {
				if (!origin){
					return callback(null, true);
				}
				const whitelist = [FRONTEND_URL];
				if (whitelist.indexOf(origin) !== -1) {
					callback(null, true);
				} else {
					callback(new Error('Not allowed by CORS'));
				}
			},
			// sets para cookies
			credentials: true, 
			methods: ['GET','POST','PUT','DELETE','OPTIONS'],
			allowedHeaders: ['Content-Type','Authorization']
		};

		// usar as configuraçẽs do cors
		this.server.use(cors(corsOptions));
	}

	routes (){
			this.server.use(routes);
	}
}

export default new app().server;