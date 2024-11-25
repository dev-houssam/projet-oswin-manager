function openWindow(title, content, x_=500, y_ = 300,  w_=400, h_=300) {
    windowManager.createWindow({
        title: title,
        x: Math.random() * x_,
        y: Math.random() * y_,
        width: w_,
        height: h_,
        content: content
    });
}


function updateAppList() {
    const appList = document.getElementById('installed-apps');
    appList.innerHTML = '';  // Réinitialiser la liste des applications

    installedApps.forEach(app => {
        const appItem = document.createElement('div');
        appItem.className = 'start-menu-app menu-item app';
        appItem.innerHTML = `
            <span class="icon">${app.icon}</span>
            <span class="start-menu-app-name">${app.name}</span>
        `;
        appItem.onclick = () => {
            const newId = Thread.getNextId();
            const mutedString = app.content.replace(`thread_`, `${newId}-`);
            openWindow(app.name, mutedString, app.x, app.y, app.width, app.height); // Ouvrir la fenêtre avec le contenu spécifique
            toggleStartMenu(); // Fermer le menu

            //On attend hoooooooooo..... et on execute yessss
            //On peut meme lancer une notification pour ce lancement impecable
            //Apres 100 ms de stresse binaire !
            setTimeout((app, newId)=>{
                //Execution :: 0
                env.getFunctionNames(app.name).forEach(funcName => {
                    //console.log(app.name + " = "+ funcName);
                    console.log(funcName);
                    console.log(env.executeUtility(app.name, funcName, newId));
                    //if(funcName !== '')
                    // env.executeUtility(app.name, funcName);
                });
            }, 100, app, newId);
        };
        
        
        appList.appendChild(appItem);
    });
}

function openInstallAppForm() {
    const appName = prompt('Nom de l\'application :');
    const appIcon = prompt('Icône (HTML ou code Unicode) :', '&#xf016;');

    const type= prompt('URL : 1, CONTENT:2, FILE: 3');
    
    if (appName && appIcon) {
        //lol
        switch (type) {
            case '1':
                const appURL = prompt('URL de l\'application :');
                const content = `
                    <iframe src="${appURL}" style="width: 100%; height: 100%;"></iframe>
                `;
                installedApps.push({ name: appName, icon: appIcon, content: content});
                updateAppList();
                break;
            case '2':
                const appContent = prompt('Content de l\'application :');
                installedApps.push({ name: appName, icon: appIcon, content: appContent});
                updateAppList();
                break;
            case '3':
                alert('Forbiden !');
                break;
            default:
                alert('Forbiden !');
                break;
        }


    }
}
/*  
<iframe width="560" height="315" src="https://www.youtube.com/embed/yaNOSjm6TDs?si=xQZc-sQ7FRi4-ExR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
*/

function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    if (menu.style.display === 'block') updateAppList();
}


// Fonction pour créer une fenêtre avec des points de connexion (gauche et droite)
function createWindowWithConnections(config) {
    const window = windowManager.createWindow(config);

    // Ajouter les cercles de connexion (gauche et droite)
    const leftConnector = document.createElement('div');
    leftConnector.className = 'connector connector-left';
    leftConnector.addEventListener('click', () => startConnection(window)); // Gérer la connexion
    window.element.appendChild(leftConnector);

    const rightConnector = document.createElement('div');
    rightConnector.className = 'connector connector-right';
    rightConnector.addEventListener('click', () => startConnection(window)); // Gérer la connexion
    window.element.appendChild(rightConnector);
}



// Fonction pour commencer une connexion entre deux fenêtres
function startConnection(fromWindow) {
    let startPoint = null;
    let endPoint = null;

    // L'utilisateur clique sur une fenêtre, et on attend le second clic pour définir la connexion
    fromWindow.element.addEventListener('click', (event) => {
        if (startPoint === null) {
            startPoint = event.target;
        } else {
            endPoint = event.target;
            drawConnection(startPoint, endPoint);
            startPoint = null; // Réinitialiser la connexion
        }
    });
}

// Dessiner la flèche entre les deux fenêtres
function drawConnection(startPoint, endPoint) {
    const arrow = document.createElement('div');
    arrow.className = 'arrow';
    const fromRect = startPoint.getBoundingClientRect();
    const toRect = endPoint.getBoundingClientRect();

    // Calculer la position et la taille de la flèche
    const deltaX = toRect.left - fromRect.left;
    const deltaY = toRect.top - fromRect.top;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    arrow.style.height = `${distance}px`;
    arrow.style.top = `${fromRect.top + fromRect.height / 2}px`;
    arrow.style.left = `${fromRect.left + fromRect.width / 2}px`;
    arrow.style.transform = `rotate(${Math.atan2(deltaY, deltaX) * (180 / Math.PI)}deg)`;

    // Ajouter la flèche à l'écran
    document.getElementById('whcivm-container').appendChild(arrow);
}