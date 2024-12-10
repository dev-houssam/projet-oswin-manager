//Les accolades permettent ici de séparer les contextes
{
function termin(numThread=0){
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

env.addUtility('TerminalLinux', 'termin', termin);

/*
exports
    .ajouterProgramme(
    "TerminalLinux", 
    { x: 100, y: 100, width: 600, height: 400, 
    color: 'rgba(20, 20, 20, 1)', layer: 4, moveable: true, focusable: true}, 
    ProgTerminalLinux
);*/

console.log("Terminal ArchLinux lancé");
}
