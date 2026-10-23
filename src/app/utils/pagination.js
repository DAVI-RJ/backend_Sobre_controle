export default function parsePagination(
  query,
  { defaultLimit = 10, maxLimit = 100, maxPage = 100 } = {}
) {
  const limit = Math.min(Number(query.limit) || defaultLimit, maxLimit);
  const page = Math.min(Math.max(1, Number(query.page) || 1), maxPage);
  return { limit, page, offset: (page - 1) * limit };
}
