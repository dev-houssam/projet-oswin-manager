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
            
            //console.log(config);
            installedApps.push({ 
                name: programName, 
                icon: '&#xf07b;', 
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

    function deferFunction(programs=0){
        document.title = "Chargement Terminé : Profitez de votre experience ! ";
        //Chargement des configurations initiales : s'il y en a
        endLoading();
    }

    /******************************** */
    var i = 0;

    const idInt = setInterval(()=>{
        document.title = "Chargement à "+ i*10+"%";
        i += 1;
    }, 100, programs);

    setTimeout(function(programs){
            clearInterval(idInt); 
            subMain1(programs);
            deferFunction(programs);
    }, 1111, programs);
    /**************************/
}


function main(programs){
    loadMain(programs);
}
