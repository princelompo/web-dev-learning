function display(message) {
    const output = document.getElementById('output');
    output.textContent = message;
    console.log(message);
}

function clearOutput() {
    display('Effacé. Cliquez sur un bouton pour tester...');
}

function demoDeclaration() {
    let result = '=== Déclarations de fonctions ===\n\n';

    // Function Declaration
    function additionner(a, b) {
        return a + b;
    }

    // Function Expression
    const multiplier = function (a, b) {
        return a * b;
    };

    // Arrow Function
    const carre = x => x * x;

    result += '→ Function Declaration :\n';
    result += `  additionner(5, 3) = ${additionner(5, 3)}\n\n`;

    result += '→ Function Expression :\n';
    result += `  multiplier(5, 3) = ${multiplier(5, 3)}\n\n`;

    result += '→ Arrow Function :\n';
    result += `  carre(5) = ${carre(5)}\n`;

    display(result);
}

function demoParametres() {
    let result = '=== Paramètres ===\n\n';

    // Paramètres par défaut
    function saluer(nom = 'inconnu', age = 0) {
        return `Bonjour ${nom}, ${age} ans.`;
    }

    result += '→ Paramètres par défaut :\n';
    result += `  saluer() = "${saluer()}"\n`;
    result += `  saluer("Jean") = "${saluer("Jean")}"\n`;
    result += `  saluer("Jean", 25) = "${saluer("Jean", 25)}"\n\n`;

    // Paramètres rest
    function somme(...nombres) {
        return nombres.reduce((acc, n) => acc + n, 0);
    }

    result += '→ Paramètres rest :\n';
    result += `  somme(1, 2, 3) = ${somme(1, 2, 3)}\n`;
    result += `  somme(1, 2, 3, 4, 5) = ${somme(1, 2, 3, 4, 5)}\n\n`;

    // Destructuration
    function afficherPersonne({ nom, age, ville = 'inconnue' }) {
        return `Nom: ${nom}, Âge: ${age}, Ville: ${ville}`;
    }

    const personne = { nom: 'Jean', age: 25 };
    result += '→ Destructuration :\n';
    result += `  ${afficherPersonne(personne)}`;

    display(result);
}

function demoClosure() {
    let result = '=== Closures ===\n\n';

    function creerCompteur() {
        let compteur = 0;
        return function () {
            compteur++;
            return compteur;
        };
    }

    const compteur1 = creerCompteur();
    const compteur2 = creerCompteur();

    result += '→ Compteur 1 :\n';
    result += `  ${compteur1()}\n`;
    result += `  ${compteur1()}\n`;
    result += `  ${compteur1()}\n\n`;

    result += '→ Compteur 2 (indépendant) :\n';
    result += `  ${compteur2()}\n`;
    result += `  ${compteur2()}\n\n`;

    // Fabrique de fonctions
    function creerMultiplicateur(facteur) {
        return function (nombre) {
            return nombre * facteur;
        };
    }

    const doubler = creerMultiplicateur(2);
    const tripler = creerMultiplicateur(3);

    result += '→ Fabrique de fonctions :\n';
    result += `  doubler(5) = ${doubler(5)}\n`;
    result += `  tripler(5) = ${tripler(5)}`;

    display(result);
}

function demoCalcul() {
    let result = '=== Fonctions de calcul ===\n\n';

    // Calculs avec différents types de fonctions
    const operations = {
        addition: (a, b) => a + b,
        soustraction: (a, b) => a - b,
        multiplication: (a, b) => a * b,
        division: (a, b) => a / b,
        puissance: (a, b) => a ** b,
        modulo: (a, b) => a % b
    };

    const a = 10;
    const b = 3;

    result += `a = ${a}, b = ${b}\n\n`;

    for (const [nom, operation] of Object.entries(operations)) {
        result += `${nom} : ${operation(a, b)}\n`;
    }

    // Fonction qui retourne une fonction
    function creerOperateur(type) {
        switch (type) {
            case 'add': return (a, b) => a + b;
            case 'sub': return (a, b) => a - b;
            case 'mul': return (a, b) => a * b;
            case 'div': return (a, b) => a / b;
            default: return (a, b) => a + b;
        }
    }

    const add = creerOperateur('add');
    const mul = creerOperateur('mul');

    result += '\n→ Fabrique d\'opérateurs :\n';
    result += `  add(10, 5) = ${add(10, 5)}\n`;
    result += `  mul(10, 5) = ${mul(10, 5)}`;

    display(result);
}