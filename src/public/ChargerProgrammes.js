
async function chargerProgrammes() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Vous devez être connecté pour charger les programmes.');
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
        return data;
        //console.log('Programmes chargés:', data);
    } catch (error) {
        console.error(error.message);
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
        data.apps.forEach(program => {
            console.log(`Nom : ${program.name}, Chemin : ${program.path}`);
            chargerScript(program.name, () => {
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