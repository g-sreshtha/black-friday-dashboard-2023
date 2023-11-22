const top10brands = brandState
  .sort((a, b) => b.total - a.total)
  .slice(0, 10)
  .map(brand => brand.brandName);

export function topBrandList() {
  const topBrandListItems = top10brands.map(brand => <li>{brand}</li>);
}
