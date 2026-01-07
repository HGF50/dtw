/* ===========================
   DONNÉES PRODUITS (LISTE)
=========================== */
const productsData = [
  {
    id: 1,
    name: "T-shirt Bleu",
    category: "vetements",
    size: "M",
    price: 15,
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300/0000FF",
      "https://via.placeholder.com/300/00FFFF"
    ]
  },
  {
    id: 2,
    name: "Chaussures Nike",
    category: "chaussures",
    size: "L",
    price: 50,
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300/FF0000"
    ]
  },
  {
    id: 3,
    name: "Sac à main",
    category: "accessoires",
    size: "S",
    price: 25,
    images: [
      "https://via.placeholder.com/300"
    ]
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ===========================
   AFFICHER LES PRODUITS
=========================== */
function displayProducts(products) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>${product.price} €</p>
    `;

    // 👉 clic vers page produit
    card.onclick = () => openProduct(product);

    container.appendChild(card);
  });
}

/* ===========================
   OUVRIR PAGE PRODUIT
=========================== */
function openProduct(product) {
  localStorage.setItem("product", JSON.stringify(product));
  window.location.href = "produit.html";
}

/* ===========================
   FILTRES
=========================== */
function filterProducts() {
  const search = document.getElementById("search")?.value.toLowerCase() || "";
  const category = document.getElementById("category")?.value || "";
  const size = document.getElementById("size")?.value || "";
  const maxPrice = document.getElementById("max-price")?.value || "";

  const filtered = productsData.filter(p =>
    (!search || p.name.toLowerCase().includes(search)) &&
    (!category || p.category === category) &&
    (!size || p.size === size) &&
    (!maxPrice || p.price <= maxPrice)
  );

  displayProducts(filtered);
}

/* ===========================
   PAGE PRODUIT
=========================== */
const product = JSON.parse(localStorage.getItem("product"));

if (product && document.getElementById("product-name")) {
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = product.price + " €";

  const mainImage = document.getElementById("main-image");
  const thumbs = document.getElementById("thumbnails");

  mainImage.src = product.images[0];

  product.images.forEach(imgSrc => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.onclick = () => mainImage.src = imgSrc;
    thumbs.appendChild(img);
  });
}

/* ===========================
   PANIER
=========================== */
function addProductToCart() {
  const product = JSON.parse(localStorage.getItem("product"));
  if (!product) return;

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produit ajouté au panier 🛒");
}

/* ===========================
   INIT
=========================== */
displayProducts(productsData);
