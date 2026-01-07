const form = document.getElementById("login-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach(err => err.textContent = "");

    // Vérification champs vides
    if (!email || !password) {
        errorMessages[0].textContent = "Email requis";
        errorMessages[1].textContent = "Mot de passe requis";
        return;
    }

    // Récupération utilisateur stocké
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        errorMessages[0].textContent = "Aucun compte trouvé";
        return;
    }

    // Vérification email
    if (storedUser.email !== email) {
        errorMessages[0].textContent = "Email incorrect";
        return;
    }

    // (Mot de passe simulé)
    // ⚠️ Sans backend, on ne sécurise pas réellement
    if (password.length < 4) {
        errorMessages[1].textContent = "Mot de passe incorrect";
        return;
    }

    // ✅ Connexion réussie
    alert("Connexion réussie ✅");
    window.location.href = "articles.html";
});
