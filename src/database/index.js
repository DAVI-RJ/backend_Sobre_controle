import Sequelize from "sequelize";
import config from "../config/database.js";

import Address from "../app/models/Address.js"
import Companies from "../app/models/Companies.js";
import Suppliers from "../app/models/Suppliers.js";
import Sales from "../app/models/Sales.js";
import Products from "../app/models/Products.js";
import SalesProducts from "../app/models/SalesProducts.js";
import Customers from "../app/models/Customers.js";

// Importando os modelos e as conexões
const models = [Address, Companies, Suppliers, Sales, Products, SalesProducts, Customers];

// Configurando o banco de dados para chamar apenas com um comando 
class database  {
	constructor() {
		this.connection = new Sequelize(config);
		this.init();
	}

	init () {
			models.forEach(model => model.init(this.connection));   
	}

};

export default new database;  
