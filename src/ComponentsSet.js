function creationComponent(thumbnails, dec_x, y){
	
	thumbnails.forEach((thumb, index) => {
            vm.createBlock(thumb.x+dec_x, thumb.y+y, thumb.w, thumb.h, 'rgb(200, 200, 200)', 10, false, {
                init: (monObjet) => {
                    //alert(`${thumb.label} sélectionnée !`);
                    monObjet.play();
                    //monObjet.style("color:white");
                    monObjet.innerHTML(thumb.label);
                }
            }).element.dispatchEvent(new Event('init'));
        });

}

function creationSetComponents(thumbnails, nb){
    var sp = 0;
    for(let i=0; i <nb; i++){
       creationComponent(thumbnails, 180, sp);
       sp += 90;
    }
}

const thumbnails = [
    { x: 620, y: 100, w: 120, h: 80, label: 'Vidéo 1' },
    { x: 750, y: 100, w: 120, h: 80, label: 'Vidéo 2' },
    { x: 880, y: 100, w: 120, h: 80, label: 'Vidéo 3' },


];
//creationSetComponents(thumbnails, 6);