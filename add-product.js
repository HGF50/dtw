const form = document.getElementById("product-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("product-name").value.trim();
    const price = document.getElementById("product-price").value;
    const category = document.getElementById("product-category").value;
    const imagesInput = document.getElementById("product-images");

    if (!name || !price || !category || imagesInput.files.length === 0) {
        alert("Veuillez remplir tous les champs ❌");
        return;
    }

    const images = [];
    const files = Array.from(imagesInput.files);

    // Convertir images en base64 (stockage local)
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function () {
            images.push(reader.result);

            // Quand toutes les images sont chargées
            if (images.length === files.length) {
                const product = {
                    id: Date.now(),
                    name,
                    price,
                    category,
                    photos: images
                };

                localStorage.setItem("product", JSON.stringify(product));
                alert("Annonce publiée ✅");
                window.location.href = "produit.html";
            }
        };
        reader.readAsDataURL(file);
    });
});
