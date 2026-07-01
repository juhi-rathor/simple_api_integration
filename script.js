document.addEventListener("DOMContentLoaded", init);

async function init() {
  const grid = document.getElementById("product-grid");

  try {
    const products = await fetchProducts();
    renderProducts(products, grid);
  } catch (error) {
    console.error("Failed to load products:", error);
    grid.innerHTML = '<p class="text-danger">Unable to load products at this time.</p>';
  }
}

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Error(`Network response was not ok (${response.status})`);
  }

  const products = await response.json();

  if (!Array.isArray(products)) {
    throw new TypeError("Product API returned an unexpected data format.");
  }

  return products;
}

function renderProducts(products, container) {
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    fragment.appendChild(createProductCard(product));
  });

  container.innerHTML = "";
  container.appendChild(fragment);
}

function createProductCard(product) {
  const column = document.createElement("div");
  column.className = "col-md-4 mb-3";

  const card = document.createElement("article");
  card.className = "card border-0 product-card h-100";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.title;
  image.className = "card-img-top product-image";
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h2");
  title.className = "card-title h6";
  title.textContent = product.title;

  const category = document.createElement("p");
  category.className = "text-muted mb-0";
  category.textContent = product.category;

  body.append(title, category);
  card.append(image, body);
  column.appendChild(card);

  return column;
}
