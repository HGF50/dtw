const productsContainer = document.getElementById("products");

async function loadProducts() {
  const res = await fetch("http://localhost:3000/products");
  const products = await res.json();

  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = "<p>Aucun article publié</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="http://localhost:3000${product.image}" alt="${product.name}">
      <div class="info">
        <h4>${product.name}</h4>
        <p class="price">${product.price.toLocaleString()} FCFA</p>
        ${product.size ? `<p>${product.size === "N/A" ? "Taille : N/A" : "Taille / Pointure : " + product.size}</p>` : ""}
      </div>
      <button class="view-btn">Voir le produit</button>
    `;

    // ✅ CLICK QUI MARCHE
    card.querySelector(".view-btn").onclick = () => {
      window.location.href = `produit.html?id=${product.id}`;
    };

    productsContainer.appendChild(card);
  });
}

// ✅ APPEL UNIQUE
loadProducts();
