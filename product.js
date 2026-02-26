const breadcrumbCategoryEl = document.getElementById("breadcrumb-category");
const breadcrumbProductEl = document.getElementById("breadcrumb-product");
const categoryTagEl = document.getElementById("product-category");
const productNameEl = document.getElementById("product-name");
const productSkuEl = document.getElementById("product-sku");
const productPriceEl = document.getElementById("product-price");
const productDescriptionEl = document.getElementById("product-description");
const productMainImageEl = document.getElementById("product-main-image");
const productThumbImageEl = document.getElementById("product-thumb-image");

function parsePidFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const pidRaw = params.get("pid");
  if (pidRaw) {
    const pid = Number.parseInt(pidRaw, 10);
    if (Number.isInteger(pid) && pid > 0) {
      return pid;
    }
  }

  const skuRaw = params.get("sku");
  if (!skuRaw) {
    return null;
  }
  const digits = skuRaw.match(/\d+/);
  if (!digits) {
    return null;
  }
  const pid = Number.parseInt(digits[0], 10);
  return Number.isInteger(pid) && pid > 0 ? pid : null;
}

function setErrorState(message) {
  productNameEl.textContent = "Product Not Found";
  categoryTagEl.textContent = "Unavailable";
  breadcrumbProductEl.textContent = "Not Found";
  productDescriptionEl.textContent = message;
  productPriceEl.textContent = "0.00";
  productSkuEl.textContent = "PID: N/A";
  productMainImageEl.src = "";
  productThumbImageEl.src = "";
}

function applyProduct(product) {
  document.title = `${product.name} - Future Drinks`;

  categoryTagEl.textContent = product.category_name || "Category";
  productNameEl.textContent = product.name;
  breadcrumbProductEl.textContent = product.name;
  breadcrumbCategoryEl.textContent = product.category_name || "Category";
  breadcrumbCategoryEl.href = `index.html?catid=${product.catid}`;

  productSkuEl.textContent = `PID: ${product.pid} - In Stock`;
  productPriceEl.textContent = Number(product.price).toFixed(2);
  productDescriptionEl.textContent = product.description || "No description.";

  const mainImage = product.image_path || product.thumb_path || "";
  const thumbImage = product.thumb_path || product.image_path || "";

  productMainImageEl.src = mainImage;
  productMainImageEl.alt = `${product.name} image`;
  productThumbImageEl.src = thumbImage;
  productThumbImageEl.alt = `${product.name} thumbnail`;
}

async function initProductPage() {
  const pid = parsePidFromUrl();
  if (!pid) {
    setErrorState("Invalid product id.");
    return;
  }

  try {
    const response = await fetch(`/api/products/${pid}`);
    if (!response.ok) {
      throw new Error("Product not found.");
    }
    const product = await response.json();
    applyProduct(product);
  } catch (err) {
    setErrorState("Unable to load product details.");
  }
}

initProductPage();
