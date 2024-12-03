{
/***/
	function PM_editeur(numThreads=0){

		// ATTENTION DANGER : il faut pas oublier d'utiliser numthread
		// Il ne faut pas oublier de generer le bon prototype

		//Seul les id doivent etre proteger


			
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
			const programName = prompt("Nom du programme:");
			if (programName) {
			    const program = {
				name: programName,
				html: htmlCssEditor.value,
				js: jsEditor.value
			    };
			    const programs = JSON.parse(localStorage.getItem(`${numThreads}-programs`) || '[]');
			    programs.push(program);
			    localStorage.setItem(`${numThreads}-programs`, JSON.stringify(programs));
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
