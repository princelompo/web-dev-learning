// ================================================
// APPLICATION TO-DO LIST
// ================================================
// Version 1.0.0
// ================================================

// ================================================
// 1. CONFIGURATION
// ================================================

const CONFIG = {
    STORAGE_KEY: 'todo_app_tasks',
    THEME_KEY: 'todo_app_theme'
};

// ================================================
// 2. ÉTAT DE L'APPLICATION
// ================================================

let state = {
    tasks: [],
    currentFilter: 'all',
    searchQuery: '',
    editingId: null,
    darkMode: false
};

// ================================================
// 3. GESTION DES DONNÉES (localStorage)
// ================================================

/**
 * Récupère les tâches du localStorage
 * @returns {Array} Liste des tâches
 */
function getTasks() {
    try {
        const data = localStorage.getItem(CONFIG.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Erreur de lecture des tâches:', error);
        return [];
    }
}

/**
 * Sauvegarde les tâches dans le localStorage
 * @param {Array} tasks - Liste des tâches
 */
function saveTasks(tasks) {
    try {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Erreur de sauvegarde des tâches:', error);
    }
}

/**
 * Récupère la préférence de thème
 * @returns {boolean} true si mode sombre activé
 */
function getThemePreference() {
    try {
        const data = localStorage.getItem(CONFIG.THEME_KEY);
        return data ? JSON.parse(data) : false;
    } catch (error) {
        console.error('Erreur de lecture du thème:', error);
        return false;
    }
}

/**
 * Sauvegarde la préférence de thème
 * @param {boolean} darkMode - true pour mode sombre
 */
function saveThemePreference(darkMode) {
    try {
        localStorage.setItem(CONFIG.THEME_KEY, JSON.stringify(darkMode));
    } catch (error) {
        console.error('Erreur de sauvegarde du thème:', error);
    }
}

// ================================================
// 4. CRUD - TÂCHES
// ================================================

/**
 * Crée une nouvelle tâche
 * @param {Object} taskData - Données de la tâche
 * @returns {Object} La tâche créée
 */
function createTask(taskData) {
    const task = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        title: taskData.title.trim(),
        description: taskData.description?.trim() || '',
        category: taskData.category || 'personnel',
        priority: taskData.priority || 'moyenne',
        dueDate: taskData.dueDate || null,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    const tasks = getTasks();
    tasks.unshift(task); // Ajoute au début
    saveTasks(tasks);
    state.tasks = tasks;
    
    return task;
}

/**
 * Récupère toutes les tâches
 * @returns {Array} Liste des tâches
 */
function getAllTasks() {
    return getTasks();
}

/**
 * Récupère une tâche par son ID
 * @param {string} id - ID de la tâche
 * @returns {Object|null} La tâche trouvée ou null
 */
function getTaskById(id) {
    const tasks = getTasks();
    return tasks.find(task => task.id === id) || null;
}

/**
 * Met à jour une tâche
 * @param {string} id - ID de la tâche
 * @param {Object} updates - Données à mettre à jour
 * @returns {Object|null} La tâche mise à jour ou null
 */
function updateTask(id, updates) {
    const tasks = getTasks();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) return null;
    
    tasks[index] = { ...tasks[index], ...updates };
    saveTasks(tasks);
    state.tasks = tasks;
    
    return tasks[index];
}

/**
 * Supprime une tâche
 * @param {string} id - ID de la tâche
 * @returns {boolean} true si supprimée
 */
function deleteTask(id) {
    const tasks = getTasks();
    const filtered = tasks.filter(task => task.id !== id);
    
    if (filtered.length === tasks.length) return false;
    
    saveTasks(filtered);
    state.tasks = filtered;
    return true;
}

/**
 * Bascule l'état terminé d'une tâche
 * @param {string} id - ID de la tâche
 * @returns {Object|null} La tâche mise à jour
 */
function toggleTaskCompletion(id) {
    const task = getTaskById(id);
    if (!task) return null;
    
    return updateTask(id, { completed: !task.completed });
}

// ================================================
// 5. FILTRES ET RECHERCHE
// ================================================

/**
 * Filtre les tâches selon le filtre actif
 * @param {Array} tasks - Liste des tâches
 * @param {string} filter - Type de filtre
 * @returns {Array} Tâches filtrées
 */
