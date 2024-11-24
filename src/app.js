const windowManager = new WindowManager();

// Exemple d'application avec un contenu JavaScript isolé via une closure
let installedApps = [];
//Old content
/*

    { 
        name: 'Recherche', 
        icon: '&#xf07b;', 
        content: ProgramIframe
    },
    { 
        name: 'Terminale', 
        icon: '&#xf001;', 
        content: ProgramTerminal
    },
    { 
        name: 'Bloc-note', 
        icon: '&#xf0c0;', 
        content: ProgramBlocNote
     }

*/




const defaultIcons = {
    'Explorateur de fichiers': '&#xf07b;',
    'Spotify': '&#xf001;',
    'YouTube': '&#xf16a;',
    'Google Drive': '&#xf1c0;'
};

//const icon = window.config.icon || defaultIcons[window.config.title] || '&#xf016;'; // Icône générique

let connections = []; // Tableau pour suivre les connexions

// Désactiver le clic droit sur toute la page
document.body.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Empêche l'affichage du menu contextuel
});


//env.getUtility('terminalCode');
main(programs);