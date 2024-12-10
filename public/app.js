const windowManager = new WindowManager();

// Exemple d'application avec un contenu JavaScript isolé via une closure
let installedApps = [];

//const icon = window.config.icon || defaultIcons[window.config.title] || '&#xf016;'; // Icône générique

let connections = []; // Tableau pour suivre les connexions

// Désactiver le clic droit sur toute la page
document.body.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Empêche l'affichage du menu contextuel
});

CheckToken();
//env.getUtility('terminalCode');
main(programs);