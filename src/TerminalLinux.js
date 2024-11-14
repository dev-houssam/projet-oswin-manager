const ProgTerminalLinux = `
<div style="width: 100%; height: 100%; background-color: #2E3440; font-family: 'Menlo', 'Monaco', 'Courier New', monospace; display: flex; flex-direction: column; overflow: hidden; border-radius: 6px; box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);">
    <div style="background-color: #3B4252; padding: 8px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #BF616A; margin-right: 8px;"></div>
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #EBCB8B; margin-right: 8px;"></div>
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #A3BE8C;"></div>
        </div>
        <span style="font-size: 14px; color: #E5E9F0;">Houssam's Terminal</span>
        <div style="width: 60px;"></div>
    </div>
    <div style="flex-grow: 1; padding: 10px; overflow-y: auto; color: #E5E9F0;">
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <img src="https://archlinux.org/static/logos/archlinux-logo-dark-90dpi.ebdee92a15b3.png" alt="Arch Linux logo" style="width: 30px; height: 30px; margin-right: 10px;">
            <span style="font-weight: bold; color: #88C0D0;">Welcome to Houssam's Linux!</span>
        </div>
        <div style="margin-bottom: 5px;">
            <span style="color: #A3BE8C;">[user@archlinux</span> <span style="color: #81A1C1;">~</span><span style="color: #A3BE8C;">]$</span> neofetch
        </div>
        <pre style="color: #8FBCBB; margin: 0;">
         .
  //             \\
  //             \\
  // ^.          \\
  ////.-. //////\\
  //  (   ) _    \\
  // _.~   ~._^  \\
  //.^         ^.\\
</pre>
        <div style="margin-top: 10px;border:none;" id="zoneedit" contenteditable="true" onclick="termin()"><span style="color: #A3BE8C;user-select:none;">[user@archlinux</span> <span style="color: #81A1C1;">~</span><span style="color: #A3BE8C;">]$</span> <span class="cursor" style="background-color: #E0E950; animation: blink 10s infinite;"></span>
        </div>
        
    </div>
    <style>
    	#zoneedit {
	    width: 100%;
	    word-wrap: break-word;
	    overflow-wrap: break-word;
	    
	}

	#zoneedit:focus {
	    outline: none;
	}



        @keyframes blink {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
        .cursor {
            display: inline-block;
            width: 8px;
            height: 15px;
            vertical-align: middle;
        }
    </style>
</div>
`;

function termin(){
	const zoneEdit = document.getElementById('zoneedit');

	zoneEdit.addEventListener('input', function() {
	
	/*
	    var length = this.textContent.length;
		console.log("|"+this.textContent.substring(0, 20)+"|");
		//|| this.textContent.substring(0, 20) != "[user@archlinux ~]$ "
		if(length < 24 ){
			this.textContent += " ";
			this.innerHTML = `
			<span style="color: #A3BE8C;user-select:none;">[user@archlinux</span> <span style="color: #81A1C1;">~</span><span style="color: #A3BE8C;">]$</span> <span class="cursor" style="background-color: #E0E950; animation: blink 10s infinite;"></span>
			`;
		length = this.textContent.length;
		}*/
	    
	    // Placer le curseur à la fin
	    const selection = window.getSelection();
	    const range = document.createRange();
	    range.selectNodeContents(this);
	    range.collapse(false);
	    selection.removeAllRanges();
	    selection.addRange(range);
	    
	    // Faire défiler vers le bas si nécessaire
	    this.scrollTop = this.scrollHeight;
	});

	// Empêcher le curseur de se déplacer lors du focus
	zoneEdit.addEventListener('focus', function() {
	    const length = this.textContent.length;
	    window.getSelection().collapse(this.firstChild, length);
	});

}


export_program.ajouterProgramme(
    "TerminalLinux", 
    { x: 100, y: 100, width: 600, height: 400, 
    color: 'rgba(20, 20, 20, 1)', layer: 4, moveable: true, focusable: true}, 
    ProgTerminalLinux
);

console.log("Terminal ArchLinux lancé");

