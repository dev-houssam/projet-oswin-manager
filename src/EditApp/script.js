document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const htmlCssEditor = document.getElementById('htmlCssEditor');
    const jsEditor = document.getElementById('jsEditor');
    const runBtn = document.getElementById('runBtn');
    const saveBtn = document.getElementById('saveBtn');
    const outputFrame = document.getElementById('outputFrame');
    const programList = document.getElementById('programList');

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
            const programs = JSON.parse(localStorage.getItem('programs') || '[]');
            programs.push(program);
            localStorage.setItem('programs', JSON.stringify(programs));
            updateProgramList();
        }
    });

    // Mise à jour de la liste des programmes
    function updateProgramList() {
        programList.innerHTML = '';
        const programs = JSON.parse(localStorage.getItem('programs') || '[]');
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
});

