import Customers from "../models/Customers.js";

class customersControllers {
  async create (req, res, next){
    const {cnpj} = req.body;

    try{
      const result = await Customers.findOne({
        where: {
          cnpj
        }
      });

      if(result){
        res.json({
          message: "this customers alredy register"
        }); 
      }

      const newCustomers = Customers.create(req.body);

      const {name} = newCustomers; 

      res.json({
        message: "customers create sucessufuly", 
        data: name, cnpj
      });

    }catch(err){
      const error = new Error("error server.");
      error.statusCode = 500;
      return next(err);
    }
  }

  async destroy (req, res, next) {
    const id = req.id.params; 

    try {
      const result = await Customers.findByPk(id);

      if(result){
        Customers.destroy(result);
        res.status(200).json({message: "Custumer deleted sucessufuly"}); 
      }else {
        res.status(404).json({message: "Custumer not found"})
      }
      
    }catch(err){
      const error = new Error("Error server");
      error.statusCode = 500; 
      return next(err)
    }
  }
}
export default new customersControllers; 