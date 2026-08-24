import Customers from "../models/Customers.js";
import Companies from "../models/Companies.js"; 
import CustomerToCompanies from "../models/CustomerToCompanies.js";

class CustomersControllers {
  // Listar todos os clientes da empresa 
  async show (req, res, next) {
    try{
      const {sort} = req.query; 
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const companyId = req.companyId; 
      let order = [];

      if (sort) {
        order = sort.split(",").map(item => item.split(":"));
      }
      let customersList; 
      if (req.path.includes("search")) {
        customersList = await Customers.findAll({
          order,
          offset,
          limit
        });
      } else {
        // lista clientes vinculados à empresa
        customersList = await Customers.findAll({
        include: [{
          model: Companies,
          where: { id: companyId },
          attributes: []
        }],
        order,
        offset,
        limit
      });
    }
    /* 
      const customersList = await Customers.findAll({
        include: [{
          model: CustomerToCompanies,
          where: { company_id: companyId }
        }],
        order,
        offset,
        limit
      });
      */
      return res.json(customersList)
      
    }catch(err){
      next(err)
    }
  }
  // Criar um novo cliente
  async create (req, res, next){
    const { name, email, phone, cnpj, address_id } = req.body;
    const companyId = req.companyId; 
    
    if(!companyId){
			res.json({message: "Company ID is required to create a product"});
		}

    try {
      let customer = await Customers.findOne({ where: { cnpj} });
      if (!customer) {
        customer = await Customers.create({cnpj, name, phone, email, address_id});
      }
      // cria vínculo se não existir
      await CustomerToCompanies.findOrCreate({
        where: { company_id: companyId, customer_id: customer.id_customer }
      });
      
      return res.status(201).json({
        message: "Client connection create success",
        data: customer
      });

    }catch(err){
      next(err);
    }
  }
  // Deletar cliente do sistema
  async destroy (req, res, next) {
    const { id } = req.params; 

    try {
      const customer = await Customers.findByPk(id);

      if(customer){
        Customers.destroy(customer);
        res.status(200).json({message: "Custumer deleted sucessufuly"}); 
      }else {
        res.status(404).json({message: "Custumer not found"})
      }
      
    }catch(err){
      next(err)
    }
  }
}
export default new CustomersControllers; 