import { Op } from "sequelize"
import { parseISO } from "date-fns"
import Products from "../models/Products.js"

class ProductsControllers {
  // Listar de produtos com filtros opcionais
  async show(req, res, next) {
    try {
      const { name, description, price, quantity, sort } = req.query
      const { createBefore, createAfter, updateBefore, updateAfter } = req.query

      const limit = Math.min(Number(req.query.limit) || 10, 100)

      const page = Math.min(Math.max(1, Number(req.query.page) || 1), 100)
      const offset = (page - 1) * limit

      const companyId = req.companyId

      const where = {
        company_id: companyId,
      }

      if (name) where.name = { [Op.iLike]: `%${name}%` }

      if (description) where.description = { [Op.iLike]: `%${description}%` }

      if (price) {
        const [min, max] = price.split(",").map(Number)
        if (Number.isFinite(min) && Number.isFinite(max)) {
          where.price = { [Op.between]: [min, max] }
        }
      }

      if (quantity) where.quantity = { [Op.in]: quantity.split(",").map(Number) }

      if (createAfter || createBefore) {
        where.createdAt = {}
        if (createAfter) where.createdAt[Op.gte] = parseISO(createAfter)
        if (createBefore) where.createdAt[Op.lte] = parseISO(createBefore)
      }
      if (updateAfter || updateBefore) {
        where.updatedAt = {}
        if (updateAfter) where.updatedAt[Op.gte] = parseISO(updateAfter)
        if (updateBefore) where.updatedAt[Op.lte] = parseISO(updateBefore)
      }

      let order

      order = [["id", "ASC"]]

      const ALLOWED_SORTS = [
        "id",
        "name",
        "description",
        "price",
        "quantity",
        "createdAt",
        "updatedAt",
      ]

      let parsed = []
      if (sort) {
        parsed = sort
          .split(",")
          .map((s) => s.split(":"))
          .filter(([field]) => ALLOWED_SORTS.includes(field))
          .map(([field, dir]) => [field, (dir || "ASC").toUpperCase() === "DESC" ? "DESC" : "ASC"])
      }

      if (parsed.length) order = parsed

      const { rows: products, count: total } = await Products.findAndCountAll({
        where,
        order,
        limit,
        offset,
        attributes: ["id", "name", "description", "price", "quantity", "createdAt", "updatedAt"],
      })

      return res.json({
        data: products,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      })
    } catch (err) {
      err.statusCode = err.statusCode || 500
      next(err)
    }
  }

  // retorna o produto por id
  async index(req, res, next) {
    const { id } = req.params
    const companyId = req.companyId

    try {
      const product = await Products.findOne({
        where: {
          id,
          company_id: companyId,
        },
      })

      res.json(product)
    } catch (err) {
      next(err)
    }
  }

  // criação de novo produto
  async create(req, res, next) {
    const { name, description, price, quantity } = req.body
    const companyId = req.companyId
    try {
      if (!companyId) {
        res.json({ message: "Company ID is required to create a product" })
      } else {
        const product = await Products.findOne({
          where: {
            company_id: companyId,
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        })

        if (product) {
          return res.json({ message: "this product already registered" })
        }

        const newProduct = await Products.create({
          name,
          description,
          price,
          quantity,
          company_id: companyId,
        })

        return res.status(201).json(newProduct)
      }
    } catch (err) {
      next(err)
    }
  }

  // Atualizar produto
  async update(req, res, next) {
    const { id } = req.params
    const { name, description, price, quantity } = req.body
    const companyId = req.companyId

    try {
      const [updated] = await Products.update(
        { name, description, price, quantity },
        { where: { id, company_id: companyId } }
      )
      if (!updated) {
        return res.status(404).json({ message: "product not found" })
      }

      const updatedProduct = await Products.findByPk(id)

      return res.json(updatedProduct)
    } catch (err) {
      next(err)
    }
  }

  // Deletar produto
  async destroy(req, res, next) {
    const { id } = req.params
    const companyId = req.companyId
    try {
      const deleted = await Products.destroy({
        where: { id, company_id: companyId },
      })

      if (!deleted) {
        return res.status(404).json({ error: "product not founded" })
      }

      res.status(204).end()
    } catch (err) {
      next(err)
    }
  }
}

export default new ProductsControllers()
