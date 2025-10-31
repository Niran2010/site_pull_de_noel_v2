document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("btn-creer");
  const popup = document.querySelector(".pop-up-cache");

  btn.addEventListener("click", function() {
    // On récupère les valeurs des champs
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm").value.trim();

    // Vérifie que tous les champs sont remplis
    if (!nom || !email || !password || !confirm) {
      alert("⚠️ Veuillez remplir tous les champs avant de continuer !");
      return;
    }

    // Vérifie que les mots de passe correspondent
    if (password !== confirm) {
      alert("❌ Les mots de passe ne correspondent pas !");
      return;
    }

    // Si tout est bon → affiche la pop-up
    popup.style.display = "flex";  // on affiche la pop-up
    setTimeout(() => popup.style.display = 'none', 2000);
  });
});
