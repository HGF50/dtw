const productsContainer = document.getElementById("products");

// Récupérer les articles publiés
let articles = JSON.parse(localStorage.getItem("articles")) || [];

// Produits par défaut
const defaultProducts = [
  
];

// Fusionner les deux tableaux
let allProducts = [...defaultProducts, ...articles];

// Si aucun produit
if(allProducts.length === 0){
  productsContainer.innerHTML = "<p>Aucun article publié pour le moment.</p>";
}

// Fonction pour afficher
function displayProducts(list){
    productsContainer.innerHTML = "";
    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.images ? product.images[0] : 'images/default.jpg'}" alt="${product.name}">
            <div class="info">
                <h4>${product.name}</h4>
                <p class="price">${product.price.toLocaleString()} FCFA</p>
                ${product.size ? `<p>${product.category === "vetements" ? "Taille" : "Pointure"} : ${product.size}</p>` : ""}
                <p class="condition">${product.condition}</p>
            </div>
            <button class="view-btn">Voir le produit</button>
        `;
        productsContainer.appendChild(card);
    });
}

// Affichage initial
displayProducts(allProducts);
