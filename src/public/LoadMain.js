////////////////////////////////////////////////////
function endLoading(){
    
    
}


function loadMain(programs){
    /***************************/ 
    function subMain1( programListe){
        const programss = programListe.prog; // codes sources
        const liste = programListe.liste; // scripts

        /**Debut de ForEa**/
        liste.forEach(programName => {
            //Fetching configuration
            const config = programss.obtenirConfiguration(programName);
            const taskbar_apps = document.querySelector('.apps');
            const newApp = document.createElement("div");

            newApp.className = "app";
            const iconSpan = document.createElement("span");
            iconSpan.className = "icon";
            iconSpan.innerHTML = config.icon;
            newApp.appendChild(iconSpan);
            newApp.addEventListener('click', ()=> {
                const newId = Thread.getNextId();
                const content = programss.obtenirCodeSource(programName);
                const mutedString = content.replaceAll(`thread_`, `${newId}-`);
                openWindow(
                    newId,
                    config.icon,
                    programName, 
                    mutedString, 
                    config.x,
                    config.y,
                    config.width,
                    config.height);
            } );
            taskbar_apps.appendChild(newApp);
            //console.log(config);
            installedApps.push({ 
                name: programName, 
                icon: config.icon, 
                content: programss.obtenirCodeSource(programName),
                x: config.x,
                y: config.y,
                width: config.width,
                height: config.height
            });
            
            /*contexte forea prog*/
            //console.log(programs.obtenirProgramme(programName));
            
            // WARNINGS !!! WARNINGS !!! WARNINGS !!! WARNINGS !!! 
            // WARNINGS !!! WARNINGS !!! WARNINGS !!! WARNINGS !!! 
            // CHargement dans la liste des programmes à installé ICI : le dechargements
            // WARNINGS !!! WARNINGS !!! WARNINGS !!! WARNINGS !!! 
            // WARNINGS !!! WARNINGS !!! WARNINGS !!! WARNINGS !!! 

            /*fin contexte forEe*/
        });
    }

    /******************************** */
    //Defer

    function deferFunction(){
        document.title = "Chargement Terminé : Profitez de votre experience ! ";
        //Chargement des configurations initiales : s'il y en a
        subMain1(programs);
    }

    /******************************** */
    var i = 0;
/*
    const idInt = setInterval(()=>{
        document.title = "Chargement à "+ i+"%";
        i += 1;
    }, 100, programs);

    const chargement=async function(){
        setTimeout(function(programs){
            clearInterval(idInt); 
            subMain1(programs);
            deferFunction(programs);
    }, 2111, programs);
    };
    await chargement();
    */

    // Initialisation du Worker
const worker = new Worker("worker.js");

// Met à jour la barre de progression dans le DOM
function afficherProgressionDansDOM(percentage) {
    document.title = `Chargement à ${percentage}%`;
}

// Gestion des messages envoyés par le Worker
worker.onmessage = (event) => {
    const { type, value, message } = event.data;

    if (type === "progress") {
        afficherProgressionDansDOM(value);
    } else if (type === "complete") {
        deferFunction(programs);
        worker.terminate(); // Termine le Worker
    }
};

// Démarre le chargement
worker.postMessage({ action: "start" });



    /**************************/
}


function main(programs){
    loadMain(programs);
}
