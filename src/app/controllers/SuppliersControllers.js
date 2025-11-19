import Suppliers from "../models/Suppliers.js";

class SupplierController {
	// Endpoint para criação de novo fornecedor
  async create (req, res, next) {
		const {cnpj } = req.body;

		try {		
			const supplier = await Suppliers.findOne({
				where: {
					cnpj: cnpj 
					}
				});
			if(supplier) {

				return res.json({
					message: "Supplier alredy registred"
				});
				
			}else {	
				const newSupplier = await Suppliers.create(req.body);

				const {name, cnpj} = newSupplier; 

				return res.status(201).json({ message: "Supplier created successfully", 
					name, cnpj
				}); 
			}
		
			}catch(err){	
				const error = new Error("error server.");
      	error.statusCode = 500;
      	next(err);
		}
	}
	// Deletar fornecedor 
	async destroy (req, res, next) {
		const {id} = req.params.id; 
		try{
			const supplier = await Suppliers.findByPk(id);
			
			if(!supplier){
				res.status(404).json({
					message: "supplier not found with this id"
				});
			}
			await supplier.destroy();
			res.status(200).json({
				message: "supplier deleted successfully"
			})
			
		}catch(err){
			const error = new Error("error server.");
			error.statusCode = 404;
			next(err);
		}
	}
}

export default new SupplierController; 