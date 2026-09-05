
// ================================================
// FORMULAIRE : VALIDATION ET GESTION
// ================================================

const form = document.getElementById('demoForm');
const output = document.getElementById('formOutput');

// ================================================
// VALIDATION EN TEMPS RÉEL
// ================================================

// Fonction de validation d'un champ
function validateField(field) {
    const errorId = `error-${field.id.replace('form', '').toLowerCase()}`;
    const errorElement = document.getElementById(errorId);

    if (field.validity.valid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        return true;
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        if (errorElement) {
            let message = field.validationMessage;

            // Messages personnalisés
            if (field.validity.valueMissing) {
                message = 'Ce champ est requis';
            } else if (field.validity.typeMismatch && field.type === 'email') {
                message = 'Veuillez entrer un email valide';
            } else if (field.validity.patternMismatch) {
                message = 'Format invalide';
            } else if (field.validity.tooShort) {
                message = `Minimum ${field.minLength} caractères`;
            } else if (field.validity.tooLong) {
                message = `Maximum ${field.maxLength} caractères`;
            } else if (field.validity.rangeUnderflow) {
                message = `Minimum ${field.min}`;
            } else if (field.validity.rangeOverflow) {
                message = `Maximum ${field.max}`;
            }

            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        return false;
    }
}

// Valider tous les champs
function validateAllFields() {
    const fields = form.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), select, textarea');
    let allValid = true;

    fields.forEach(field => {
        if (field.willValidate && !validateField(field)) {
            allValid = false;
        }
    });

    return allValid;
}

// Écouteurs sur les champs
const fields = form.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), select, textarea');
fields.forEach(field => {
    field.addEventListener('input', function () {
        validateField(this);
    });

    field.addEventListener('blur', function () {
        validateField(this);
    });
});

// ================================================
// COMPTEUR DE CARACTÈRES
// ================================================

const messageField = document.getElementById('formMessage');
const charCount = document.getElementById('charCount');

messageField.addEventListener('input', function () {
    const remaining = this.maxLength - this.value.length;

    charCount.textContent = `${remaining} caractères restants`;

    if (remaining < 20) {
        charCount.style.color = 'orange';
    } else if (remaining < 5) {
        charCount.style.color = 'red';
    } else {
        charCount.style.color = '#6c757d';
    }
});

// ================================================
// FORCE DU MOT DE PASSE
// ================================================

const passwordField = document.getElementById('formPassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

passwordField.addEventListener('input', function () {
    const strength = calculateStrength(this.value);
    updateStrengthUI(strength);

    // Validation personnalisée
    if (this.value.length > 0 && this.value.length < 8) {
        this.setCustomValidity('Minimum 8 caractères');
    } else {
        this.setCustomValidity('');
    }

    validateField(this);
});

function calculateStrength(password) {
    if (password.length === 0) return 0;

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    return Math.min(score, 5);
}

function updateStrengthUI(strength) {
    const levels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    const colors = ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#27ae60'];

    if (strength === 0) {
        strengthBar.style.width = '0%';
        strengthBar.style.background = '#bdc3c7';
        strengthText.textContent = 'Saisissez un mot de passe';
        strengthText.style.color = '#6c757d';
        return;
    }

    const index = strength - 1;
    strengthBar.style.width = `${(strength / 5) * 100}%`;
    strengthBar.style.background = colors[index];
    strengthText.textContent = levels[index];
    strengthText.style.color = colors[index];
}

// ================================================
// SOUMISSION DU FORMULAIRE
// ================================================

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Valider tous les champs
    if (!validateAllFields()) {
        output.textContent = '❌ Formulaire invalide. Corrigez les erreurs.';
        output.style.color = '#e74c3c';
        return;
    }

    // Récupérer les données
    const formData = new FormData(this);
    let data = {};

    for (const [key, value] of formData.entries()) {
        if (key === 'interets') {
            if (!data.interets) data.interets = [];
            data.interets.push(value);
        } else {
            data[key] = value;
        }
    }

    // Afficher les données
    output.style.color = '#e0e0e0';
    output.textContent =
        '✅ Formulaire valide !\n\n' +
        '📋 Données soumises :\n' +
        JSON.stringify(data, null, 2) +
        '\n\n🕐 Heure : ' + new Date().toLocaleString();

    console.log('Données du formulaire :', data);
});

// ================================================
// RÉINITIALISATION
// ================================================

form.addEventListener('reset', function (event) {
    if (!confirm('Voulez-vous vraiment réinitialiser le formulaire ?')) {
        event.preventDefault();
        return;
    }

    // Réinitialiser les styles
    setTimeout(() => {
        fields.forEach(field => {
            field.classList.remove('valid', 'invalid');
        });

        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });

        strengthBar.style.width = '0%';
        strengthBar.style.background = '#bdc3c7';
        strengthText.textContent = 'Saisissez un mot de passe';
        strengthText.style.color = '#6c757d';

        charCount.textContent = '500 caractères restants';
        charCount.style.color = '#6c757d';

        output.textContent = '🔄 Formulaire réinitialisé';
        output.style.color = '#e0e0e0';
    }, 10);
});

// ================================================
// AFFICHER LES DONNÉES
// ================================================

function showFormData() {
    const formData = new FormData(form);
    let data = {};

    for (const [key, value] of formData.entries()) {
        if (key === 'interets') {
            if (!data.interets) data.interets = [];
            data.interets.push(value);
        } else {
            data[key] = value;
        }
    }

    output.textContent =
        '📊 Données actuelles du formulaire :\n\n' +
        JSON.stringify(data, null, 2) +
        '\n\n✅ ' + (validateAllFields() ? 'Tous les champs sont valides' : 'Certains champs sont invalides');
}

// ================================================
// MESSAGE D'INITIALISATION
// ================================================

console.log('✅ Gestion du formulaire chargée !');
console.log('💡 Toutes les validations sont en temps réel.');
