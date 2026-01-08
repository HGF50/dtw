// ================= FIREBASE =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCUxfmYYXJFBu5Km_QPtc6DHeuxyPLkeWs",
  authDomain: "drop-ton-weh.firebaseapp.com",
  projectId: "drop-ton-weh",
  storageBucket: "drop-ton-weh.appspot.com",
  messagingSenderId: "327745279064",
  appId: "1:327745279064:web:ca31188fecdfb36f56e62d"
};

// Initialisation
const app = initializeApp(firebaseConfig);
// au lieu de `const db = getFirestore(app);` et `const storage = getStorage(app);`
const db = window.db;
const storage = window.storage;

// ================= IMAGE PREVIEW =================
const imagesInput = document.getElementById("images");
const previewContainer = document.querySelector(".image-preview");

imagesInput.addEventListener("change", () => {
  previewContainer.innerHTML = ""; // Clear
  const files = imagesInput.files;
  for (let i = 0; i < files.length; i++) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(files[i]);
    previewContainer.appendChild(img);
  }
});

// ================= FORM SUBMIT =================
const form = document.getElementById("publier-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const brand = document.getElementById("brand").value.trim();
  const category = document.getElementById("category").value;
  const size = document.getElementById("size").value.trim();
  const condition = document.getElementById("Etat").value;
  const description = document.getElementById("description").value.trim();
  const price = parseInt(document.getElementById("price").value) + 200; // Ajouter frais de protection

  const imagesFiles = imagesInput.files;
  const imagesUrls = [];

  if (imagesFiles.length === 0) {
    alert("Veuillez ajouter au moins une image !");
    return;
  }

  // Upload images
  for (let i = 0; i < imagesFiles.length; i++) {
    const fileRef = ref(storage, `products/${Date.now()}_${imagesFiles[i].name}`);
    await uploadBytes(fileRef, imagesFiles[i]);
    const url = await getDownloadURL(fileRef);
    imagesUrls.push(url);
  }

  try {
    await addDoc(collection(db, "products"), {
      name,
      brand,
      category,
      size,
      condition,
      description,
      price,
      images: imagesUrls,
      likes: 0,
      createdAt: serverTimestamp()
    });

    alert("Article publié avec succès !");
    form.reset();
    previewContainer.innerHTML = "";
  } catch (error) {
    console.error("Erreur publication :", error);
    alert("Une erreur est survenue. Réessayez !");
  }
});
