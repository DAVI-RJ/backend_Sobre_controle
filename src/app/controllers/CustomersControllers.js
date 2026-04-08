import Customers from "../models/Customers.js";
import CustomerToCompanies from "../models/CustomerToCompanies.js"; 

class customersControllers {
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
      
      const customersList = await Customers.findAll({
        include: [{
          model: CustomerToCompanies,
          where: { company_id: companyId }
        }],
        order,
        offset,
        limit
      });
      //const {name, cnpj} = customersList;
      return res.json(customersList)
      
    }catch(err){
      next(err)
    }
  }
  // Criar um novo cliente
  async create (req, res, next){
    const {cnpj, ...data} = req.body;
    const companyId = req.companyId; 
    
    try {
      let customer = await Customers.findOne({ where: { cnpj } });
      if (!customer) {
        customer = await Customers.create(data);
      }
      // cria vínculo se não existir
      await CustomerToCompanies.findOrCreate({
        where: { company_id: companyId, customer_id: customer.id_customer }
      });
      
      return res.status(201).json({
        message: "Cliente vinculado com sucesso",
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
export default new customersControllers; 