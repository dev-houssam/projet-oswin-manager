// Fonction pour charger un script dynamiquement
function chargerScript(src, callback, ext = ".js") {
    const script = document.createElement('script');
    script.src = src + ext;
    script.async = true;  // Charge le script de façon asynchrone
    script.onload = callback; // Callback une fois le script chargé
    document.head.appendChild(script); // Ajoute le script dans le <head>
}

// Tableau des scripts à charger dynamiquement
const scripts = [
    "Bureau",
    "MenuBar",
    "TaskBar",
    "BlocNote",
    "Nautilus",
    "SpaceInvaders",
    "TerminalLinux"
];

// Charger chaque script de la liste
scripts.forEach(script => {
    chargerScript(script, () => {
        console.log(`${script} chargé avec succès.`);
    });
});

// Exporte l'instance du programme
const programs = {liste: scripts, prog: export_program};
console.log(programs);

/*
TABLE : scripts = [
    "Bureau", 
    "MenuBar", 
    "TaskBar",
    "BlocNote",
    "Nautilus",
    "SpaceInvaders",
    "TerminalLinux"
];

table configApp:
*/