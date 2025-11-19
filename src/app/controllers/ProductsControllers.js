import { Op } from "sequelize"; 
import { parseISO } from "date-fns";
import Products from "../models/Products.js"

class productsControllers {
  // Listar de produtos com filtros opcionais
  async show(req, res, next) {
    try {
      const { name, description, price, quantity } = req.query;
      const { createBefore, createAfter, updateBefore, updateAfter, sort } = req.query;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      let where = {};
      
				if (name) {
						where = {
								...where,
								name: {
										[Op.iLike]: `%${name}%`,
								}
						};
				}
				if (description) {
						where = {
								...where,
								description: {
										[Op.is]: description,
								}
						};
				}
				if (price) {
						where = {
								...where,
								price: {
										[Op.in]: price.map(item => item.max() >= item.min() ? item.toFixed(2) : null),
								}
						};
				}
				if (quantity) {
						where = {
								...where,
								quantity: {
										[Op.in]: quantity,
								}
						};
				}
				if (createBefore) {
						where = {
								...where,
								createdAt: {
										[Op.lte]: parseISO(createBefore),
								}
						};
				}
				if (createAfter) {
						where = {
								...where,
								createdAt: {
										[Op.gte]: parseISO(createAfter),
								}
						};
				}
				if (updateBefore) {
						where = {
								...where,
								updatedAt: {
										[Op.lte]: parseISO(updateBefore),
								}
						};
				}
				if (updateAfter) {
						where = {
								...where,
								updatedAt: {
										[Op.gte]: parseISO(updateAfter),
								}
						};
				}

        let order = [];

				if (sort) {
					order = sort.split(",").map(item => item.split(":"));
				}

				const result = await Products.findAll({
					where,
					order,
					limit,
					offset
				});	

				return res.json(result)

    } catch (err) {
      err.statusCode = err.statusCode || 500;
      next(err); 
    }
  }
// retorna o produto por id
	async index (req, res, next){
		const {id } = req.params;

		try{
			const result = await Products.findOne({
				where: {
					id
				}
			});

			res.json(result);

		}catch(err){
      next(err); 
		}
	}

	// criação de novo produto
  async create(req, res, next) {
		const { name, description, price, quantity} = req.body;
		const company_id = req.companyId; 

		try {
			const result = await Products.findOne({
				where: { 
					name : {
						[Op.iLike]: `%${name}%`,
					}
				}
			});

			if(result){
				return res.json({message: "this product already registered"});
			}

			const product = await Products.create({ 
				name, 
				description, 
				price, 
				quantity,
				company_id: company_id
			});

			return res.status(201).json({message: product});

		}catch(err) {
      next(err); 
		}
  }

  // Atualizar produto
  async update(req, res, next) {
		const { id } = req.params;
    const { name, description, price, quantity } = req.body;
		
    try {
      const [updated] = await Products.update(
        { name, description, price, quantity },
        { where: { id } }
      );
      if (!updated) {
				return res.status(404).json({ message: "product not found" });
			}

      const updatedProduct = await Products.findByPk({
				where: { id }
			});
      
			return res.json(updatedProduct);

    } catch (err) {
      next(err);
    }
  }

  // Deletar produto
  async destroy(req, res, next) {
    try {
      const { id } = req.params.id;

      const deleted = await Products.destroy({
				where: { id } 
			});

      if (!deleted) {
				return res.status(404).json({ error: "product not founded" })
			};

    } catch (err) {
      next(err); 
    }
  }
}

export default new productsControllers();