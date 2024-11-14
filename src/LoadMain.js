////////////////////////////////////////////////////



function loadMain(vm, programs){
    /***************************/ 
    function subMain1(vm, programListe){
        const programs = programListe.prog;
        const liste = programListe.liste;

        /**Debut de ForEa**/
        liste.forEach(programName => {
            /*contexte forea prog*/
            console.log(programs.obtenirProgramme(programName));
            vm.createBlockTest(programs.obtenirProgramme(programName), {
                init: (monObjet) => {
                    //monObjet.innerHTML(programs.obtenirProgramme("Bureau").codeSource);
                    console.log(programs.obtenirProgramme(programName).codeSource);
                    //alert("Fenêtre Explorateur de fichiers ouverte !");
                }
            }).element.dispatchEvent(new Event('init'));

            /*fin contexte forEe*/
        });
            /*Fin de ForEa*/
        //Chargement des icones : 

        // Icônes sur le bureau
        const icons = [
            { x: 20, y: 20, label: 'Ordinateur', execute : null },
            { x: 200, y: 100, label: 'Documents', execute : null},
            { x: 20, y: 180, label: 'Corbeille' , execute : null },
            { x: 20, y: 260, label: 'Explorateur', execute : "Nautilus" }
        ];
    //var block = null;
        icons.forEach((icon, index) => {
            console.log(icon.execute);
            const block = vm.createBlock(icon.x, icon.y, 80, 80, 'rgba(255, 255, 255, 0.8)', 10, true, {
                init: (monObjet) => {
                    console.log(icon);
                    monObjet.innerHTML("<img src=\"./raw.jpeg\" style='width:"+79+"px;height:79px;' />");
                }, 
                
            }).element.dispatchEvent(new Event('init'));
            
        });



    }

    var i = 0;

    const idInt = setInterval(()=>{
        document.title = "Chargement à "+ i*10+"%";
        i += 1;
    }, 1, vm, programs);

    setTimeout(
        function(vm, programs){
            clearInterval(idInt); 
            subMain1(vm, programs);
            //alert(vm.htmlId);
		//Horloge et synchronisation
		getFormattedTime(); 
		document.getElementById(vm.htmlId).onmousemove = ()=>{ getFormattedTime(); };
		document.getElementById(vm.htmlId).onmouseout = ()=>{ getFormattedTime(); };
		//alert(document.getElementById("justePourLheure").innerHTML);
            document.title = "Chargement à "+ 100+"%";
        }, 10, vm, programs);

	
    /**************************/
}

function resetStack(nbElement) {
    // Assurez-vous que newLayer est un nombre
    for(let i = 0; i < 6; i++){
    	const el = document.getElementById("element_"+i);
    	el.style.zIndex=4;
    }
}

/*
function changeStack(newLayer = 5) {
    // Assurez-vous que newLayer est un nombre
    const layer = Number(100);
    alert(newLayer);
    alert(layer);
    // Vérifiez si la conversion a réussi
    if (!isNaN(layer)) {
	this.layer = layer;
	this.element.style.zIndex = layer;
    } else {
	console.warn('Invalid zIndex value provided');
    }
}*/

function main(vm, programs){
    loadMain(vm, programs);
}
