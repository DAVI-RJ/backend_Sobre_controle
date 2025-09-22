import express from "express";
import cors from "cors";
import routes  from "./Routes.js";
import errorMiddleware from "./app/middlewares/ErrorMiddlewares.js";

// import para conectar o postgres
import "./database/index.js";


class app {
    constructor(){
        this.server = express();
        this.server.use(cors());
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(errorMiddleware);
    }

    routes (){
        this.server.use(routes);
    }
}

export default new app().server;