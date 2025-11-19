import {Router} from "express";
import { validateAddress, validateCompanies, validateLogin, validateProduct } from "./app/middlewares/ValidateSchema.js";

import authToken from "./app/middlewares/Auth.js";

import CompaniesController from "./app/controllers/CompaniesControllers.js";
import AddressController from "./app/controllers/AddressControllers.js";
import LoginController from "./app/controllers/LoginControllers.js";
import SupplierController from "./app/controllers/SuppliersControllers.js";
import productsControllers from "./app/controllers/ProductsControllers.js"; 

const routes = new Router();

routes.get("/", (req, res) => {
  res.json({message: "hello"});
});

routes.post("/login", validateLogin, LoginController.show);
routes.post("/refresh", LoginController.refresh);
routes.post("/company/register", validateCompanies, CompaniesController.create);
routes.post("/company/address", validateAddress, AddressController.create);

/* routas privadas */ 
routes.use(authToken); 

routes.get("/address/", AddressController.show); 
routes.put("/address/:id", AddressController.update);
routes.delete("/address/:id", AddressController.destroy);

routes.get("/company/:id", CompaniesController.show); 
routes.put("/company/:id", CompaniesController.update); 
routes.delete("/company/:id", CompaniesController.destroy); 

routes.post("/company/supplier", SupplierController.create);
routes.delete("/company/supplier/:id", SupplierController.destroy);

routes.get("/company/:companyId/products", productsControllers.show);
routes.get("/company/:companyId/products/:id", productsControllers.index);
routes.post("/company/:companyId/products", validateProduct, productsControllers.create); 
routes.put("/company/:companyId/products/:id", productsControllers.update);
routes.delete("company/:companyId/products/:id", productsControllers.destroy);


export default routes;