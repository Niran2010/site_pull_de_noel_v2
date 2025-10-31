// =======================================================================
// PARTIE GLOBALE : Variables et Fonctions accessibles depuis le HTML
// =======================================================================

// --- VARIABLES RENDUES GLOBALES POUR L'ACCÈS PAR toggleMenu() ---
let nombreFloconsEnBas = 0; 
const seuilGenant = 300; // Seuil de déclenchement pour l'alerte
let paiementAffiche = false; // État pour savoir si le formulaire est visible
// ---------------------------------------------------------------

/** Vérifie si le nombre de flocons est supérieur au seuil génant. */
let isMenuBlocked = () => {
    return nombreFloconsEnBas > seuilGenant;
}; 

/** Fonction appelée par onclick="toggleMenu()" pour afficher/masquer le menu. */
function toggleMenu() {
    // 1. ALERTE DE BLOCAGE DU MENU (CORRIGÉ)
    if (isMenuBlocked()) { 
        alert("PORTE BLOQUÉE TROP DE NEIGE ! Vous devez payer les 2€ pour débloquer le chemin vers le menu.");
        return; // Stoppe l'ouverture du menu
    }
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}

// --- Fonctions globales d'effet (Animation du bouton, etc.) ---

function afficherImageTemporaire(url) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Image temporaire";
  img.style.position = "fixed";
  img.style.top = "0";
  img.style.left = "0";
  img.style.width = "100vw";
  img.style.height = "100vh";
  img.style.objectFit = "cover";
  img.style.zIndex = "9999";
  img.style.pointerEvents = "none";

  document.body.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 200);
}

const popup = document.getElementById('age-verification-popup');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const deniedImg = document.getElementById('access-denied-img');
const txtAcceRefuse = document.getElementById('txt-acce-refuse');
const question = document.getElementById('question')

if (btnYes) {
    btnYes.addEventListener('click', () => {
        if (popup) popup.style.display = 'none';
        afficherImageTemporaire("images/image_liberte.jpg")
    });
}

if (btnNo) {
    btnNo.addEventListener('click', () => {
        if (btnYes) btnYes.style.display = 'none';
        if (btnNo) btnNo.style.display = 'none';
        if (deniedImg) deniedImg.style.display = 'block';
        if (txtAcceRefuse) txtAcceRefuse.style.display = 'block';
        if (question) question.style.display = 'none';
    });
}

let box = null; // Initialisation pour DOMContentLoaded
let position = 0;
let speed = 2;
let direction = 1;

function animate() {
    if (!box) return; // Sécurité

    const maxPosition = window.innerWidth - box.offsetWidth;
    position += speed * direction;

    if (position > maxPosition || position < 0) {
        direction *= -1;
        position = Math.max(0, Math.min(position, maxPosition));
    }

    box.style.left = position + "px";
    requestAnimationFrame(animate);
}


function showCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  if (banner) banner.style.display = "block";

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      if (banner) banner.style.display = "none";
    });
  }
}

