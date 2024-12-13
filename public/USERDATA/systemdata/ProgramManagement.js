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


		function getProgramListFromDB(programList) {
			//programList.innerHTML = 'FROM'; // Réinitialiser la liste
		
			// Ajouter un titre "FROM DB" en haut de la liste
			const title = document.createElement('h3');
			title.textContent = "FROM DB";
			programList.appendChild(title);
		
			// Récupérer les programmes depuis le backend (via API)
			const token = localStorage.getItem('authToken');
			if (!token) {
				alert('Vous devez être connecté pour charger les programmes.');
				window.location = "/connect.html";
				return;
			}
		
			fetch('http://localhost:3000/apps/metaprogs', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			.then(response => response.json())
			.then(data => {
				// Pour chaque programme récupéré, ajouter un élément de liste
				data.apps.forEach(program => {
					const li = document.createElement('li');
					//li.textContent = program.name ;
					li.innerHTML = `<i style="color: red; font-size: 24px;">X</i>
					:${program.icon}| ${program.name} | ${program.description} | ${program.category}`;
					li.title = "Ce programme n'est plus modifiable ! Veuillez créer un nouveau programme !";
					// Ajouter un bouton poubelle pour supprimer le programme
					const deleteButton = document.createElement('button');
					deleteButton.textContent = '🗑️'; // Utilisation d'un emoji de poubelle
					deleteButton.classList.add('delete-btn');
					deleteButton.style.background = 'white';
					deleteButton.style.color = 'red';
					deleteButton.title = "Attention ! L'action de suppression est irreversible !\nLa suppresion s'effectue dans la base de données "
		
					// Lorsque le bouton est cliqué, supprimer le programme
					deleteButton.addEventListener('click', async (e) => {
						e.stopPropagation(); // Empêche le clic sur le programme de déclencher le "loadProgram"
		
						// Supprimer du localStorage
						removeProgramFromLocalStorage(program);
		
						// Supprimer de la base de données via l'API
						try {
							await deleteProgramFromDatabase(program.name);
							alert(`Le programme ${program.name} a été supprimé avec succès.`);
						} catch (error) {
							console.error('Erreur lors de la suppression du programme:', error);
							alert('Erreur lors de la suppression du programme.');
						}
		
						// Rafraîchir la liste
						//updateProgramList();
					});
		
					// Ajouter le bouton poubelle à l'élément de la liste
					li.appendChild(deleteButton);
		
					// Ajouter l'élément à la liste
					programList.appendChild(li);
					
				});
			})
			.catch(error => {
				console.error('Erreur lors du chargement des programmes :', error);
				alert('Erreur lors du chargement des programmes.');
			});
		}
		
		
		
		
		
		//END FONCTION

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


			//getProgramListFromDB(programList);

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
		    /*function updateProgramList() {
			programList.innerHTML = '';
			const programs = JSON.parse(localStorage.getItem(`${numThreads}-programs`) || '[]');
			programs.forEach(program => {
			    const li = document.createElement('li');
			    li.textContent = program.name;
			    li.addEventListener('click', () => loadProgram(program));
			    programList.appendChild(li);
			});
		    }*/
			function updateProgramList() {
				getProgramListFromDB(programList);
				programList.innerHTML = '<h3>Mes programmes locaux <h3><i style="font-size: 9pt;">(Ceci ne sont plus disponibles en cas de déconnexion)<br>Un conseil: Gardez cette même/premiere instance de fenetre pour preserver votre activité</i><marquee style="font-size: 9pt;">Veuillez noter que lors du rechargement de la page vous retrouver votre première instance de fenêtre, cela permet de retrouver les programmes associés à celle-la !</marquee>'; // Réinitialiser la liste
			
				// Récupérer la liste des programmes depuis le localStorage
				const programs = JSON.parse(localStorage.getItem(`${numThreads}-programs`) || '[]');
				
				// Pour chaque programme dans la liste
				programs.forEach(program => {
					const li = document.createElement('li');
					li.textContent = program.name;
			
					// Lorsque le programme est cliqué, charger le programme
					li.addEventListener('click', () => {
						loadProgram(program);
					});
					li.title = "Cliquer pour modifier ce programme !\n Veuillez l'enregistrer sous un nouveau nom de programme !\nAttention : veuillez respecter les conventions de nommage !";

			
					// Ajouter un bouton poubelle
					const deleteButton = document.createElement('button');
					deleteButton.textContent = '🗑️'; // Utilisation d'un emoji de poubelle
					deleteButton.style.background = 'white';
					deleteButton.style.color = 'red';
		
					deleteButton.classList.add('delete-btn');
					deleteButton.title = "Attention ! L'action de suppression est irreversible !\nLa suppression s'effectue AUSSI dans la base de données "

					// Lorsque le bouton est cliqué, supprimer le programme
					deleteButton.addEventListener('click', async (e) => {
						e.stopPropagation(); // Empêche le clic sur le programme de déclencher le "loadProgram"
			
						// Supprimer du localStorage
						removeProgramFromLocalStorage(program);
			
						// Supprimer de la base de données via l'API
						try {
							await deleteProgramFromDatabase(program.name);
							alert(`Le programme ${program.name} a été supprimé avec succès.`);
						} catch (error) {
							console.error('Erreur lors de la suppression du programme:', error);
							alert('Erreur lors de la suppression du programme.');
						}
			
						// Rafraîchir la liste
						updateProgramList();
					});
			
					// Ajouter le bouton poubelle à l'élément de la liste
					li.appendChild(deleteButton);
					
					// Ajouter l'élément à la liste
					programList.appendChild(li);
					//programList.innerHTML += "FROM DB";
					const title = document.createElement('h3');
					title.textContent = "Programmes installés (Non Modifiables)";
					programList.appendChild(title);


				});
			}
			
			// Fonction pour supprimer un programme du localStorage
			function removeProgramFromLocalStorage(program) {
				const programs = JSON.parse(localStorage.getItem(`${numThreads}-programs`) || '[]');
				const updatedPrograms = programs.filter(p => p.id !== program.id); // Supprimer le programme
				localStorage.setItem(`${numThreads}-programs`, JSON.stringify(updatedPrograms)); // Sauvegarder la liste mise à jour
			}
			
			// Fonction pour supprimer un programme de la base de données
			async function deleteProgramFromDatabase(programName) {
				const token = localStorage.getItem('authToken');
				if (!token) {
					alert('Vous devez être connecté pour charger les programmes.');
					window.location = "/connect.html";
					return;
				}
				const response = await fetch('/apps/delete', {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ name: programName })
				});
			
				if (!response.ok) {
					throw new Error('La suppression du programme a échoué');
				}
			
				return response.json();
			}
			
			// Chargement d'un programme dans les éditeurs HTML et JS
			function loadProgram(program) {
				htmlCssEditor.value = program.html; // Charge le code HTML dans l'éditeur
				jsEditor.value = program.js; // Charge le code JS dans l'éditeur
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
