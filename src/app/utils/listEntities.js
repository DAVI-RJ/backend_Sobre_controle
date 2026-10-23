import { parsePagination } from "./pagination";
import { buildOrder } from "./buildOrder";

export async function listEntities({
  model,
  where,
  query,
  allowedSorts,
  attributes,
  defaultOrder,
}) {
  const { limit, page, offset } = parsePagination(query);

  const { rows, count: total } = await model.findAndCountAll({
    where,
    order: buildOrder(query.sort, allowedSorts, defaultOrder),
    limit,
    offset,
    attributes,
  });
  // Math.ceil retorna o menor número inteiro maior ou igual a x.
  return {
    data: rows,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}
