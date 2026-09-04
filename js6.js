// ================================================
// SECTION 1 : ÉVÉNEMENTS DE BASE
// ================================================

// Événements de souris
const mouseDemo = document.getElementById('mouseDemo');
const mouseOutput = document.getElementById('mouseOutput');

function logMouse(event) {
    const events = {
        'mouseenter': '🟢 Entrée dans l\'élément',
        'mouseleave': '🔴 Sortie de l\'élément',
        'click': '🖱️ Clic',
        'dblclick': '🔄 Double clic',
        'mousedown': '⬇️ Bouton enfoncé',
        'mouseup': '⬆️ Bouton relâché'
    };

    const message = events[event.type] || event.type;
    mouseOutput.textContent = `Événement : ${message}\nTimestamp : ${event.timeStamp.toFixed(0)}ms`;

    // Changement de style
    mouseDemo.classList.toggle('active', event.type === 'click' || event.type === 'dblclick');
}

mouseDemo.addEventListener('mouseenter', logMouse);
mouseDemo.addEventListener('mouseleave', logMouse);
mouseDemo.addEventListener('click', logMouse);
mouseDemo.addEventListener('dblclick', logMouse);
mouseDemo.addEventListener('mousedown', logMouse);
mouseDemo.addEventListener('mouseup', logMouse);

// Événements de clavier
const keyDemo = document.getElementById('keyDemo');
const keyOutput = document.getElementById('keyOutput');

keyDemo.addEventListener('keydown', function (event) {
    keyOutput.textContent =
        `🔑 keydown : "${event.key}"\n` +
        `Code : ${event.code}\n` +
        `Shift : ${event.shiftKey}, Ctrl : ${event.ctrlKey}, Alt : ${event.altKey}\n` +
        `Valeur actuelle : "${this.value}"`;
});

keyDemo.addEventListener('input', function (event) {
    // L'événement input est déclenché à chaque saisie
    console.log('Input :', this.value);
});

// Coordonnées de la souris
const coordsDemo = document.getElementById('coordsDemo');
const coordsOutput = document.getElementById('coordsOutput');

coordsDemo.addEventListener('mousemove', function (event) {
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    coordsOutput.textContent =
        `📍 Position dans l'élément : X=${Math.round(x)}, Y=${Math.round(y)}\n` +
        `🖱️ Position dans la page : X=${event.pageX}, Y=${event.pageY}\n` +
        `📱 Position dans l'écran : X=${event.screenX}, Y=${event.screenY}`;
});

coordsDemo.addEventListener('mouseleave', function () {
    coordsOutput.textContent = '🖱️ Souris sortie de la zone';
});

// ================================================
// SECTION 2 : DÉLÉGATION D'ÉVÉNEMENTS
// ================================================

const delegationList = document.getElementById('delegationList');
const delegationOutput = document.getElementById('delegationOutput');
let itemCount = 5;

// Délégation : un seul écouteur sur le parent
delegationList.addEventListener('click', function (event) {
    const li = event.target.closest('li');
    if (li) {
        const text = li.textContent;
        const index = Array.from(this.children).indexOf(li) + 1;

        delegationOutput.textContent =
            `✅ Élément cliqué : "${text}"\n` +
            `📊 Position : ${index}/${this.children.length}\n` +
            `🕐 Heure : ${new Date().toLocaleTimeString()}`;

        // Marquer l'élément actif
        document.querySelectorAll('.delegation-demo li').forEach(el => el.classList.remove('active'));
        li.classList.add('active');
    }
});

// Ajouter des éléments dynamiquement
document.getElementById('addItemBtn').addEventListener('click', function () {
    itemCount++;
    const li = document.createElement('li');
    li.textContent = `Élément ${itemCount}`;
    delegationList.appendChild(li);

    // La délégation gère automatiquement les nouveaux éléments
    delegationOutput.textContent =
        `➕ Élément ${itemCount} ajouté !\n` +
        `📊 Nombre total : ${delegationList.children.length}`;
});

// ================================================
// SECTION 3 : PREVENT DEFAULT / STOP PROPAGATION
// ================================================

// preventDefault()
const preventLink = document.getElementById('preventLink');
const preventOutput = document.getElementById('preventOutput');

preventLink.addEventListener('click', function (event) {
    event.preventDefault();
    preventOutput.textContent =
        '🚫 Navigation empêchée par preventDefault()\n' +
        `💡 Lien : "${this.getAttribute('href')}"`;
});

// stopPropagation()
const parentDiv = document.getElementById('parentDiv');
const childBtn = document.getElementById('childBtn');
const propagationOutput = document.getElementById('propagationOutput');

parentDiv.addEventListener('click', function (event) {
    propagationOutput.textContent =
        '📦 Parent DIV cliqué (propagation normale)';
});

childBtn.addEventListener('click', function (event) {
    event.stopPropagation(); // Empêche la propagation vers le parent
    propagationOutput.textContent =
        '🔘 Bouton enfant cliqué - propagation arrêtée !\n' +
        '❌ Le parent ne recevra pas cet événement.';
});

// ================================================
// SECTION 4 : ÉVÉNEMENTS PERSONNALISÉS
// ================================================

const customEventBtn = document.getElementById('customEventBtn');
const customEventOutput = document.getElementById('customEventOutput');

// Écouter l'événement personnalisé
document.addEventListener('monEvenement', function (event) {
    customEventOutput.textContent =
        `🎯 Événement personnalisé reçu !\n` +
        `📋 Données : ${JSON.stringify(event.detail, null, 2)}\n` +
        `🕐 Heure : ${new Date().toLocaleTimeString()}`;
});

// Déclencher l'événement
customEventBtn.addEventListener('click', function () {
    const customEvent = new CustomEvent('monEvenement', {
        detail: {
            message: 'Bonjour depuis un événement personnalisé !',
            timestamp: Date.now(),
            utilisateur: 'Jean',
            action: 'custom-event'
        },
        bubbles: true
    });

    document.dispatchEvent(customEvent);
    customEventOutput.textContent = '⏳ Événement personnalisé envoyé...';
    setTimeout(() => {
        // Le résultat sera affiché par l'écouteur
    }, 100);
});

// Événement pour démonstration supplémentaire
const targetElement = document.getElementById('preventLink');
targetElement.addEventListener('mouseenter', function () {
    console.log('Souris entrée sur le lien');
});

// ================================================
// ÉVÉNEMENT DE FENÊTRE
// ================================================

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ DOM entièrement chargé !');
});

// load
window.addEventListener('load', function () {
    console.log('✅ Page entièrement chargée (images incluses) !');
});

// resize
window.addEventListener('resize', function () {
    console.log(`📐 Fenêtre redimensionnée : ${window.innerWidth}x${window.innerHeight}`);
});

// scroll
window.addEventListener('scroll', function () {
    console.log(`📜 Défilement : ${window.scrollY}px`);
});

console.log('✅ Tous les écouteurs d\'événements sont configurés !');
