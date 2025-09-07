import {Router} from "express";
import { validateAddress, validateCompanies, validateLogin } from "./app/middlewares/ValidateSchema.js"

import CompaniesController from "./app/controllers/CompaniesControllers.js";
import AddressController from "./app/controllers/AddressControllers.js"
import LoginController from "./app/controllers/LoginControllers.js";
import SupplierController from "./app/controllers/SuppliersControllers.js"

const routes = new Router();

routes.get("/", (req, res) => {
  res.json({message: "hello"})
});

routes.post("/address", validateAddress, AddressController.create);
routes.delete("/address/:id", AddressController.delete);
routes.put("/address/:id", AddressController.update);

routes.post("/companies", validateCompanies, CompaniesController.create); 

routes.post("/login", validateLogin, LoginController.show);

routes.post("/supplier", SupplierController.create);

export default routes;