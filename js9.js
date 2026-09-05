
// ================================================
// FONCTIONS D'AFFICHAGE
// ================================================

function display(container, message, isError = false) {
    const el = document.getElementById(container);
    el.textContent = message;
    if (isError) {
        el.style.color = '#e74c3c';
    } else {
        el.style.color = '#e0e0e0';
    }
    console.log(message);
}

function clearResult() {
    display('apiResult', 'Effacé. Cliquez sur un bouton pour tester...');
}

// ================================================
// SECTION 1 : REQUÊTES API
// ================================================

// GET /users
async function getUsers() {
    display('apiResult', '🔄 Chargement des utilisateurs...');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const users = await response.json();

        let result = `✅ ${users.length} utilisateurs récupérés :\n\n`;
        users.slice(0, 5).forEach(user => {
            result += `  👤 ${user.name} (${user.email})\n`;
            result += `     📍 ${user.address.city}\n\n`;
        });
        if (users.length > 5) {
            result += `  ... et ${users.length - 5} autres\n`;
        }

        display('apiResult', result);

    } catch (error) {
        display('apiResult', `❌ Erreur: ${error.message}`, true);
    }
}

// GET /posts
async function getPosts() {
    display('apiResult', '🔄 Chargement des articles...');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const posts = await response.json();

        let result = `✅ ${posts.length} articles récupérés :\n\n`;
        posts.slice(0, 5).forEach(post => {
            const title = post.title.length > 40 ? post.title.slice(0, 40) + '...' : post.title;
            result += `  📝 ${title}\n`;
            result += `     User ID: ${post.userId}\n\n`;
        });
        if (posts.length > 5) {
            result += `  ... et ${posts.length - 5} autres`;
        }

        display('apiResult', result);

    } catch (error) {
        display('apiResult', `❌ Erreur: ${error.message}`, true);
    }
}

// GET /posts/1
async function getPostById() {
    display('apiResult', '🔄 Chargement de l\'article #1...');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const post = await response.json();

        let result = `✅ Article #${post.id} récupéré :\n\n`;
        result += `  📝 Titre: ${post.title}\n\n`;
        result += `  📄 Contenu:\n  ${post.body}\n\n`;
        result += `  👤 User ID: ${post.userId}`;

        display('apiResult', result);

    } catch (error) {
        display('apiResult', `❌ Erreur: ${error.message}`, true);
    }
}

// POST /posts
async function createPost() {
    display('apiResult', '🔄 Création d\'un article...');

    const data = {
        title: 'Mon nouvel article',
        body: 'Contenu de l\'article créé avec fetch POST',
        userId: 1
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();

        display('apiResult',
            `✅ Article créé avec succès !\n\n` +
            `📋 Données reçues :\n` +
            JSON.stringify(result, null, 2)
        );

    } catch (error) {
        display('apiResult', `❌ Erreur: ${error.message}`, true);
    }
}

// ================================================
// SECTION 2 : AJOUT UTILISATEUR
// ================================================

async function addUser() {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();

    if (!name || !email) {
        display('addResult', '❌ Veuillez remplir tous les champs', true);
        return;
    }

    display('addResult', '🔄 Ajout de l\'utilisateur...');

    const data = {
        name: name,
        email: email,
        username: name.toLowerCase().replace(/\s/g, ''),
        phone: '01 23 45 67 89'
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();

        display('addResult',
            `✅ Utilisateur ajouté avec succès !\n\n` +
            `📋 Données envoyées :\n${JSON.stringify(data, null, 2)}\n\n` +
            `📋 Réponse du serveur :\n${JSON.stringify(result, null, 2)}`
        );

        // Réinitialiser les champs
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';

    } catch (error) {
        display('addResult', `❌ Erreur: ${error.message}`, true);
    }
}

// ================================================
// SECTION 3 : GESTION D'ERREURS
// ================================================

// 404 Not Found
async function testError404() {
    display('errorResult', '🔄 Test de 404...');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/999');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        display('errorResult', `✅ Succès: ${JSON.stringify(data)}`);

    } catch (error) {
        display('errorResult',
            `❌ Erreur 404 gérée avec succès !\n\n` +
            `📋 ${error.message}\n\n` +
            `💡 La requête a été interceptée et gérée proprement.`,
            true
        );
    }
}

// 500 Server Error (simulé)
async function testError500() {
    display('errorResult', '🔄 Test de 500...');

    try {
        // URL qui retourne une erreur 500
        const response = await fetch('https://httpbin.org/status/500');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Erreur serveur`);
        }

        const data = await response.json();
        display('errorResult', `✅ Succès: ${JSON.stringify(data)}`);

    } catch (error) {
        display('errorResult',
            `❌ Erreur 500 gérée avec succès !\n\n` +
            `📋 ${error.message}\n\n` +
            `💡 L'erreur serveur a été capturée et traitée.`,
            true
        );
    }
}

// Timeout
async function testTimeout() {
    display('errorResult', '⏱️ Test de timeout (5s)...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch('https://httpbin.org/delay/10', {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        display('errorResult', `✅ Succès: ${JSON.stringify(data)}`);

    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            display('errorResult',
                `⏱️ Timeout atteint !\n\n` +
                `📋 La requête a été annulée après 5 secondes.\n` +
                `💡 La requête a été interrompue proprement.`,
                true
            );
        } else {
            display('errorResult', `❌ Erreur: ${error.message}`, true);
        }
    }
}

// Retry avec backoff
async function testRetry() {
    display('errorResult', '🔄 Test de retry (backoff exponentiel)...');

    let result = '🔄 Test de retry avec backoff\n\n';

    try {
        const data = await fetchWithRetry('https://httpbin.org/status/500', 3, 1000);
        result += `✅ Succès: ${JSON.stringify(data)}`;

    } catch (error) {
        result +=
            `❌ Échec après plusieurs tentatives\n\n` +
            `📋 Dernière erreur: ${error.message}\n` +
            `💡 Le mécanisme de retry a fonctionné.`;
    }

    display('errorResult', result, result.includes('❌'));
}

// Fonction de retry avec backoff
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            lastError = error;

            if (attempt < maxRetries) {
                const waitTime = delay * Math.pow(2, attempt - 1);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
    }

    throw lastError;
}

// ================================================
// MESSAGE D'INITIALISATION
// ================================================

console.log('✅ Fetch API chargée !');
console.log('💡 Utilisez les boutons pour tester les requêtes asynchrones.');
console.log('📖 API utilisée: JSONPlaceholder (https://jsonplaceholder.typicode.com)');