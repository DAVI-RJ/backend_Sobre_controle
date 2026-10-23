import { Op } from "sequelize";
import { parseISO } from "date-fns";
import { Products } from "../models";
import { listEntities } from "./listing/list-entities";

const ALLOWED_SORTS = ["id", "name", "description", "price", "quantity", "createdAt", "updatedAt"];
const ATTRIBUTES = ["id", "name", "description", "price", "quantity", "createdAt", "updatedAt"];

function buildWhereProducts(companyId, query) {
  const where = { company_id: companyId };
  const { name, description, price, quantity } = query;
  const { createBefore, createAfter, updateBefore, updateAfter } = query;

  if (name) where.name = { [Op.iLike]: `%${name}%` };
  if (description) where.description = { [Op.iLike]: `%${description}%` };

  if (price) {
    const [min, max] = price.split(",").map(Number);
    if (Number.isFinite(min) && Number.isFinite(max)) {
      where.price = { [Op.between]: [min, max] };
    }
  }

  if (quantity) {
    where.quantity = { [Op.in]: quantity.split(",").map(Number) };
  }

  if (createAfter || createBefore) {
    where.createdAt = {};
    if (createAfter) where.createdAt[Op.gte] = parseISO(createAfter);
    if (createBefore) where.createdAt[Op.lte] = parseISO(createBefore);
  }
  if (updateAfter || updateBefore) {
    where.updatedAt = {};
    if (updateAfter) where.updatedAt[Op.gte] = parseISO(updateAfter);
    if (updateBefore) where.updatedAt[Op.lte] = parseISO(updateBefore);
  }

  return where;
}

export function listProducts({ companyId, query }) {
  return listEntities({
    model: Products,
    where: buildWhereProducts(companyId, query),
    query,
    allowedSorts: ALLOWED_SORTS,
    attributes: ATTRIBUTES,
  });
}
