export function buildOrder(sort, allowedSorts, defaultOrder = [["id", "ASC"]]) {
  if (!sort) return defaultOrder;

  const parsed = sort
    .split(",")
    .map((s) => s.split(":"))
    .filter(([field]) => allowedSorts.includes(field))
    .map(([field, dir]) => [field, (dir || "ASC").toUpperCase() === "DESC" ? "DESC" : "ASC"]);

  return parsed.length ? parsed : defaultOrder;
}