// =======================================================================
// DÉBUT DU CONTENU DANS DOMContentLoaded (Logique des flocons et du paiement)
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {

    // A. PRÉPARATION DES ÉLÉMENTS DU DOM
    const snowContainer = document.getElementById('snow-container');
    const flakeCounterDisplay = document.getElementById('flake-counter-display');
    const popupGenant = document.getElementById('popup-genant');
    const btnValiderPaiement = document.getElementById('btn-valider-paiement');
    const ribPaypalInput = document.getElementById('rib-paypal-input');
    const popupText = document.getElementById('popup-text');
    const paiement = document.getElementById('demande-paiement');

    // Démarrage de l'animation du bouton "box"
    box = document.getElementById("box");
    if (box) {
        box.style.position = "absolute";
        animate(); 
    }
    
    // Affichage de la bannière de cookies
    showCookieBanner();

    // B. VARIABLES LOCALES ET CONSTANTES
    const MAX_ACCUMULATED_FLAKES = 3000;
    const FLAKE_CREATION_INTERVAL = 50;
    const ACCUMULATION_ZONE_HEIGHT = 40;
    const settledFlakes = []; 

    // C. DÉCLARATION DES FONCTIONS

    /** Retire tous les flocons accumulés du DOM et vide le tableau settledFlakes. */
    function clearAllSettledFlakes() {
        while (settledFlakes.length > 0) {
            const flake = settledFlakes.pop();
            if (flake && flake.parentNode) {
                flake.remove();
            }
        }
    }

    /** Gère l'affichage/masquage de l'alerte de paiement. */
    function verifierSeuilFlocons() {
        if (!popupGenant) return;

        if (nombreFloconsEnBas > seuilGenant) {
            popupGenant.classList.add('actif');

            // Appliquer l'animation de tremblement SEULEMENT si le paiement n'est pas encore affiché
            if (!paiementAffiche) {
                // Animation complète avec tremblement
                popupGenant.style.animation = 'sursaut-pop 0.2s ease-out forwards, tremblement 0.1s infinite alternate, couleur-clignotante 0.5s infinite step-start';
            } else {
                // Animation réduite sans tremblement (une fois le formulaire affiché)
                 popupGenant.style.animation = 'sursaut-pop 0.2s ease-out forwards, couleur-clignotante 0.5s infinite step-start';
            }

        } else {
            // S'assure que le pop-up est masqué et réinitialise l'animation
            // CLÉ : Le retrait de 'actif' masque la div entière
            popupGenant.classList.remove('actif', 'clique-pour-payer');
            popupGenant.style.animation = ''; // Enlève l'animation CSS inline
            // paiementAffiche est réinitialisé dans le gestionnaire de clic du bouton de validation
        }
    }

    /** Met à jour le texte du compteur affiché sur la page ET vérifie le seuil. */
    function updateCounterDisplay() {
        if (flakeCounterDisplay) {
            flakeCounterDisplay.textContent = `Flocons accumulés : ${nombreFloconsEnBas}`;
        }
        verifierSeuilFlocons();
    }
    updateCounterDisplay(); // Affiche le compteur initial (0)


    /** Gère un flocon qui a terminé sa chute */
    function handleSettledFlake(flake) {
        // ... (Logique de gestion de flocon) ...
        flake.style.animation = 'none';
        const finalBottomPosition = Math.random() * ACCUMULATION_ZONE_HEIGHT;
        flake.style.bottom = `${finalBottomPosition}px`;
        flake.style.top = 'auto';

        nombreFloconsEnBas++;
        settledFlakes.push(flake);

        if (settledFlakes.length > MAX_ACCUMULATED_FLAKES) {
            const oldestFlake = settledFlakes.shift();
            if (oldestFlake) {
                oldestFlake.remove();
                nombreFloconsEnBas--;
            }
        }
        updateCounterDisplay();
    }

    /** Crée un nouveau flocon */
    function createSnowflake() {
        if (!snowContainer) return;
        const snowflake = document.createElement('img');
        snowflake.src = 'images/image_flocon-modified.png';
        snowflake.className = 'snowflake';

        const size = Math.random() * 20 + 10;
        const fallDuration = Math.random() * 5 + 8;
        const swayDuration = Math.random() * 4 + 2;

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;

        snowContainer.appendChild(snowflake);

        snowflake.addEventListener('animationend', () => {
            handleSettledFlake(snowflake);
        });
    }

    // D. DÉCLENCHEMENT DE LA CHUTE DES FLOCONS
    setInterval(createSnowflake, FLAKE_CREATION_INTERVAL);


    // E. GESTION DES CLICS DU POP-UP GÊNANT
    
    // 1. GESTION DU CLIC SUR LA DIV D'ALERTE (#popup-genant)
    if (popupGenant) {
        popupGenant.addEventListener('click', () => {
            // S'active uniquement si le pop-up est visible (actif) ET que le formulaire n'a pas été affiché
            if (popupGenant.classList.contains('actif') && !paiementAffiche) {
                
                // Afficher la div de paiement en ajoutant une classe CSS
                popupGenant.classList.add('clique-pour-payer');
                paiement.style.display = 'block';
                
                // Mettre à jour l'état
                paiementAffiche = true;

                // Arrêter l'animation 'tremblement' via verifierSeuilFlocons
                verifierSeuilFlocons(); 
                
                if (popupText) {
                    popupText.textContent = "ALERTE CONFIRMÉE. Maintenant, payez pour le déneigement !";
                }
            }
        });
    }


    // 2. GESTION DU CLIC SUR LE BOUTON DE VALIDATION (#btn-valider-paiement)
    if (btnValiderPaiement) {
        btnValiderPaiement.addEventListener('click', (event) => {
            event.stopPropagation(); 
            
            const infoSaisie = ribPaypalInput ? ribPaypalInput.value.trim() : "";

            if (infoSaisie === "") {
                alert("HEY! Le déneigeur ne va pas venir gratuitement ! Saisissez quelque chose!");
                return;
            }
            
            alert(`Merci ! Vos informations : "${infoSaisie}" ont été envoyées au déneigeur (qui est un lutin très riche). L'accès à votre porte est maintenant débloqué... pour l'instant !`);

            // NETTOYAGE POST-PAIEMENT :
            clearAllSettledFlakes(); 
            
            // Réinitialiser les variables
            nombreFloconsEnBas = 0; 
            paiementAffiche = false; 
            paiement.style.display = 'none';
            // Mettre à jour l'affichage et déclencher le nettoyage final de la DIV
            // verifierSeuilFlocons() est appelée dans updateCounterDisplay et va retirer les classes 'actif' et 'clique-pour-payer'.
            updateCounterDisplay(); 
            
            if (ribPaypalInput) ribPaypalInput.value = "";
        });
    }
});