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
routes.post("/companies", validateCompanies, CompaniesController.create);
routes.post("/address", validateAddress, AddressController.create);

/* routas privadas */ 
routes.use(authToken); 

routes.get("/address/", AddressController.show); 
routes.put("/address/:id", AddressController.update);
routes.delete("/address/:id", AddressController.destroy);

routes.get("/companies/:id", CompaniesController.show); 
routes.put("/companies/:id", CompaniesController.update); 
routes.delete("/companies/:id", CompaniesController.destroy); 

routes.post("/supplier", SupplierController.create);
routes.delete("/supplier/:id", SupplierController.destroy);

routes.get("/products", productsControllers.show);
routes.get("/porducts/:id", productsControllers.index); 
routes.post("/products", validateProduct, productsControllers.create); 
routes.put("/products/:id", productsControllers.update);
routes.delete("/products/:id", productsControllers.destroy);


export default routes;