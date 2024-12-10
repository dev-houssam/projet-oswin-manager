function estValideToken(token){
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiration = payload.exp * 1000;
        const maintenant = Date.now();
        return maintenant < expiration;
    } catch (e) {
        console.error("Erreur lors du decodage du token !" + e.message);
        return false;
    }
}


async function chargerProgrammes() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Vous devez être connecté pour charger les programmes.');
        window.location = "/connect.html";
        return;
    }

    if(!estValideToken(token)){
        alert("Votre Session a expiré ! Veuillez vous reconnecter !");
        localStorage.clear();
        window.location = "/connect.html";
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/apps/progs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors du chargement des programmes.');
        }

        const data = await response.json();
        //alert(data);
        return data;
        //console.log('Programmes chargés:', data);
    } catch (error) {
        console.error(error.message);
        //alert(error.message);
    }
}




// Fonction pour charger un script dynamiquement
function chargerScript(src, callback, ext = ".js") {
    const script = document.createElement('script');
    script.src = src + ext;
    script.async = true;  // Charge le script de façon asynchrone
    script.onload = callback; // Callback une fois le script chargé
    document.head.appendChild(script); // Ajoute le script dans le <head>
}

// Tableau des scripts à charger dynamiquement
const scripts = [];


chargerProgrammes()
    .then(data => {
        console.log("Les programmes récupérés :", data);
        // Vous pouvez maintenant traiter les données
        const userPath = localStorage.getItem('userPath');
        data.apps.forEach(program => {
            console.log(`Nom : ${program.name}, Chemin : ${program.path}`);

            switch(program.type){
                case 'user':
                    chargerScript(`USERDATA/${userPath}/${program.name}`, () => {
                        //Recensement de programmes
                        scripts.push(program.name);
                        //Fabrication des exports
                        exports.ajouterProgramme(
                            program.name, 
                            { x: 800, y: 100, width : 500, height: 350, 
                            color: 'rgba(20, 20, 20, 1)', layer: 4, moveable: true,  focusable:true,
                            icon: program.icon!==undefined ? program.icon : "-"}, 
                            program.content
                        );
                        
                        console.log(`${program.name} chargé avec succès.`);
                    });
                    break;
                case 'system':
                    chargerScript(`USERDATA/systemdata/${program.name}`, () => {
                        //Recensement de programmes
                        scripts.push(program.name);
                        //Fabrication des exports
                        exports.ajouterProgramme(
                            program.name, 
                            { x: 800, y: 100, width : 500, height: 350, 
                            color: 'rgba(20, 20, 20, 1)', layer: 4, moveable: true,  focusable:true,
                            icon: program.icon!==undefined ? program.icon : "-"}, 
                            program.content
                        );
                        
                        console.log(`${program.name} chargé avec succès.`);
                    });
                    break;
                default:
                    console.log(program);
            }
            
            env.addUtility(program.name, '', (arg=0)=>{});

        });
        console.log("HOP ! TERMINÉ !");
    })
    .catch(error => {
        console.error("Erreur lors du chargement des programmes :", error);
    }).finally(() => {



    });



// Exporte l'instance du programme
const programs = {liste: scripts, prog: exports};