const fs = require("fs");

function normalizeItem(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, " ")
    .replace(/1 litro/g, "1l")
    .replace(/litro/g, "l")
    .replace(/quilos/g, "kg")
    .replace(/quilo/g, "kg")
    .replace(/gramas/g, "g")
    .replace(/grama/g, "g")
    .replace(/1000g/g, "1kg")
    .replace(/1 quilo/g, "1kg")
    .replace(/tipo /g, "")
    .split(" ")
    .filter((word) => word.length > 0)
    .sort()
    .join(" ");
}

function categorizeProducts(products) {
  let categories = {};

  products.forEach((product) => {
    const normalizedItem = normalizeItem(product.title);

    if (!categories[normalizedItem]) {
      categories[normalizedItem] = {
        category: product.title,
        count: 0,
        products: [],
      };
    }
    categories[normalizedItem].count++;
    categories[normalizedItem].products.push({
      title: product.title,
      supermarket: product.supermarket,
    });
  });

  return Object.values(categories);
}

try {
  const data = fs.readFileSync("data01.json");
  const products = JSON.parse(data);
  const categorizedData = categorizeProducts(products);

  fs.writeFileSync("output.json", JSON.stringify(categorizedData, null, 2));
  console.log("Arquivo output.json gerado com sucesso!");
} catch (error) {
  console.error("Erro ao processar os dados:", error);
}
