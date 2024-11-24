class EnvironnementFonctionnel {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.programs = new Map(); // Map pour stocker les programmes et leurs fonctions utilitaires

        // Mettre à jour les dimensions lors du redimensionnement
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        });
    }

    // Obtenir le ratio de redimensionnement
    getResizeRatio() {
        return {
            x: window.innerWidth / this.width,
            y: window.innerHeight / this.height
        };
    }

    // Ajouter une fonction utilitaire pour un programme spécifique
    addUtility(programName, functionName, func) {
        if (typeof func !== 'function') {
            throw new Error(`La valeur pour ${functionName} doit être une fonction.`);
        }

        // Si le programme n'existe pas encore, on le crée avec une nouvelle Map
        if (!this.programs.has(programName)) {
            this.programs.set(programName, new Map());
        }

        // Ajout de la fonction dans la Map du programme
        const programUtilities = this.programs.get(programName);
        programUtilities.set(functionName, func);
    }

    // Supprimer une fonction utilitaire d'un programme spécifique
    removeUtility(programName, functionName) {
        const programUtilities = this.programs.get(programName);
        if (!programUtilities) {
            console.warn(`Le programme "${programName}" n'existe pas.`);
            return;
        }

        if (!programUtilities.has(functionName)) {
            console.warn(`La fonction "${functionName}" n'existe pas dans le programme "${programName}".`);
        } else {
            programUtilities.delete(functionName);
        }
    }

    // Récupérer une fonction utilitaire par son nom et celui du programme
    getUtility(programName, functionName) {
        const programUtilities = this.programs.get(programName);
        if (!programUtilities) {
            console.warn(`Le programme "${programName}" n'existe pas.`);
            return undefined;
        }

        return programUtilities.get(functionName);
    }

    // Utiliser une fonction utilitaire par son nom et celui du programme
    executeUtility(programName, functionName, ...args) {
        const func = this.getUtility(programName, functionName);
        if (!func) {
            console.error(`La fonction utilitaire "${functionName}" n'existe pas dans le programme "${programName}".`);
            return;
        }
        //(...args)
        return {f:func, r: func(...args)};
    }

    // Récupérer les noms des fonctions d'un programme spécifique
    getFunctionNames(programName) {
        const programUtilities = this.programs.get(programName);
        if (!programUtilities) {
            console.warn(`Le programme "${programName}" n'existe pas.`);
            return [];
        }

        // Retourne un tableau avec les noms des fonctions
        return Array.from(programUtilities.keys());
    }
}

// Exemple d'utilisation de la classe avec un programme spécifique

const env = new EnvironnementFonctionnel();
/*
// Exemple de fonction à ajouter
const testFunc = () => 'test';
const anotherFunc = () => 'another test';

// Ajouter des fonctions utilitaires sous un programme spécifique
env.addUtility('nomDuProgramme', 'BlocNote', testFunc);
env.addUtility('nomDuProgramme', 'Calculatrice', anotherFunc);

// Récupérer les noms des fonctions du programme
console.log(env.getFunctionNames('nomDuProgramme'));  // Devrait afficher ['BlocNote', 'Calculatrice']


// Exemple d'utilisation de la classe avec un programme spécifique

// Exemple de fonction à ajoute
// Ajouter la fonction utilitaire sous un programme spécifique
env.addUtility('nomDuProgramme', 'BlocNote', testFunc);

// Vérifier que la fonction est bien ajoutée
console.log(env.getUtility('nomDuProgramme', 'BlocNote'));  // Devrait afficher la fonction testFunc

// Exécuter la fonction utilitaire
console.log(env.executeUtility('nomDuProgramme', 'BlocNote'));  // Devrait afficher 'test'

// Test de suppression
env.removeUtility('nomDuProgramme', 'BlocNote');

// Test de tentative d'exécution d'une fonction supprimée
env.executeUtility('nomDuProgramme', 'BlocNote');  // Devrait afficher un message d'erreur

*/

//const testFunc = () => 'test';

    // Ajouter la fonction utilitaire
//    env.addUtility('testFunc', testFunc);
    
    // Vérifier que la fonction est bien ajoutée
//    alert(env.getUtility('testFunc'));