function filterTasks(tasks, filter) {
    switch (filter) {
        case 'all':
            return tasks;
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            // Filtre par catégorie (ex: 'categorie-travail')
            if (filter.startsWith('categorie-')) {
                const category = filter.replace('categorie-', '');
                return tasks.filter(task => task.category === category);
            }
            return tasks;
    }
}

/**
 * Recherche des tâches par titre ou description
 * @param {Array} tasks - Liste des tâches
 * @param {string} query - Terme de recherche
 * @returns {Array} Tâches correspondantes
 */
function searchTasks(tasks, query) {
    if (!query || query.trim() === '') return tasks;
    
    const lowerQuery = query.toLowerCase().trim();
    return tasks.filter(task =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Obtient les tâches filtrées et recherchées
 * @returns {Array} Tâches affichées
 */
function getDisplayedTasks() {
    let tasks = getTasks();
    tasks = filterTasks(tasks, state.currentFilter);
    tasks = searchTasks(tasks, state.searchQuery);
    return tasks;
}

// ================================================
// 6. STATISTIQUES
// ================================================

/**
 * Calcule les statistiques des tâches
 * @param {Array} tasks - Liste des tâches
 * @returns {Object} Statistiques
 */
function getStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    
    // Compter les catégories uniques
    const categories = new Set(tasks.map(t => t.category));
    const categoryCount = categories.size;
    
    return { total, completed, pending, categoryCount };
}

// ================================================
// 7. RENDU DOM
// ================================================

/**
 * Met à jour les statistiques dans l'interface
 * @param {Array} tasks - Liste des tâches
 */
function renderStats(tasks) {
    const stats = getStats(tasks);
    
    document.getElementById('totalCount').textContent = stats.total;
    document.getElementById('completedCount').textContent = stats.completed;
    document.getElementById('pendingCount').textContent = stats.pending;
    document.getElementById('categoryCount').textContent = stats.categoryCount;
}

/**
 * Crée un élément HTML pour une tâche
 * @param {Object} task - La tâche
 * @returns {string} HTML de la tâche
 */
function createTaskHTML(task) {
    const priorityLabels = {
        basse: '🟢 Basse',
        moyenne: '🟡 Moyenne',
        haute: '🔴 Haute'
    };
    
    const categoryIcons = {
        personnel: '👤',
        travail: '💼',
        urgent: '🔴',
        maison: '🏠',
        loisirs: '🎮'
    };
    
    const categoryLabels = {
        personnel: 'Personnel',
        travail: 'Travail',
        urgent: 'Urgent',
        maison: 'Maison',
        loisirs: 'Loisirs'
    };
    
    const priorityClass = `priorite-${task.priority}`;
    const isDone = task.completed;
    
    // Format de la date d'échéance
    let dueDateHTML = '';
    if (task.dueDate) {
        const date = new Date(task.dueDate + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let dateLabel = date.toLocaleDateString('fr-FR');
        const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            dateLabel += ' ⚠️ Dépassée';
        } else if (diffDays === 0) {
            dateLabel += ' 📅 Aujourd\'hui';
        } else if (diffDays === 1) {
            dateLabel += ' 📅 Demain';
        }
        
        dueDateHTML = `<span class="badge">📅 ${dateLabel}</span>`;
    }
    
    return `
        <div class="task-item" data-id="${task.id}">
            <div class="checkbox ${isDone ? 'done' : ''}" 
                 data-action="toggle" 
                 role="checkbox" 
                 aria-checked="${isDone}"
                 tabindex="0">
            </div>
            <div class="task-content">
                <div class="task-title ${isDone ? 'done' : ''}">${escapeHTML(task.title)}</div>
                ${task.description ? `<div class="task-description">${escapeHTML(task.description)}</div>` : ''}
                <div class="task-meta">
                    <span class="badge ${priorityClass}">${priorityLabels[task.priority]}</span>
                    <span class="badge categorie">${categoryIcons[task.category] || '📌'} ${categoryLabels[task.category] || task.category}</span>
                    ${dueDateHTML}
                    <span class="badge" style="font-size: 0.75em; opacity: 0.6;">${new Date(task.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="edit-btn" data-action="edit" aria-label="Modifier">✏️</button>
                <button class="delete-btn" data-action="delete" aria-label="Supprimer">🗑️</button>
            </div>
        </div>
    `;
}

/**
 * Échappe les caractères HTML pour la sécurité
 * @param {string} text - Texte à échapper
 * @returns {string} Texte échappé
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Affiche les tâches dans la liste
 * @param {Array} tasks - Liste des tâches à afficher
 */
function renderTasks(tasks) {
    const container = document.getElementById('taskList');
    
    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="icon">📭</span>
                <h3>Aucune tâche</h3>
                <p>Ajoutez votre première tâche ci-dessus !</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = tasks.map(task => createTaskHTML(task)).join('');
}

/**
 * Met à jour l'interface complète
 */
function updateUI() {
    const tasks = getTasks();
    const displayedTasks = getDisplayedTasks();
    
    renderStats(tasks);
    renderTasks(displayedTasks);
    updateFilterButtons();
}

// ================================================
// 8. FILTRES - INTERFACE
// ================================================

/**
 * Met à jour l'état des boutons de filtre
 */
function updateFilterButtons() {
    // Filtres principaux
    document.querySelectorAll('.filter-group:first-child .filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === state.currentFilter);
    });
    
    // Filtres par catégorie
    document.querySelectorAll('#categoryFilters .filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === state.currentFilter);
    });
}

