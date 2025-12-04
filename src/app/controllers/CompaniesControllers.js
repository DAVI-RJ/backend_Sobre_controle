import {Op} from "sequelize"; 
import bcrypt from "bcryptjs";
import Companies from "../models/Companies.js"

class CompaniesController {
	// Listar uma empresa 
	async show (req, res, next){
		const id = req.params.id;
		try{
			const company = await Companies.findOne({
				where: {
					id: id
				}
			}); 
			if(company){

				const {name, cnpj } = company; 
				res.status(200).json({
					data: {
							name, 
							cnpj
						}
				});
			}else{
				res.status(404).json({message: "company not found"});
			}	
		}catch(err){
			res.status(500).json({
				message: "erro server"
			})
			next(err)
		}
	}
	// Endpoint para cadastro
	async create (req, res, next) {
		const { email, password, cnpj} = req.body;

		try {		
			const company = await Companies.findOne({
				where: {
					[Op.or]: [{ email: email },{ cnpj: cnpj }]
						}
					});
				
			if(company) {

				return res.json({message: "try login"});
				
			}else {
				
				const password_hash = await bcrypt.hash(password, 8);
					
				const newCompany = await Companies.create({
					...req.body, password: password_hash});
				
				const {name, email, cnpj } = newCompany;

				return res.status(201).json({ message: 'User created successfully', name, email, cnpj}); 
			}
		
		}catch(err){	
			res.status(500).json({message: "error server"})
			next(err);
		}
	}

	// Rota para atualizar perfil
	async update (req, res, next) {
		const { id } = req.params; 

		if(isNaN(id) || id === null){
			const error = new Error("id not exist");
      error.statusCode = 400;
      next(error); 
		}
		try{
			const company = await Companies.findByPk(id);

			if(!company) {
				const error = new Error("no records found.");
				error.statusCode = 404;
				next(error); 
			}else{
				/*const {
					name,
					cnpj,
					representative,
					email,
					phone, 
					password, 
				 } = req.body; 
				*/
				await company.update(...req.body);

				return res.json({
					message: "company edtaded sucessufuly", 
				});
			}
		}catch(err){
			next(err)
		}
	};
  
	// Excluir conta
	async destroy (req, res, next) {
  	const company = await Companies.findByPk(req.params.id);
		try{
			if(!company) {
      return res.status(404).json({message: "not found any company with id"});
  		}
  		await company.destroy();

  		return res.json({mensage: "User deleted successfully."});
		}catch(err){
			next(err); 
		}
	}
}

export default new CompaniesController;






