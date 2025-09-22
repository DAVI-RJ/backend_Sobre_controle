import Address from "../models/Address.js";
import { Op } from "sequelize";

class AddressController {
  
  async show(req, res, next) {
    const { street, city, state } = req.query;
    let where = {};

    if (street) {
      where.street = { 
        [Op.iLike]: `%${street}%` 
      }
    };
    if (city) {
      where.city = { 
        [Op.iLike]: `%${city}%`
      }
    };
    if (state) {
      where.state = { 
        [Op.iLike]: `%${state}%` 
      }
    };

    try {
      const addresses = await Address.findAll({ where });
      return res.json(addresses);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    const { street, number, neighborhood, city, state } = req.body;

    try {
      const newAddress = await Address.create({ street, number, neighborhood, city, state });
      return res.status(201).json(newAddress);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    try {
      const address = await Address.findByPk(id);
      if (!address) {
        const error = new Error("Address not found");
        error.statusCode = 404;
        return next(error);
      }
      await address.update(req.body);
      return res.json({ message: "Address updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  async destroy(req, res, next) {
    const { id } = req.params;
    try {
      const address = await Address.findByPk(id);
      if (!address) {
        const error = new Error("Address not found");
        error.statusCode = 404;
        return next(error);
      }
      await address.destroy();
      return res.status(200).json({ message: "Address deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

export default new AddressController();