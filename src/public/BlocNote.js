    
        const ProgramBlocNote = `
    
    <div style="background-color: #ffffff; border-bottom: 1px solid #d7d7d7; padding: 0px;">
        <style>
            
            #titlebar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: transparent;
            color: black;
            height: 32px;
            padding: 0 0px;
            -webkit-app-region: drag;
        }
        #titlebar-title {
            font-size: 12px;
        }
        #titlebar-controls {
            display: flex;
            -webkit-app-region: no-drag;
        }
        .titlebar-button {
            width: 46px;
            height: 32px;
            border: none;
            background-color: transparent;
            color: black;
            font-size: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .titlebar-button:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        #close-button:hover {
            background-color: #e81123;
        }
    </style>
            
    
    <div style="display: flex; background-color: #f0f0f0; border-bottom: 1px solid #d7d7d7; padding: 2px 5px;">
        <div style="margin-right: 10px;">
            <span style="font-size: 12px;"><button onclick='alert("fichier::OuvrirSauver - Quitter");'>Fichier</button></span>
        </div>
        <div style="margin-right: 10px;">
            <span style="font-size: 12px;"><button>Edition</button></span>
        </div>
        <div style="margin-right: 10px;">
            <span style="font-size: 12px;"><button>Format</button></span>
        </div>
        <div>
            <span style="font-size: 12px;"><button>Affichage</button></span>
        </div>
    </div>
    
   
    
    <textarea style="flex-grow: 1; border: none; resize: none; padding: 0px; font-family: 'Courier New', Courier, monospace; font-size: 12px; width: 100%;height:100%;"></textarea>
    <div style="background-color: #f0f0f0; border-top: 1px solid #d7d7d7; padding: 2px 5px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 11px;">Ln 1, Col 1</span>
        <span style="font-size: 11px;">100%</span>
        <span style="font-size: 11px;">Windows (CRLF)</span>
        <span style="font-size: 11px;">UTF-8</span>
    </div>
  
    `;

/*
exports
	.ajouterProgramme(
	"BlocNote", 
	{ x: 200, y: 100, width : 500, height: 350, 
	color: 'rgba(240, 240, 240, 1)', layer: 4, moveable: true, focusable:true}, 
	ProgramBlocNote
);
*/