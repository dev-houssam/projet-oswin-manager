    // Constantes
    const PROTOCOLE = 'http';
    const DOMAIN    = PROTOCOLE + '://localhost:3000';

    // Minimal Framework Winmanager : todo
    class WinmanagerBox(){
        constructor() {
            this.box = 'Box|';
            
        }
        alert(val){
            return this.box+val;
        }
    }


    // Sélection des éléments
    const appsList = document.getElementById('apps-list');
    const logsList = document.getElementById('logs-list');
    const userAppsList = document.getElementById('user-apps-list');
    const openWindowsList = document.getElementById('open-windows-list');
    const userdataStructure = document.getElementById('userdata-structure');
    const createUserForm = document.getElementById('create-user-form');
    // Fonction pour récupérer et afficher les utilisateurs
    const userList = document.getElementById('user-list');
    const deleteSelectedBtn = document.getElementById('delete-selected-btn');

    // Fonction pour récupérer et afficher les utilisateurs avec cases à cocher
    async function loadUsers() {
        const response = await fetch(DOMAIN+'/_a/administrateur/users');
        const data = await response.json();

        userList.innerHTML = data.map((user)=>{
            if(user.username==='System') return ''; 
            return `
            <li>
                <input type="checkbox" class="user-checkbox" value="${user.id}">
                ${user.username}
            </li>
        `}).join('');
    }

    // Fonction pour récupérer et afficher les applications
    async function loadApps() {
        const response = await fetch(DOMAIN+'/_a/administrateur/apps');
        const data = await response.json();
        const appsList = document.getElementById('apps-list');
        appsList.innerHTML = ''; // Réinitialiser la liste des applications
    
        data.forEach(app => {
            const appItem = document.createElement('li');
            appItem.classList.add('app-bubble');
            appItem.innerHTML = `
                <i src="${app.icon}" alt="${app.name}"></i>
                <div>${app.name}</div>
            `;
            
            // Ajouter l'élément à la liste
            appsList.appendChild(appItem);
    
            // Animation avec Anime.js
            anime({
                targets: appItem,
                scale: [
                    0.5 + Math.random() * (1.5 - 0.5),  // Valeur aléatoire entre 0.5 et 1.5
                    0.5 + Math.random() * (1.5 - 0.5)   // Valeur aléatoire entre 0.5 et 1.5
                ],   // Animation pour faire apparaître la bulle
                opacity: [0, 1],  // Rendre la bulle visible
                duration: 5000,  // Durée de l'animation
                easing: 'easeOutElastic(1, .9)', // Easing pour un effet plus fluide
                delay: anime.stagger(100, {start: 100}),  // Délai pour chaque bulle (délai progressif)
                loop: true,  // Animation en boucle infinie
                direction: 'alternate',  // Alterner entre les états (agrandir et rétrécir)
            });
            
        });
    }
    

    // Fonction pour récupérer et afficher les logs
    async function loadLogs() {
        const response = await fetch(DOMAIN+'/_a/administrateur/logs');
        const data = await response.json();
        logsList.innerHTML = data.map(log => `<li>${log.message}</li>`).join('');
    }

    // Fonction pour récupérer et afficher les applications installées
    async function loadUserApps() {
        const response = await fetch(DOMAIN+'/_a/administrateur/user_installed_apps');
        const data = await response.json();
        userAppsList.innerHTML = data.map(app => `<li>${app.app_id}</li>`).join('');
    }

    // Fonction pour récupérer et afficher les fenêtres ouvertes
    async function loadOpenWindows() {
        const response = await fetch(DOMAIN+'/_a/administrateur/open_windows');
        const data = await response.json();
        openWindowsList.innerHTML = data.map(window => `<li>${window.title}</li>`).join('');
    }

    // Fonction pour récupérer et afficher la structure de USERDATA
    async function loadUserDataStructure() {
        const response = await fetch(DOMAIN+'/_a/administrateur/userdata/justview');
        const data = await response.json();
        userdataStructure.textContent = JSON.stringify(data, null, 2);
    }

    async function deleteUser(userId) {
        try {
            //const confirmDeletion = confirm("Voulez-vous vraiment supprimer cet utilisateur ?");
            //if (!confirmDeletion) {
            //    return; // Annuler la suppression si l'utilisateur ne confirme pas
            //}
    
            const response = await fetch(`${DOMAINE}/_a/administrateur/users/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: userId })
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'utilisateur.');
            }
    
            //WinmanagerBox.alert('Utilisateur supprimé avec succès.');
            // Rafraîchir la liste des utilisateurs
            loadUsers();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error.message);
            alert('Impossible de supprimer l\'utilisateur. Veuillez réessayer.');
        }
    }
    

    // Appeler les fonctions au chargement de la page
    loadUsers();
    loadApps();
    loadLogs();
    loadUserApps();
    loadOpenWindows();
    loadUserDataStructure();


    // Sélectionner tous les boutons d'onglets et les sections de contenu
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Ajouter un gestionnaire d'événement à chaque bouton d'onglet
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Supprimer la classe active de tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Ajouter la classe active au bouton cliqué et à sa section correspondante
            button.classList.add('active');
            const targetContent = document.getElementById(button.dataset.tab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Activer le premier onglet par défaut
    tabButtons[0].classList.add('active');
    tabContents[0].classList.add('active');


    async function createUser(username, email, password) {
        try {
            const response = await fetch(DOMAIN+'/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de la création de l\'utilisateur.');
            }
    
            alert('Utilisateur créé avec succès.');
            loadUsers(); // Rafraîchir la liste des utilisateurs
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error.message);
            alert('Impossible de créer l\'utilisateur. Veuillez réessayer.');
        }
    }

    // Gestionnaire d'événement pour la création d'utilisateur
createUserForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await createUser(username, email, password);

    // Réinitialiser le formulaire
    createUserForm.reset();
});



// Fonction pour supprimer plusieurs utilisateurs sélectionnés
async function deleteSelectedUsers() {
    const checkboxes = document.querySelectorAll('.user-checkbox:checked'); // Sélectionner les cases cochées
    const userIds = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value)); // Récupérer les ID

    if (userIds.length === 0) {
        alert('Veuillez sélectionner au moins un utilisateur à supprimer.');
        return;
    }

    const confirmDeletion = confirm(`Voulez-vous vraiment supprimer ${userIds.length} utilisateur(s) ?`);
    if (!confirmDeletion) return;

    for (const userId of userIds) {
        await deleteUser(userId);
    }

    alert('Utilisateur(s) supprimé(s) avec succès.');
    loadUsers(); // Rafraîchir la liste
}

// Gestionnaire d'événement pour le bouton de suppression multiple
deleteSelectedBtn.addEventListener('click', deleteSelectedUsers);