/**
 * Applique un filtre
 * @param {string} filter - Nom du filtre
 */
function applyFilter(filter) {
    state.currentFilter = filter;
    updateUI();
}

// ================================================
// 9. THÈME (CLAIR/SOMBRE)
// ================================================

/**
 * Bascule le thème clair/sombre
 */
function toggleTheme() {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('dark-mode', state.darkMode);
    saveThemePreference(state.darkMode);
    
    const themeBtn = document.getElementById('themeToggle');
    themeBtn.textContent = state.darkMode ? '☀️ Mode clair' : '🌙 Mode sombre';
}

/**
 * Initialise le thème
 */
function initTheme() {
    state.darkMode = getThemePreference();
    document.body.classList.toggle('dark-mode', state.darkMode);
    
    const themeBtn = document.getElementById('themeToggle');
    themeBtn.textContent = state.darkMode ? '☀️ Mode clair' : '🌙 Mode sombre';
}

// ================================================
// 10. FORMULAIRE - GESTION
// ================================================

/**
 * Récupère les données du formulaire
 * @returns {Object} Données du formulaire
 */
function getFormData() {
    return {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        category: document.getElementById('taskCategory').value,
        priority: document.getElementById('taskPriority').value,
        dueDate: document.getElementById('taskDueDate').value || null
    };
}

/**
 * Réinitialise le formulaire
 */
function resetForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskCategory').value = 'personnel';
    document.getElementById('taskPriority').value = 'moyenne';
    document.getElementById('taskDueDate').value = '';
    
    state.editingId = null;
    
    const saveBtn = document.getElementById('saveTaskBtn');
    saveBtn.textContent = '➕ Ajouter';
    
    const cancelBtn = document.getElementById('cancelEditBtn');
    cancelBtn.style.display = 'none';
}

/**
 * Remplit le formulaire pour l'édition
 * @param {Object} task - La tâche à éditer
 */
function fillFormForEdit(task) {
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description || '';
    document.getElementById('taskCategory').value = task.category;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskDueDate').value = task.dueDate || '';
    
    state.editingId = task.id;
    
    const saveBtn = document.getElementById('saveTaskBtn');
    saveBtn.textContent = '💾 Mettre à jour';
    
    const cancelBtn = document.getElementById('cancelEditBtn');
    cancelBtn.style.display = 'inline-block';
}

/**
 * Gère la soumission du formulaire (ajout ou modification)
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = getFormData();
    
    // Validation
    if (!formData.title || formData.title.trim() === '') {
        alert('Veuillez saisir un titre pour la tâche.');
        document.getElementById('taskTitle').focus();
        return;
    }
    
    if (state.editingId) {
        // Mode édition
        const updated = updateTask(state.editingId, {
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: formData.category,
            priority: formData.priority,
            dueDate: formData.dueDate
        });
        
        if (updated) {
            console.log('✅ Tâche mise à jour:', updated.title);
        }
    } else {
        // Mode création
        const task = createTask(formData);
        console.log('✅ Tâche créée:', task.title);
    }
    
    resetForm();
    updateUI();
}

/**
 * Gère l'annulation de l'édition
 */
