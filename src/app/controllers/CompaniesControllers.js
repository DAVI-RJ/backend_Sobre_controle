import {Op} from "sequelize"; 
import bcrypt from "bcryptjs";
import logger from "../../../logs/logs.js";
import Companies from "../models/Companies.js"

class CompaniesController {
	async show (req, res){
		const id = req.params.id;

		const result = await Companies.findOne({
			where: {
				id: id
			}
		}); 
		if(result){
			res.json(result);
		}else{
			res.status(404).json({message: "company not found"});
		}	
	}

	async create (req, res) {
		const { email, password, cnpj } = req.body;

		try {		
			const result = await Companies.findOne({
				where: {
					[Op.or]: [{ email: email },{ cnpj: cnpj }]
						}
					});
				
			if(result) {

				return res.json({message: "try login"});
				
			}else {
				
				const password_hash = await bcrypt.hash(password, 8);
					
				const newCompany = await Companies.create({
					...req.body, password: password_hash});
				
				const {name, email, cnpj } = newCompany;

				return res.status(201).json({ message: 'User created successfully', name, email, cnpj}); 
			}
		
			}catch(err){	
				res.status(500).json({message: "error in create", error: err.message})
				logger.error("validate error", err)
		}
	}

	async update (req, res, next) {
		const { id } = req.params; 

		if(isNaN(id)){
			const error = new Error("id not exist");
      error.statusCode = 400;
      next(error); 
		}
		const company = await Companies.findByPk(req.params.id);

		if(!company) {
			const error = new Error("no records found.");
      error.statusCode = 404;
      next(error); 
  	}
  	await company.update(...req.body);

		return res.json({
			message: "company edtaded sucessufuly", 
		});
	};
  
	async destroy (req, res) {
  	const Company = await Companies.findByPk(req.params.id);
  
  	if(!Company) {
      return res.status(404).json({message: "not found any company with id"});
  	}
  	await Company.destroy();

  	return res.json({mensage: "User deleted successfully."});
	}
}

export default new CompaniesController;






