// Exemple de produits
const productsData = [
    {name: "T-shirt Bleu", category: "vetements", size: "M", price: 15, image: "https://via.placeholder.com/150"},
    {name: "Chaussures Nike", category: "chaussures", size: "L", price: 50, image: "https://via.placeholder.com/150"},
    {name: "Sac à main", category: "accessoires", size: "S", price: 25, image: "https://via.placeholder.com/150"},
    {name: "Jean", category: "vetements", size: "M", price: 30, image: "https://via.placeholder.com/150"}
];

let cart = [];

// Afficher les produits
function displayProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="info">
                <h4>${product.name}</h4>
                <p>Catégorie: ${product.category}</p>
                <p>Taille: ${product.size}</p>
                <p>Prix: ${product.price}€</p>
                <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Ajouter au panier</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Ajouter au panier
function addToCart(name, price, image) {
    const exists = cart.find(item => item.name === name);
    if (exists) {
        alert("Ce produit est déjà dans le panier !");
        return;
    }
    cart.push({name, price, image});
    alert(`${name} ajouté au panier !`);
    console.log(cart);
}

// Filtrage
document.getElementById("search").addEventListener("input", e => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = productsData.filter(p => p.name.toLowerCase().includes(searchTerm));
    displayProducts(filtered);
});

document.getElementById("category").addEventListener("change", e => {
    filterProducts();
});
document.getElementById("size").addEventListener("change", e => {
    filterProducts();
});
document.getElementById("max-price").addEventListener("input", e => {
    filterProducts();
});

function filterProducts() {
    const cat = document.getElementById("category").value;
    const size = document.getElementById("size").value;
    const maxPrice = document.getElementById("max-price").value;

    let filtered = productsData.filter(p => {
        return (!cat || p.category === cat) &&
               (!size || p.size === size) &&
               (!maxPrice || p.price <= maxPrice);
    });

    displayProducts(filtered);
}

// Affichage initial
displayProducts(productsData);
