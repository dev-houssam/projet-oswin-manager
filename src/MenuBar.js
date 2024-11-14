const ProgramMenuBar = `

<!-- Avant
<div class="taskbar">
  <div class="start-button">
    <span class="icon">&#xf07b;</span>
  </div>
  <div class="apps">
    <div class="app">
      <span class="icon">&#xf07b;</span>
    </div>
    <div class="app">
      <span class="icon">&#xf0e0;</span>
    </div>
    <div class="app">
      <span class="icon">&#xf07b;</span>
    </div>
  </div>
  <div class="system-tray">
    <span class="icon">&#xf242;</span>
    <span class="icon">&#xf1eb;</span>
    <span class="time">12:34</span>
  </div>
</div>
Après
-->
<div class="taskbar">
  <div class="start-button">
    <span class="icon">&#xf015;</span> <!-- Maison (Accueil) -->
  </div>
  <div class="apps">
    <div class="app">
      <span class="icon">&#xf0c0;</span> <!-- Utilisateurs -->
    </div>
    <div class="app">
      <span class="icon">&#xf0e0;</span> <!-- Enveloppe (Messages) -->
    </div>
    <div class="app">
      <span class="icon">&#xf121;</span> <!-- Code -->
    </div>
    <div class="app">
      <span class="icon">&#xf1c1;</span> <!-- Fichier audio -->
    </div>
    <div class="app">
      <span class="icon">&#xf1c5;</span> <!-- Fichier PDF -->
    </div>
    <div class="app">
      <span class="icon">&#xf108;</span> <!-- Ordinateur -->
    </div>
    <div class="app">
      <span class="icon">&#xf118;</span> <!-- Graphique -->
    </div>
    <div class="app">
      <span class="icon">&#xf233;</span> <!-- Disque dur -->
    </div>
    <div class="app">
      <span class="icon">&#xf0a0;</span> <!-- Flèche vers la droite -->
    </div>
  </div>
  <div class="system-tray">
    <span class="icon">&#xf028;</span> <!-- Volume -->
    <span class="icon">&#xf017;</span> <!-- Horloge -->
    <span class="icon">&#xf1eb;</span> <!-- Signal Wi-Fi -->
    <span class="icon">&#xf013;</span> <!-- Paramètres -->
    <span class="icon">&#xf240;</span> <!-- Batterie -->
    <span class="time" id="justePourLheure">12:34</span>
  </div>
</div>




<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

no_body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.taskbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to bottom, #2c3e50, #34495e);
  height: 50px;
  width: 78%;
  border-right: solid 	20px black;
  padding: 0 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.start-button, .app, .system-tray {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  margin: 0 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.start-button {
  background-color: #3498db;
}

.start-button:hover {
  background-color: #2980b9;
}

.apps {
  display: flex;
}

.app {
  background-color: rgba(255,255,255,0.1);
}

.app:hover {
  background-color: rgba(255,255,255,0.2);
}

.system-tray {
  display: flex;
  justify-content: flex-end;
  width: auto;
}

.icon {
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  font-size: 18px;
  color: white;
}

.time {
  color: white;
  margin-left: 10px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
}

.app:hover .icon {
  animation: bounce 0.5s;
}


</style>
`;

function getFormattedTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById("justePourLheure").innerHTML = `${hours}:${minutes}`;
}


export_program
	.ajouterProgramme(
	"MenuBar", 
	{ x: window.innerWidth/4, y: window.innerHeight - 50, width : (window.innerWidth)-90, height: 90, 
	color: 'rgba(30, 10, 215, 0.9)', layer: 40, moveable: false, }, 
	ProgramMenuBar
);
console.log("ouaiiiiiisss");




