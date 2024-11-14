    const ProgramBlocNote = `
    
    
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; flex-direction: column; height: 100vh; background-color: #f0f0f0;">
    <div style="background-color: #ffffff; border-bottom: 1px solid #d7d7d7; padding: 5px;">
        <div >
            

            
            <style>
            
            #titlebar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: transparent;
            color: black;
            height: 32px;
            padding: 0 10px;
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
            <div id="titlebar">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApElEQVR4nGNgoBAwwhgLFy5kBuIGIP4PxA1AnAjE3FD5BqCaBUDcAMQMDNgAUNF/IL5y5QoDPnDlyhUGoPr/IHNgBsxfuPD/lStX/uMDQHX/geoboGYwMOADMHVAcxbADHi8ejXDYyD7MQ6XPAbix6tXM8AMeAA0/QEOAx4AaZABDNevX2dA9g82ANR0H4gfgwMTmyFAHMvAwMAC5d8H4v/IfFIAAKPsR7rYnNA4AAAAAElFTkSuQmCC" alt="BN " style="width: 16px; height: 16px; margin-right: 5px;">
		<div id="titlebar-title">Bloc-notes</div>
		<div id="titlebar-controls">
		    <button class="titlebar-button" id="minimize-button">&#xE921;</button>
		    <button class="titlebar-button" id="maximize-button">&#xE922;</button>
		    <button class="titlebar-button" id="close-button">X</button>
		</div>
	    </div>
        </div>
    </div>
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
    
   
    
    <textarea style="flex-grow: 1; border: none; resize: none; padding: 5px; font-family: 'Courier New', Courier, monospace; font-size: 12px; width: 500px;height:250px;"></textarea>
    <div style="background-color: #f0f0f0; border-top: 1px solid #d7d7d7; padding: 2px 5px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 11px;">Ln 1, Col 1</span>
        <span style="font-size: 11px;">100%</span>
        <span style="font-size: 11px;">Windows (CRLF)</span>
        <span style="font-size: 11px;">UTF-8</span>
    </div>
</body>    
    `;
    


export_program
	.ajouterProgramme(
	"BlocNote", 
	{ x: 200, y: 450, width : 510, height: 350, color: 'rgba(215, 255, 255, 1)', layer: 4, moveable: true, focusable:true, }, 
	ProgramBlocNote);

    
