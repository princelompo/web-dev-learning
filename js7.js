// ================================================
// SECTION 1 : CRÉATION ET INSERTION
// ================================================

let itemCount = 0;

function createElement() {
    const container = document.getElementById('creationContainer');
    const text = document.getElementById('itemText').value || 'Nouvel élément';

    // Créer l'élément
    const div = document.createElement('div');
    div.className = 'card';
    div.style.margin = '10px 0';
    div.style.padding = '10px 15px';
    div.style.borderLeft = '4px solid #0f3460';

    // Créer le contenu
    const h4 = document.createElement('h4');
    h4.textContent = text;
    h4.style.margin = '0';
    h4.style.color = '#0f3460';

    const p = document.createElement('p');
    p.textContent = `Créé à ${new Date().toLocaleTimeString()}`;
    p.style.margin = '5px 0 0 0';
    p.style.color = '#6c757d';
    p.style.fontSize = '0.85em';

    div.appendChild(h4);
    div.appendChild(p);

    // Ajouter au conteneur
    container.appendChild(div);
    itemCount++;

    document.getElementById('createOutput').textContent =
        `✅ Élément "${text}" créé (total : ${itemCount})\n` +
        `🕐 Heure : ${new Date().toLocaleTimeString()}`;
}

function createMultiple() {
    const container = document.getElementById('creationContainer');
    const text = document.getElementById('itemText').value || 'Élément';

    // Utiliser un fragment pour meilleure performance
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= 5; i++) {
        const div = document.createElement('div');
        div.className = 'card';
        div.style.margin = '10px 0';
        div.style.padding = '10px 15px';
        div.style.borderLeft = '4px solid #2ecc71';

        const h4 = document.createElement('h4');
        h4.textContent = `${text} ${itemCount + i}`;
        h4.style.margin = '0';
        h4.style.color = '#2ecc71';

        const p = document.createElement('p');
        p.textContent = `Créé à ${new Date().toLocaleTimeString()}`;
        p.style.margin = '5px 0 0 0';
        p.style.color = '#6c757d';
        p.style.fontSize = '0.85em';

        div.appendChild(h4);
        div.appendChild(p);
        fragment.appendChild(div);
    }

    container.appendChild(fragment);
    itemCount += 5;

    document.getElementById('createOutput').textContent =
        `✅ ${5} éléments créés avec un fragment (total : ${itemCount})\n` +
        `💡 Ajout en une seule fois → meilleure performance`;
}

function createWithHTML() {
    const container = document.getElementById('creationContainer');
    const text = document.getElementById('itemText').value || 'HTML Élément';

    // Utiliser insertAdjacentHTML
    container.insertAdjacentHTML('beforeend', `
                <div class="card" style="margin: 10px 0; padding: 10px 15px; border-left: 4px solid #f39c12;">
                    <h4 style="margin: 0; color: #f39c12;">${text}</h4>
                    <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 0.85em;">
                        Créé avec insertAdjacentHTML à ${new Date().toLocaleTimeString()}
                    </p>
                </div>
            `);
    itemCount++;

    document.getElementById('createOutput').textContent =
        `✅ Élément "${text}" créé avec insertAdjacentHTML (total : ${itemCount})`;
}

// ================================================
// SECTION 2 : SUPPRESSION
// ================================================

function deleteLast() {
    const container = document.getElementById('deleteContainer');
    const last = container.lastElementChild;

    if (last) {
        container.removeChild(last);
        document.getElementById('deleteOutput').textContent =
            `🗑️ Dernier élément supprimé\n` +
            `📊 Restant : ${container.children.length}`;
    } else {
        document.getElementById('deleteOutput').textContent =
            '⚠️ Aucun élément à supprimer';
    }
}

function deleteFirst() {
    const container = document.getElementById('deleteContainer');
    const first = container.firstElementChild;

    if (first) {
        first.remove(); // Méthode moderne
        document.getElementById('deleteOutput').textContent =
            `🗑️ Premier élément supprimé\n` +
            `📊 Restant : ${container.children.length}`;
    } else {
        document.getElementById('deleteOutput').textContent =
            '⚠️ Aucun élément à supprimer';
    }
}

function deleteAll() {
    const container = document.getElementById('deleteContainer');

    // Méthode moderne pour vider
    container.replaceChildren();

    document.getElementById('deleteOutput').textContent =
        `🧹 Tous les éléments ont été supprimés\n` +
        `📊 Restant : ${container.children.length}`;
}

function resetItems() {
    const container = document.getElementById('deleteContainer');
    const items = ['Élément 1', 'Élément 2', 'Élément 3', 'Élément 4', 'Élément 5', 'Élément 6'];

    // Vider avec removeChild
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Recréer
    const fragment = document.createDocumentFragment();
    items.forEach(text => {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = text;
        fragment.appendChild(div);
    });
    container.appendChild(fragment);

    document.getElementById('deleteOutput').textContent =
        `🔄 Réinitialisé : ${items.length} éléments\n` +
        `📊 Total : ${container.children.length}`;
}

// ================================================
// SECTION 3 : CLASSES ET STYLES
// ================================================

const styleDemo = document.getElementById('styleDemo');
let classCounter = 0;

