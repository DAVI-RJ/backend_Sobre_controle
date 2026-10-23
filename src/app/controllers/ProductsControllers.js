import Products from "#/models/Products.js";
import { listProducts } from "#/services/product/productService.js";

class ProductsControllers {
  // Listar de produtos com filtros opcionais
  async show(req, res, next) {
    const result = await listProducts({ company_id: req.companyId, query: req.query });
    return res.json(result);
  }

  // retorna o produto por id
  async index(req, res, next) {
    const { id } = req.params;
    const companyId = req.companyId;

    try {
      const product = await Products.findOne({
        where: {
          id,
          company_id: companyId,
        },
      });

      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  // criação de novo produto
  async create(req, res, next) {
    const { name, description, price, quantity } = req.body;
    const companyId = req.companyId;
    try {
      if (!companyId) {
        res.json({ message: "Company ID is required to create a product" });
      } else {
        const product = await Products.findOne({
          where: {
            company_id: companyId,
            name: {
              name,
            },
          },
        });

        if (product) {
          return res.json({ message: "this product already registered" });
        }

        const newProduct = await Products.create({
          name,
          description,
          price,
          quantity,
          company_id: companyId,
        });

        return res.status(201).json(newProduct);
      }
    } catch (err) {
      next(err);
    }
  }

  // Atualizar produto
  async update(req, res, next) {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    const companyId = req.companyId;

    try {
      const [updated] = await Products.update(
        { name, description, price, quantity },
        { where: { id, company_id: companyId } }
      );
      if (!updated) {
        return res.status(404).json({ message: "product not found" });
      }

      const updatedProduct = await Products.findByPk(id);

      return res.json(updatedProduct);
    } catch (err) {
      next(err);
    }
  }

  // Deletar produto
  async destroy(req, res, next) {
    const { id } = req.params;
    const companyId = req.companyId;
    try {
      const deleted = await Products.destroy({
        where: { id, company_id: companyId },
      });

      if (!deleted) {
        return res.status(404).json({ error: "product not founded" });
      }

      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductsControllers();
