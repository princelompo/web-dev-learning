function display(message) {
    const output = document.getElementById('output');
    output.textContent = message;
    console.log(message);
}

function clearOutput() {
    display('Effacé. Cliquez sur un bouton pour tester...');
}

function demoIf() {
    let result = '=== if/else ===\n\n';
    const note = 15;

    let mention;
    if (note >= 16) mention = 'Très Bien';
    else if (note >= 14) mention = 'Bien';
    else if (note >= 12) mention = 'Assez Bien';
    else if (note >= 10) mention = 'Passable';
    else mention = 'Non admis';

    result += `Note : ${note}/20\n`;
    result += `Mention : ${mention}\n\n`;

    // Conditions imbriquées
    const age = 20;
    const aPermis = true;
    result += '=== Conditions imbriquées ===\n';
    if (age >= 18) {
        result += 'Âge suffisant.\n';
        if (aPermis) {
            result += 'Vous pouvez conduire.\n';
        } else {
            result += 'Vous devez passer le permis.\n';
        }
    } else {
        result += 'Vous êtes trop jeune.\n';
    }

    display(result);
}

function demoswitch() {
    let result = '=== switch ===\n\n';
    const jour = 3;

    let nomJour;
    switch (jour) {
        case 1: nomJour = 'Lundi'; break;
        case 2: nomJour = 'Mardi'; break;
        case 3: nomJour = 'Mercredi'; break;
        case 4: nomJour = 'Jeudi'; break;
        case 5: nomJour = 'Vendredi'; break;
        case 6: nomJour = 'Samedi'; break;
        case 7: nomJour = 'Dimanche'; break;
        default: nomJour = 'Jour invalide';
    }

    result += `Jour ${jour} : ${nomJour}\n\n`;

    // Saisons
    const mois = 3;
    let saison;
    switch (mois) {
        case 1: case 2: case 12:
            saison = 'Hiver'; break;
        case 3: case 4: case 5:
            saison = 'Printemps'; break;
        case 6: case 7: case 8:
            saison = 'Été'; break;
        case 9: case 10: case 11:
            saison = 'Automne'; break;
        default: saison = 'Mois invalide';
    }

    result += `Mois ${mois} : ${saison}`;

    display(result);
}

function demoFor() {
    let result = '=== for ===\n\n';

    result += '→ 0 à 4 :\n';
    for (let i = 0; i < 5; i++) {
        result += `  ${i}\n`;
    }

    result += '\n→ Pas de 2 :\n';
    for (let i = 0; i < 10; i += 2) {
        result += `  ${i}\n`;
    }

    result += '\n→ Décroissant :\n';
    for (let i = 5; i > 0; i--) {
        result += `  ${i}\n`;
    }

    display(result);
}

function demoWhile() {
    let result = '=== while ===\n\n';

    // while
    result += '→ while (0 à 4) :\n';
    let i = 0;
    while (i < 5) {
        result += `  ${i}\n`;
        i++;
    }

    // do...while
    result += '\n→ do...while (exécuté 1 fois) :\n';
    let x = 10;
    let count = 0;
    do {
        count++;
        result += `  Exécution n°${count}\n`;
    } while (x < 5);
    result += `  (condition fausse, arrêt après ${count} exécution(s))`;

    display(result);
}

function demoForOf() {
    let result = '=== for...of ===\n\n';

    result += '→ Tableau de fruits :\n';
    const fruits = ['pomme', 'banane', 'orange'];
    for (const fruit of fruits) {
        result += `  ${fruit}\n`;
    }

    result += '\n→ Chaîne de caractères :\n';
    const nom = 'Jean';
    for (const lettre of nom) {
        result += `  ${lettre}\n`;
    }

    result += '\n→ Set (valeurs uniques) :\n';
    const set = new Set([1, 2, 3, 3, 4]);
    for (const val of set) {
        result += `  ${val}\n`;
    }

    display(result);
}

function demoBreakContinue() {
    let result = '=== break et continue ===\n\n';

    // break
    result += '→ break (sort à i=5) :\n';
    for (let i = 0; i < 10; i++) {
        if (i === 5) {
            result += `  → break à ${i}\n`;
            break;
        }
        result += `  ${i}\n`;
    }

    // continue
    result += '\n→ continue (saute les pairs) :\n';
    for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) {
            result += `  → saute ${i}\n`;
            continue;
        }
        result += `  ${i}\n`;
    }

    // Labels
    result += '\n→ Labels (sortie de boucles imbriquées) :\n';
    let count = 0;
    outer: for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === 1 && j === 1) {
                result += `  → break outer à i=${i}, j=${j}\n`;
                break outer;
            }
            result += `  i=${i}, j=${j}\n`;
            count++;
        }
    }

    display(result);
}