function addClass() {
    classCounter++;
    const className = `custom-class-${classCounter}`;

    // Ajouter avec classList
    styleDemo.classList.add(className);

    // Ajouter un style pour la nouvelle classe
    const style = document.createElement('style');
    style.textContent = `
                .${className} {
                    border: 3px solid #e94560 !important;
                    background: #fff5f5 !important;
                    transform: scale(1.02);
                }
            `;
    document.head.appendChild(style);

    document.getElementById('styleOutput').textContent =
        `🏷️ Classe ajoutée : "${className}"\n` +
        `📋 Classes actuelles : ${styleDemo.className}`;
}

function removeClass() {
    const classes = Array.from(styleDemo.classList);
    const customClasses = classes.filter(c => c.startsWith('custom-class-'));

    if (customClasses.length > 0) {
        const last = customClasses[customClasses.length - 1];
        styleDemo.classList.remove(last);

        // Supprimer le style associé
        const styles = document.querySelectorAll('style');
        for (const style of styles) {
            if (style.textContent.includes(last)) {
                style.remove();
                break;
            }
        }

        document.getElementById('styleOutput').textContent =
            `🏷️ Classe supprimée : "${last}"\n` +
            `📋 Classes actuelles : ${styleDemo.className || '(aucune)'}`;
    } else {
        document.getElementById('styleOutput').textContent =
            '⚠️ Aucune classe personnalisée à supprimer';
    }
}

function toggleClass() {
    const toggled = styleDemo.classList.toggle('highlight');

    document.getElementById('styleOutput').textContent =
        `🔄 toggle('highlight') : ${toggled ? 'ajoutée' : 'supprimée'}\n` +
        `📋 Contient 'highlight' : ${styleDemo.classList.contains('highlight')}\n` +
        `📋 Classes actuelles : ${styleDemo.className || '(aucune)'}`;
}

function changeStyle() {
    // Modifier plusieurs styles
    styleDemo.style.cssText = `
                background: linear-gradient(135deg, #0f3460, #1a4f7a) !important;
                color: white !important;
                border: 3px solid #e94560 !important;
                border-radius: 12px !important;
                padding: 25px !important;
                transform: scale(1.05) !important;
                box-shadow: 0 8px 30px rgba(0,0,0,0.3) !important;
                transition: all 0.5s ease !important;
            `;

    // Modifier le contenu
    const h3 = styleDemo.querySelector('h3');
    h3.textContent = '🎨 Style modifié !';
    h3.style.color = '#e94560';

    const p = styleDemo.querySelector('p');
    p.textContent = `Styles appliqués à ${new Date().toLocaleTimeString()}`;
    p.style.color = '#a8d8ea';

    document.getElementById('styleOutput').textContent =
        '🎨 Styles modifiés avec cssText\n' +
        '📋 background, color, border, padding, transform, box-shadow';
}

function resetStyle() {
    // Réinitialiser les styles
    styleDemo.style.cssText = '';
    styleDemo.className = 'card';

    const h3 = styleDemo.querySelector('h3');
    h3.textContent = 'Élément de démonstration';
    h3.style.color = '';

    const p = styleDemo.querySelector('p');
    p.textContent = 'Ce bloc peut être modifié dynamiquement.';
    p.style.color = '';

    document.getElementById('styleOutput').textContent =
        '↩️ Styles réinitialisés à l\'état d\'origine';
}

// ================================================
// SECTION 4 : FRAGMENT DE DOCUMENT
// ================================================

function createWithFragment() {
    const container = document.getElementById('fragmentContainer');
    const startTime = performance.now();

    // Vider
    container.replaceChildren();

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= 100; i++) {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = `Item ${i}`;
        div.style.background = `hsl(${i * 3.6}, 70%, 50%)`;
        fragment.appendChild(div);
    }

    container.appendChild(fragment);

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    document.getElementById('fragmentOutput').textContent =
        `🚀 100 éléments créés avec DocumentFragment\n` +
        `⏱️ Temps d'exécution : ${duration}ms\n` +
        `📊 Total : ${container.children.length} éléments\n` +
        `💡 Un seul reflow !`;
}

function createWithoutFragment() {
    const container = document.getElementById('fragmentContainer');
    const startTime = performance.now();

    // Vider
    container.replaceChildren();

    for (let i = 1; i <= 100; i++) {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = `Item ${i}`;
        div.style.background = `hsl(${i * 3.6}, 70%, 50%)`;
        container.appendChild(div); // Chaque ajout provoque un reflow
    }

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    document.getElementById('fragmentOutput').textContent =
        `🐌 100 éléments créés SANS fragment\n` +
        `⏱️ Temps d'exécution : ${duration}ms\n` +
        `📊 Total : ${container.children.length} éléments\n` +
        `⚠️ ${100} reflows ! (moins performant)`;
}

function clearFragment() {
    const container = document.getElementById('fragmentContainer');
    container.replaceChildren();

    document.getElementById('fragmentOutput').textContent =
        '🧹 Conteneur vidé';
}

// ================================================
// MESSAGE D'INITIALISATION
// ================================================

console.log('✅ Manipulation avancée du DOM chargée !');
console.log('💡 Utilisez les boutons pour tester les différentes méthodes.');
