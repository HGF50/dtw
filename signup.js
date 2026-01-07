const form = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");

function showError(input, message) {
    const error = input.parentElement.querySelector("small.error");
    error.innerText = message;
    error.style.display = "block";
    input.style.borderColor = "red";
}

function showSuccess(input) {
    const error = input.parentElement.querySelector("small.error");
    error.innerText = "";
    error.style.display = "none";
    input.style.borderColor = "#5a86ff";
}

// Vérification email simple
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

form.addEventListener("submit", e => {
    e.preventDefault();

    let valid = true;

    // Nom
    if(nameInput.value.trim() === ""){
        showError(nameInput, "Le nom est requis");
        valid = false;
    } else showSuccess(nameInput);

    // Email
    if(emailInput.value.trim() === ""){
        showError(emailInput, "Email requis");
        valid = false;
    } else if(!isValidEmail(emailInput.value.trim())){
        showError(emailInput, "Email invalide");
        valid = false;
    } else showSuccess(emailInput);

    // Password
    if(passwordInput.value.length < 6){
        showError(passwordInput, "Mot de passe min 6 caractères");
        valid = false;
    } else showSuccess(passwordInput);

    // Confirmation
    if(confirmInput.value !== passwordInput.value){
        showError(confirmInput, "Les mots de passe ne correspondent pas");
        valid = false;
    } else showSuccess(confirmInput);

    // Si tout est bon
    if(valid){
        const user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Compte créé avec succès !");
        window.location.href = "profile.html"; // redirige vers le profil
    }
});