function handleCancelEdit() {
    resetForm();
    updateUI();
}

// ================================================
// 11. GESTION DES ÉVÉNEMENTS
// ================================================

/**
 * Configure tous les écouteurs d'événements
 */
function setupEventListeners() {
    // Formulaire
    document.getElementById('saveTaskBtn').addEventListener('click', handleFormSubmit);
    document.getElementById('cancelEditBtn').addEventListener('click', handleCancelEdit);
    
    // Soumission du formulaire avec Entrée (sans recharger la page)
    document.querySelectorAll('#addTaskForm input, #addTaskForm textarea, #addTaskForm select').forEach(field => {
        field.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
                event.preventDefault();
                handleFormSubmit(event);
            }
        });
    });
    
    // Filtres principaux
    document.querySelectorAll('.filter-group:first-child .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyFilter(btn.dataset.filter);
        });
    });
    
    // Filtres par catégorie
    document.querySelectorAll('#categoryFilters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyFilter(btn.dataset.filter);
        });
    });
    
    // Recherche
    document.getElementById('searchInput').addEventListener('input', (event) => {
        state.searchQuery = event.target.value;
        updateUI();
    });
    
    // Délégation d'événements sur la liste des tâches
    document.getElementById('taskList').addEventListener('click', (event) => {
        const target = event.target.closest('[data-action]');
        if (!target) return;
        
        const action = target.dataset.action;
        const taskItem = target.closest('.task-item');
        if (!taskItem) return;
        
        const taskId = taskItem.dataset.id;
        
        switch (action) {
            case 'toggle':
                toggleTaskCompletion(taskId);
                updateUI();
                break;
                
            case 'edit':
                const task = getTaskById(taskId);
                if (task) {
                    fillFormForEdit(task);
                    document.getElementById('taskTitle').focus();
                }
                break;
                
            case 'delete':
                if (confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
                    deleteTask(taskId);
                    updateUI();
                    console.log('🗑️ Tâche supprimée:', taskId);
                }
                break;
        }
    });
    
    // Support clavier pour les checkboxes
    document.getElementById('taskList').addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            const checkbox = event.target.closest('.checkbox');
            if (checkbox) {
                event.preventDefault();
                const taskItem = checkbox.closest('.task-item');
                if (taskItem) {
                    toggleTaskCompletion(taskItem.dataset.id);
                    updateUI();
                }
            }
        }
    });
    
    // Thème
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// ================================================
// 12. MESSAGES ET NOTIFICATIONS (optionnel)
// ================================================

/**
 * Affiche une notification temporaire
 * @param {string} message - Message à afficher
 * @param {string} type - Type de notification ('success', 'error', 'warning')
 */
function showNotification(message, type = 'success') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 15px 25px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        font-family: 'Inter', sans-serif;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
    `;
    
    // Couleurs selon le type
    const colors = {
        success: '#2ecc71',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// ================================================
// 13. INITIALISATION
// ================================================

/**
 * Initialise l'application
 */
function init() {
    console.log('🚀 Application To-Do List v1.0.0');
    console.log('📋 Initialisation en cours...');
    
    // Charger les données
    state.tasks = getTasks();
    state.currentFilter = 'all';
    state.searchQuery = '';
    
    // Initialiser le thème
    initTheme();
    
    // Configurer les événements
    setupEventListeners();
    
    // Mettre à jour l'interface
    updateUI();
    
    // Réinitialiser le formulaire
    resetForm();
    
    console.log(`✅ ${state.tasks.length} tâches chargées`);
    console.log('🎯 Application prête !');
}

// ================================================
// 14. EXPORT (si utilisé comme module)
// ================================================

// Si le fichier est utilisé comme module ES6
// export { init, getTasks, createTask, updateTask, deleteTask };

// ================================================
// 15. DÉMARRAGE
// ================================================

// Démarrer l'application une fois le DOM chargé
document.addEventListener('DOMContentLoaded', init);

// ================================================
// 16. CONSOLE UTILITIES (pour le débogage)
// ================================================

// Exposer certaines fonctions pour le débogage dans la console
window.__todo = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    state: () => ({ ...state })
};

console.log('💡 Pour le débogage, utilisez window.__todo');