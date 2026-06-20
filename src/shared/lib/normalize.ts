export type SearchParamValue = string | string[] | undefined;

export function normalizePage(page: SearchParamValue): number {
  const pageValue = Array.isArray(page) ? page[0] : page;
  const value = Number(pageValue);

  return Number.isInteger(value) && value > 0 ? value : 1;
}
