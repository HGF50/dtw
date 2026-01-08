const form = document.getElementById("publier-form");
const imagesInput = document.getElementById("images");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const brand = document.getElementById("brand").value;
  const category = document.getElementById("category").value;
  const size = document.getElementById("size").value || "-";
  const condition = document.getElementById("condition").value;
  const description = document.getElementById("description").value;
  const price = Number(document.getElementById("price").value);

  const files = imagesInput.files;
  if (files.length === 0) {
    alert("Ajoute au moins une image");
    return;
  }

  const imagesBase64 = [];
  let loaded = 0;

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();

    reader.onload = function () {
      imagesBase64.push(reader.result);
      loaded++;

      // Quand toutes les images sont chargées
      if (loaded === files.length) {
        saveArticle(imagesBase64);
      }
    };

    reader.readAsDataURL(files[i]);
  }

  function saveArticle(images) {
    const newArticle = {
      id: Date.now(),
      name,
      brand,
      category,
      size,
      condition,
      description,
      price,
      images // ✅ BASE64
    };

    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    articles.push(newArticle);
    localStorage.setItem("articles", JSON.stringify(articles));

    window.location.href = "index.html";
  }
});
