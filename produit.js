// ===========================
// Récupération produit
// ===========================
const product = JSON.parse(localStorage.getItem("product"));

// ===========================
// Likes
// ===========================
let likedProducts = JSON.parse(localStorage.getItem("likes")) || [];
let likesCount = JSON.parse(localStorage.getItem("likesCount")) || {};

if (product && !(product.id in likesCount)) {
    likesCount[product.id] = 0;
}

function isLiked(id) {
    return likedProducts.includes(id);
}

function toggleLike(id) {
    const btn = document.getElementById("like-btn");
    const count = document.getElementById("like-count");

    if (isLiked(id)) {
        likedProducts = likedProducts.filter(x => x !== id);
        likesCount[id] = Math.max(0, likesCount[id] - 1);
        btn.textContent = "🤍";
    } else {
        likedProducts.push(id);
        likesCount[id]++;
        btn.textContent = "❤️";
    }

    localStorage.setItem("likes", JSON.stringify(likedProducts));
    localStorage.setItem("likesCount", JSON.stringify(likesCount));

    count.textContent = likesCount[id];
}

// ===========================
// Affichage produit
// ===========================
if (product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-brand").textContent = product.brand || "-";
    document.getElementById("product-size").textContent = product.size || "-";
    document.getElementById("product-condition").textContent = product.condition || "-";
    document.getElementById("product-description").textContent =
        product.description || "Pas de description disponible.";

    // 💰 PRIX EN FCFA
    document.getElementById("product-price").innerHTML =
        `<strong>${product.price.toLocaleString()} FCFA</strong>`;

    document.getElementById("product-fee").textContent =
        product.protectionFee.toLocaleString() + " FCFA";

    document.getElementById("product-total").textContent =
        product.totalPrice.toLocaleString() + " FCFA";

    // 🖼️ IMAGES
    const mainImg = document.getElementById("main-image");
    const thumbs = document.getElementById("gallery-thumbs");

    mainImg.src = product.images[0];
    thumbs.innerHTML = "";

    product.images.slice(0, 3).forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.onclick = () => mainImg.src = src;
        thumbs.appendChild(img);
    });

    // ❤️ Likes
    const likeBtn = document.getElementById("like-btn");
    if (isLiked(product.id)) likeBtn.textContent = "❤️";
    document.getElementById("like-count").textContent = likesCount[product.id];
    likeBtn.onclick = () => toggleLike(product.id);

    // 🛒 Panier
    document.getElementById("buy-btn").onclick = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Produit ajouté au panier 🛒");
    };

    // 💬 Message
    document.getElementById("message-btn").onclick = () => {
        alert("Fonction message vendeur à implémenter !");
    };
}
