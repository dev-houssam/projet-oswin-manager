const ProgramTaskBar = `
<button class="task-menu-button" onclick="affiche_cache_menu('menuBar')">
  <span class="task-icon"></span>
  <span class="task-text">Menu</span>
</button>



<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.task-menu-button {
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #4c7cff, #3b5998);
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  height : 100%;
  
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.task-menu-button:hover {
  background: linear-gradient(to bottom, #5a87ff, #4c6cb3);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.task-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  position: relative;
}

.task-icon::before,
.task-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease;
}

.task-icon::before {
  top: 25%;
}

.task-icon::after {
  bottom: 25%;
}

.task-menu-button:hover .icon::before {
  transform: translateY(3px) rotate(45deg);
}

.task-menu-button:hover .icon::after {
  transform: translateY(-3px) rotate(-45deg);
}

.task-text {
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.task-menu-button:active {
  animation: pulse 0.3s ease-in-out;
}



</style>

<div style="display: none;" id="menuBar">

<div class="containerMenuBar">

<div class="game-menu">
  <h1 class="game-title">Menu Applications</h1>
  <nav class="menu-items">
    <div >
		<div style="display: flex; flex-direction: space-around;">
		
		<a href="#" class="menu-item">Explorateur de fichier</a>
	    <a href="#" class="menu-item">Google Drive</a>
		<a href="#" class="menu-item">WhatsApp</a>
		<a href="#" class="menu-item">Spotify</a>
		
		<a href="#" class="menu-item">Google Maps</a>
		<a href="#" class="menu-item">YouTube</a>
		<a href="#" class="menu-item">Instagram</a>
		<a href="#" class="menu-item">Duolingo</a>
		
		</div>
		<br>
		<div style="display: flex; flex-direction: space-around;">
		
		<a href="#" class="menu-item">Evernote</a>
	<a href="#" class="menu-item">Shazam</a>
	<a href="#" class="menu-item">Uber</a>
	<a href="#" class="menu-item">Netflix</a>
	<br>
	<a href="#" class="menu-item">Calm</a>
	<a href="#" class="menu-item">Dropbox</a>
	<a href="#" class="menu-item">TikTok</a>
	<a href="#" class="menu-item">Waze</a>
		
		</div>
	</div>
	
  </nav>
</div>

</div>


<style>

@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

.containerMenuBar {
  margin-top: -680px;
  margin-left: 0px;
  padding: 0;
  width: 100%;
  background: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa') no-repeat center center fixed;
  background-size: cover;
  font-family: 'Orbitron', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.game-menu {
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  text-align: center;
}

.game-title {
  color: #0ff;
  font-size: 3rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff;
  animation: glow 1.5s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff;
  }
  to {
    text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff;
  }
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 10%;
}

.menu-item {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
}

.menu-item:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.menu-item:hover:before {
  left: 100%;
}

.menu-item:hover {
  border-color: #0ff;
  box-shadow: 0 0 10px #0ff;
  transform: scale(1.05);
}

.menu-item:active {
  transform: scale(0.95);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.menu-item {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.menu-item:nth-child(1) { animation-delay: 0.1s; }
.menu-item:nth-child(2) { animation-delay: 0.2s; }
.menu-item:nth-child(3) { animation-delay: 0.3s; }
.menu-item:nth-child(4) { animation-delay: 0.4s; }
.menu-item:nth-child(5) { animation-delay: 0.5s; }


</style>

</div>


`;


function affiche_cache_menu(id){
	const elementMenuBar = document.getElementById(id);
	elementMenuBar.style.display = (elementMenuBar.style.display === "block") ? "none":"block";
}


//0, window.innerHeight - 50, window.innerWidth, 50, 'rgba(0, 0, 0, 0.7)', 15, false, 

const tb_y = window.innerHeight - 50;

const tb_w = window.innerWidth;

//0, window.innerHeight - 50, window.innerWidth, 50, 'rgba(0, 0, 0, 0.7)', 15, false, 

export_program
	.ajouterProgramme(
	"TaskBar", 
	{ x: 0, y: tb_y, width : tb_w, height: 50, 
	color: 'rgba(0, 0, 0, 0.7)', layer: 12, moveable: false, }, 
	ProgramTaskBar
);
console.log("ouaiiiiiisss");




