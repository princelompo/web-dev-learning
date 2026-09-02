// Fonction pour afficher dans la console et dans l'output
function display(message) {
    const output = document.getElementById('output');
    output.innerHTML = message;
    console.log(message.replace(/<br>/g, '\n').replace(/&nbsp;/g, ' '));
}

// Fonction pour effacer
function clearOutput() {
    display('<span style="opacity: 0.5;">Effacé. Cliquez sur un bouton pour tester...</span>');
}

// Démonstration des variables
function demoVariables() {
    let html = '<strong>📦 Variables :</strong><br><br>';

    // var
    var nomVar = "Jean";
    var ageVar = 25;
    html += '<span style="color: #6c757d;">// var (ancienne méthode)</span><br>';
    html += `var nom = <span style="color: #2ecc71;">"${nomVar}"</span>;<br>`;
    html += `var age = <span style="color: #f39c12;">${ageVar}</span>;<br><br>`;

    // let
    let nomLet = "Marie";
    let ageLet = 30;
    nomLet = "Sophie"; // réaffectation
    html += '<span style="color: #6c757d;">// let (modifiable)</span><br>';
    html += `let nom = <span style="color: #2ecc71;">"${nomLet}"</span>;<br>`;
    html += `let age = <span style="color: #f39c12;">${ageLet}</span>;<br>`;
    html += '<span style="color: #6c757d;">// nom réaffecté à "Sophie"</span><br><br>';

    // const
    const PI = 3.14159;
    html += '<span style="color: #6c757d;">// const (constante)</span><br>';
    html += `const PI = <span style="color: #f39c12;">${PI}</span>;<br>`;
    html += '<span style="color: #6c757d;">// PI ne peut pas être réaffectée</span><br>';

    display(html);
}

// Démonstration des types
function demoTypes() {
    let html = '<strong>🔍 Types de données :</strong><br><br>';

    const chaine = "Bonjour";
    const nombre = 42;
    const booleen = true;
    let indefini;
    const nul = null;

    html += `typeof <span style="color: #2ecc71;">"${chaine}"</span> → <span style="color: #e94560;">${typeof chaine}</span><br>`;
    html += `typeof <span style="color: #f39c12;">${nombre}</span> → <span style="color: #e94560;">${typeof nombre}</span><br>`;
    html += `typeof <span style="color: #3498db;">${booleen}</span> → <span style="color: #e94560;">${typeof booleen}</span><br>`;
    html += `typeof <span style="color: #6c757d;">undefined</span> → <span style="color: #e94560;">${typeof indefini}</span><br>`;
    html += `typeof <span style="color: #6c757d;">null</span> → <span style="color: #e94560;">${typeof nul}</span> <span style="color: #6c757d;">(bug historique)</span><br>`;

    display(html);
}

// Démonstration des opérateurs
function demoOperateurs() {
    let html = '<strong>🧮 Opérateurs :</strong><br><br>';

    const a = 10;
    const b = 3;

    html += `a = <span style="color: #f39c12;">${a}</span>, b = <span style="color: #f39c12;">${b}</span><br><br>`;
    html += `<span style="color: #6c757d;">// Arithmétiques</span><br>`;
    html += `a + b = <span style="color: #e94560;">${a + b}</span><br>`;
    html += `a - b = <span style="color: #e94560;">${a - b}</span><br>`;
    html += `a * b = <span style="color: #e94560;">${a * b}</span><br>`;
    html += `a / b = <span style="color: #e94560;">${a / b}</span><br>`;
    html += `a % b = <span style="color: #e94560;">${a % b}</span><br>`;
    html += `a ** b = <span style="color: #e94560;">${a ** b}</span><br><br>`;

    html += `<span style="color: #6c757d;">// Comparaisons</span><br>`;
    html += `a === b → <span style="color: #e94560;">${a === b}</span><br>`;
    html += `a !== b → <span style="color: #e94560;">${a !== b}</span><br>`;
    html += `a > b → <span style="color: #e94560;">${a > b}</span><br>`;
    html += `a < b → <span style="color: #e94560;">${a < b}</span><br>`;

    display(html);
}

// Démonstration de la conversion
function demoConversion() {
    let html = '<strong>🔄 Conversion de types :</strong><br><br>';

    const nombre = 42;
    const chaine = "3.14";
    const booleen = true;

    html += `<span style="color: #6c757d;">// Vers String</span><br>`;
    html += `String(${nombre}) → <span style="color: #2ecc71;">"${String(nombre)}"</span><br>`;
    html += `String(${booleen}) → <span style="color: #2ecc71;">"${String(booleen)}"</span><br><br>`;

    html += `<span style="color: #6c757d;">// Vers Number</span><br>`;
    html += `Number("<span style="color: #2ecc71;">${chaine}</span>") → <span style="color: #f39c12;">${Number(chaine)}</span><br>`;
    html += `parseInt("<span style="color: #2ecc71;">42px</span>") → <span style="color: #f39c12;">${parseInt("42px")}</span><br>`;
    html += `parseFloat("<span style="color: #2ecc71;">3.14</span>") → <span style="color: #f39c12;">${parseFloat("3.14")}</span><br><br>`;

    html += `<span style="color: #6c757d;">// Vers Boolean</span><br>`;
    html += `Boolean(1) → <span style="color: #3498db;">${Boolean(1)}</span><br>`;
    html += `Boolean(0) → <span style="color: #3498db;">${Boolean(0)}</span><br>`;
    html += `Boolean("") → <span style="color: #3498db;">${Boolean("")}</span><br>`;
    html += `Boolean("texte") → <span style="color: #3498db;">${Boolean("texte")}</span><br>`;

    display(html);
}

// Afficher un message initial dans la console
console.log('📘 Jour 18 - Bienvenue dans la console JavaScript !');
console.log('💡 Utilisez les boutons pour voir les démonstrations.');