{
/***/
	function PM_editeur(numThreads=0){

		// ATTENTION DANGER : il faut pas oublier d'utiliser numthread
		// Il ne faut pas oublier de generer le bon prototype

		//Seul les id doivent etre proteger

		async function storeInDatabase(nom, programContent, jsProgram,  icon, description, category){
			/*
			
			"SpaceInvaders", 
	{ x: 800, y: 100, width : 500, height: 350, 
	color: 'rgba(20, 20, 20, 1)', layer: 4, moveable: true,  focusable:true}, 

			*/
			try {
				const token = localStorage.getItem('authToken');
				if (!token) {
					alert('Vous devez être connecté pour charger les programmes.');
					window.location = "/connect.html";
					return;
				}
				  const response = await fetch('http://localhost:3000/apps/create', {
					  method: 'POST',
					  headers: {
							'Authorization': `Bearer ${token}`,
						  'Content-Type': 'application/json',
					  },
					  body: JSON.stringify({ nom, programContent, jsProgram, icon, description, category }),
				  });
	  
				  if (!response.ok) {
					  throw new Error('Échec de l\'enregistrement.');
				  }
	  
				  const { info } = await response.json();
				  console.log(info);
				  //alert('Connexion réussie');
			  } catch (error) {
				  console.error('Erreur lors de l\'enregistrement. :', error.message);
				  alert('Enregistrement échouée.');
			  }
		}//END FONCTION


		function replaceHTML_CSS_IDs(code, motif) {
			// Remplace les ID statiques par des ID dynamiques dans HTML et JS
			code = code.replace(/(?<=\bid=['"])([^'"]+)/g, `${motif}$1`);
			// Remplace les sélecteurs de classe statiques par des sélecteurs dynamiques dans HTML et JS
			code = code.replace(/(?<=\bclass=['"])([^'"]+)/g, `${motif}-$1`);
			// Remplace les sélecteurs ID dans CSS
			code = code.replace(/(?<=[^\w-])#([a-zA-Z][a-zA-Z0-9_-]*)/g, `#${motif}-$1`);
			// Remplace les sélecteurs de classe dans CSS
			code = code.replace(/(?<=[^\w-])\.([a-zA-Z][a-zA-Z0-9_-]*)/g, `.${motif}-$1`);
			
			return code;
		}

		function replaceJS_IDs(code, motif) {
			// Remplace les ID statiques par des ID dynamiques dans HTML et JS
			code = code.replace(/(?<=getElementById\(['"])([^'"]+)/g, `${motif}-$1`);
			code = code.replace(/(?<=querySelector\(['"])#([^'"]+)/g, `#${motif}-$1`);
			// Remplace les sélecteurs de classe statiques par des sélecteurs dynamiques dans HTML et JS
			code = code.replace(/(?<=querySelectorAll\(['"])\.([^'"]+)/g, `.${motif}-$1`);
			return code;
		  }
		  
		  // Exemple d'utilisation
		  let motifHTMLCSS = 'thread_';
		  let motifJS = `"+numThreads+"`;
		  
		  

		//END FONCTION

			
		    const tabBtns = document.querySelectorAll(`.${numThreads}-tab-btn`);
		    const tabContents = document.querySelectorAll(`.${numThreads}-tab-content`);
		    const htmlCssEditor = document.getElementById(numThreads+'-htmlCssEditor');
			//alert(numThreads);
		    const jsEditor = document.getElementById(numThreads+'-jsEditor');
		    const runBtn = document.getElementById(numThreads+'-runBtn');
			console.info("btn::"+numThreads+'-runBtn');
		    const saveBtn = document.getElementById(''+numThreads+'-saveBtn');
		    const outputFrame = document.getElementById(''+numThreads+'-outputFrame');
		    const programList = document.getElementById(''+numThreads+'-programList');

		    // Gestion des onglets
		    tabBtns.forEach(btn => {
			btn.addEventListener('click', () => {
			    tabBtns.forEach(b => b.classList.remove('active'));
			    tabContents.forEach(c => c.classList.remove('active'));
			    btn.classList.add('active');
			    document.getElementById(btn.dataset.tab).classList.add('active');
			});
		    });

		    // Exécution du code
		    runBtn.addEventListener('click', () => {
			const html = htmlCssEditor.value;
			const js = jsEditor.value;
			
			
			const combinedCode = `
			    ${html}
			    <script>${js}<\/script>
			`;
			outputFrame.srcdoc = combinedCode;
		    });

		    // Sauvegarde du programme
		    saveBtn.addEventListener('click', () => {
			const programName = prompt("Nom du programme \n(Convention exemple: AzertyBon, \npas de [0-9]+):");
			const icon = prompt("icon du programme:");
			const description = prompt("description du programme:");
			const category = prompt("Categorie du programme:");
			if (programName) {
				const htmlValue = htmlCssEditor.value;
				const jsValue   = jsEditor.value;

				let modifiedHTMLCode = replaceHTML_CSS_IDs(htmlValue, motifHTMLCSS);
				//console.log(modifiedHTMLCode);
		
				let modifiedJSCode = replaceJS_IDs(jsValue, motifJS);
				//console.log(modifiedJSCode);
				//console.log(modifiedHTMLCode);

			    const program = {
				name: programName,
				html: modifiedHTMLCode,
				js: modifiedJSCode
			    };

			    const programs = JSON.parse(localStorage.getItem(`${numThreads}-programs`) || '[]');
			    programs.push(program);
			    localStorage.setItem(`${numThreads}-programs`, JSON.stringify(programs));



				storeInDatabase(programName, modifiedHTMLCode, modifiedJSCode, icon, description, category);

			    updateProgramList();
			}
		    });

		    // Mise à jour de la liste des programmes
		    function updateProgramList() {
			programList.innerHTML = '';
			const programs = JSON.parse(localStorage.getItem(`${numThreads}-programs`) || '[]');
			programs.forEach(program => {
			    const li = document.createElement('li');
			    li.textContent = program.name;
			    li.addEventListener('click', () => loadProgram(program));
			    programList.appendChild(li);
			});
		    }

		    // Chargement d'un programme
		    function loadProgram(program) {
				htmlCssEditor.value = program.html;
				jsEditor.value = program.js;
				tabBtns[0].click(); // Basculer vers l'onglet éditeur
		    }

		    // Initialisation
		    updateProgramList();
		
			console.info("PID" + numThreads);
		

	}


	env.addUtility('ProgramManagement', 'PM_editeur', PM_editeur);


	console.log("ProgramManagement lancé : pid");

/***/
}
