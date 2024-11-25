
{

const ProgramT2 = `
<div id="thread_terminal" class="bg-gray-900 text-gray-300 p-4 h-full font-mono">
  <div class="output space-y-1"></div>
  <div class="flex items-center">
    <span class="text-green-500">user@system</span>
    <span class="text-blue-400">:~$</span>
    <input
      type="text"
      class="ml-2 bg-transparent outline-none flex-1" style="border: solid 0 transparent;position: relative; top: -19px; left: -3px;"
    />
  </div>
</div>
`;

function terminal2Code(numThreads=0) {
    // Sélection des éléments du DOM
    //alert(numThreads);
    const terminal = document.querySelector('#'+numThreads+'-terminal');
    const outputDiv = terminal.querySelector('.output');
    const inputElement = terminal.querySelector('input');
  
    // État initial
    let lines = ['Welcome to Terminal'];
    let currentCommand = '';
  
    // Fonction pour mettre à jour l'affichage
    function updateDisplay() {
      outputDiv.innerHTML = lines.map(line => '<div>'+line+'</div>').join('') +
        `<div>
          <span class="prompt">.......................~$</span>
          <span class="current-command">${currentCommand}</span>
        </div>`;
    }
  
    // Gestionnaire d'événements pour la saisie
    inputElement.addEventListener('input', function(e) {
      currentCommand = e.target.value;
      updateDisplay();
    });
  
    // Gestionnaire d'événements pour la touche Entrée
    inputElement.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        lines.push(`>+${currentCommand}`);
        lines.push('Command not found');
        currentCommand = '';
        e.target.value = '';
        updateDisplay();
      }
    });
  
    // Affichage initial
    updateDisplay();
  };

  
env.addUtility('Terminale', 'terminal2Code', terminal2Code);

exports
	.ajouterProgramme(
	"Terminale", 
	{ x: 200, y: 100, width : 500, height: 350, 
	color: 'rgba(240, 240, 240, 1)', layer: 4, moveable: true, focusable:true}, 
	ProgramT2
);
  }