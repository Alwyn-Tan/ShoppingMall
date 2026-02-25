const PRODUCTS = {
  1: {
    pid: 1,
    name: "Peach Oolong Fruit Tea",
    category: "Fruit Tea",
    price: "26.00",
    description: "Peach aroma with oolong base and a clean finish.",
    gallery: [1, 2, 3],
  },
  2: {
    pid: 2,
    name: "Grapefruit Jasmine Fruit Tea",
    category: "Fruit Tea",
    price: "25.00",
    description: "Fresh grapefruit with jasmine notes.",
    gallery: [2, 1, 3],
  },
  3: {
    pid: 3,
    name: "Cold Brew Americano",
    category: "Coffee",
    price: "20.00",
    description: "Slow-steeped cold brew with a clean finish.",
    gallery: [3, 4, 1],
  },
  4: {
    pid: 4,
    name: "Sea Salt Caramel Latte",
    category: "Coffee",
    price: "32.00",
    description: "Espresso and caramel milk with sea salt foam.",
    gallery: [4, 3, 5],
  },
  5: {
    pid: 5,
    name: "Brown Sugar Boba Milk Tea",
    category: "Milk Tea",
    price: "28.00",
    description: "Brown sugar boba and creamy milk tea.",
    gallery: [5, 6, 2],
  },
  6: {
    pid: 6,
    name: "Matcha Milk Tea",
    category: "Milk Tea",
    price: "30.00",
    description: "Smooth matcha blended with milk.",
    gallery: [6, 5, 4],
  },
};

function getPidFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("pid");
  if (!raw) {
    return 1;
  }
  const pid = Number.parseInt(raw, 10);
  if (!Number.isInteger(pid) || !PRODUCTS[pid]) {
    return 1;
  }
  return pid;
}

function setImage(el, path, alt) {
  if (!el) {
    return;
  }
  el.src = path;
  el.alt = alt;
}

function renderProduct(product) {
  const breadcrumbCategoryEl = document.getElementById("breadcrumb-category");
  const breadcrumbProductEl = document.getElementById("breadcrumb-product");
  const productCategoryEl = document.getElementById("product-category");
  const productNameEl = document.getElementById("product-name");
  const productSkuEl = document.getElementById("product-sku");
  const productPriceEl = document.getElementById("product-price");
  const productDescriptionEl = document.getElementById("product-description");

  if (breadcrumbCategoryEl) {
    breadcrumbCategoryEl.textContent = product.category;
  }
  if (breadcrumbProductEl) {
    breadcrumbProductEl.textContent = product.name;
  }
  if (productCategoryEl) {
    productCategoryEl.textContent = product.category;
  }
  if (productNameEl) {
    productNameEl.textContent = product.name;
  }
  if (productSkuEl) {
    const sku = `P00${product.pid}`;
    productSkuEl.innerHTML = `SKU: ${sku} - <span class=\"status-stock\">In Stock</span>`;
  }
  if (productPriceEl) {
    productPriceEl.textContent = product.price;
  }
  if (productDescriptionEl) {
    productDescriptionEl.textContent = product.description;
  }

  const [g1, g2, g3] = product.gallery;
  setImage(
    document.getElementById("product-main-image"),
    `assets/original/${g1}_original.png`,
    `${product.name} main image`
  );
  setImage(
    document.getElementById("product-image-2"),
    `assets/original/${g2}_original.png`,
    `${product.name} image view 2`
  );
  setImage(
    document.getElementById("product-image-3"),
    `assets/original/${g3}_original.png`,
    `${product.name} image view 3`
  );

  setImage(document.getElementById("product-thumb-1"), `assets/thumb/${g1}_thumb.jpg`, "Select image 1");
  setImage(document.getElementById("product-thumb-2"), `assets/thumb/${g2}_thumb.jpg`, "Select image 2");
  setImage(document.getElementById("product-thumb-3"), `assets/thumb/${g3}_thumb.jpg`, "Select image 3");

  document.title = `${product.name} - Future Drinks`;
}

renderProduct(PRODUCTS[getPidFromUrl()]);
