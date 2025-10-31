// Les données (images simulées)
const productsData = {
    Un_superbe_Noël: [
        { name: "Un sapin (hurlant) CHANTANT", price: "400.99€", image: "../images/sapin-hurlant.png" },
        { name: "Guirlande balise, le père noël ne perdra pas le Nord", price: "37.50€", image: "../images/guirlande_balise.jpeg" },
        { name: "Buche de Noël Vegan, emballege 100% carton et rien d'autre ! Pas même de la buche.", price: "155.00€", image: "../images/buchue_vegan.jpeg" },
        { name: "Neige extra-fine, pour un hiver plus heureux, ennivrant et planant. Provenance : Colombie", price: "1550.00€", image: "../images/neige_extra-fine.jpeg" },
    ],
    Nos_produits_inédits: [
        { name: "Mug XMAS", price: "17.00€", image: "../images/mug.png" },
        { name: "T-shirt XMAS", price: "38.99€", image: "../images/t-shirt_xmas.jpeg" },
        { name: "Abonnement XMAS Stellaire-Ultra-Premium-Gold-Supra-Platinum", price: "2000.00€/jour", image: "../images/abonnement.jpeg" },
        { name: "Crypto XMAS. Effondrement des cours à prévoire le 25 décembre.", price: "10 quintilliard d'€/unité", image: "../images/crypto.jpeg" },
    ],
    Les_filles_Noël_régalent: [
        { name: "Crème à lustrer les boules", price: "99.99€", image: "../images/lustrant.jpeg" },
        { name: "Huile de traineaux, une glisse inoubliable.", price: "119.99€", image: "../images/lubrifiant.jpeg" },
        { name: "Coffret : Leurs photo les plus ... Pas d'image de présentation.", price: "999.00€", image: "https://via.placeholder.com/150/008000/ffffff?text=Gadget+3" },
        { name: "Petit sapin moelleu : un max de plaisir. Pas d'image de présentation.", price: "299.00€", image: "https://via.placeholder.com/150/008000/ffffff?text=Gadget+3" },
    ],
};

const categoryView = document.getElementById('category-view');
const productView = document.getElementById('product-view');
const productList = document.getElementById('product-list');
const productTitle = document.getElementById('product-title');
const backBtn = document.getElementById('back-btn');
const categoryButtons = document.querySelectorAll('.category-btn');

// Fonction pour afficher la vue des produits
function showProducts(category) {
    // Changement de vue
    categoryView.classList.add('hidden');
    productView.classList.remove('hidden');

    // Mettre à jour le titre
    productTitle.textContent = `CATÉGORIE: ${category.toUpperCase()} (Si vous arrivez à lire)`;

    // Remplir la liste des produits
    productList.innerHTML = ''; // Vider l'ancienne liste
    productsData[category].forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>PRIX: ${product.price}</p>
            <p style="color: red; font-weight: bold;">RUPTURE DE STOCK</p>
        `;
        // Ajouter un événement cliquable avec alerte pour rendre ça encore plus agaçant
        card.addEventListener('click', () => {
            alert(`ATTENTION: Le produit "${product.name}" est indisponible. Veuillez réessayer plus tard (ou jamais).`);
        });
        productList.appendChild(card);
    });

    // Déclencher un effet visuel désagréable au changement de page
    document.body.style.filter = 'invert(100%) hue-rotate(180deg)';
    setTimeout(() => {
        document.body.style.filter = 'none'; // Revenir à la normale (relativement)
    }, 500); // 0.5 seconde d'horreur
}

// Fonction pour revenir à la vue des catégories (simule le bouton "retour")
function goBack() {
    // Changement de vue
    productView.classList.add('hidden');
    categoryView.classList.remove('hidden');
    
    // Alerte inutile au retour
    alert("Êtes-vous sûr de vouloir revenir ? Votre progression a été perdue.");
}

// Événement sur les boutons de catégorie
categoryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        showProducts(category);
    });
});

// Événement sur le bouton de retour
backBtn.addEventListener('click', goBack);

// Un bouton flottant qui fait une alerte inutile
const floatingBtn = document.createElement('button');
floatingBtn.className = 'add-to-cart';
floatingBtn.textContent = 'NE PAS CLIQUER';
floatingBtn.addEventListener('click', () => {
    alert("Bravo, vous avez cliqué sur un bouton qui ne sert à rien.");
});
document.body.appendChild(floatingBtn);
// Un bouton flottant qui fait une alerte inutile
const floatingBtn2 = document.createElement('button2');
floatingBtn2.textContent = 'Retour au site principale';
floatingBtn2.className = 'retour';
floatingBtn2.addEventListener('click', () => {
    window.location.href = '../index.html';
    alert("Bravo, vous voila en sécurité.");
});
document.body.appendChild(floatingBtn2);