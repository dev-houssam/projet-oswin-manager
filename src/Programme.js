class Programme {
    constructor() {
        this.configurations = new Map(); // Stocke les configurations (clé="nomduprogramme", valeur="desConfigurations")
        this.codeSources = new Map();    // Stocke les codes sources (clé="nomduprogramme", valeur="CodeSources")
    }

    // Ajoute une configuration et un code source pour un programme donné
    ajouterProgramme(nom, configuration , codeSource) {
        this.configurations.set(nom, configuration);
        this.codeSources.set(nom, codeSource);
    }

    // Récupère la configuration d'un programme par nom
    obtenirConfiguration(nom) {
        return this.configurations.get(nom) || "Configuration non trouvée";
    }

    // Récupère le code source d'un programme par nom
    obtenirCodeSource(nom) {
        return this.codeSources.get(nom) || "Code source non trouvé";
    }
    //Donne le programme entier et ses configurations
    obtenirProgramme(nom) {
        const configuration = this.configurations.get(nom);
        const codeSource = this.codeSources.get(nom);
        
        if (configuration && codeSource) {
            return { configuration, codeSource };
        } else {
            return "Programme non trouvé";
        }
    }
    
}
const export_program = new Programme();
