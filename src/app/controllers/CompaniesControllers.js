import {Op} from "sequelize"; 
import bcrypt from "bcryptjs";
import logger from "../../../logs/logs.js";
import Companies from "../models/Companies.js"

class CompaniesController {
	async create (req, res) {
		const { email, password, cnpj } = req.body;

		try {		
			const result = await Companies.findOne({
				where: {
					[Op.or]: [{ email: email },{ cnpj: cnpj }]
						}
					});
				console.log(result)
			if(result) {

				return res.json({message: "try login"});
				
			}else {
				
				const password_hash = await bcrypt.hash(password, 8);
				console.log(password_hash)	
				const newCompany = await Companies.create({
					...req.body, password: password_hash});

				return res.status(201).json({ message: 'User created successfully', newCompany }); 
			}
		
			}catch(err){	
				res.status(500).json({message: "error in create", error: err.message})
				logger.error("validate error", err)
		}
	}

	async update (req, res) {
		const Company = await Companies.findByPk(req.params.id);

		if(!Company) {
      return res.status(404).json();
  	}
  	await Company.update(req.body);
		logger.info(Company)
	};
  
	async destroy (req, res) {
  	const Company = await Companies.findByPk(req.params.id);
  
  	if(!Company) {
      return res.status(404).json();
  	}
  	await Company.destroy();

  	return res.json({mensage: "User deleted successfully."});
	}
}

export default new CompaniesController;






