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
		this.server.set('trust proxy', 1);

		this.middlewares();
		this.routes();

		// errors
		this.server.use(errorMiddleware);
	}

	middlewares() {
		this.server.use(express.json());
		this.server.use(cookieParser());

		const FRONTEND_URL = process.env.FRONTEND_URL;

		// sets para cookies e rotas autorizadas
		const corsOptions = {
			credentials: true, 
			methods: ['GET','POST','PUT','DELETE','OPTIONS'],
			allowedHeaders: ['Content-Type','Authorization'],
			origin: (origin, callback) => {
				if (!origin){
					return callback(null, true);
				}
				const whitelist = [FRONTEND_URL];
				if (whitelist.includes(origin)) {
					callback(null, true);
				} else {
					callback(new Error('Not allowed by CORS'));
				}
			}
		};

		// usar as configuraçẽs do cors
		this.server.use(cors(corsOptions));
	}

	routes (){
			this.server.use(routes);
	}
}

export default new app().server;