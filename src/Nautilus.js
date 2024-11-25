const ProgramNautilus = `
<body style="margin: 0; padding: 0; font-family: Ubuntu, Arial, sans-serif; display: flex; flex-direction: column; height: auto 100%; background-color: #f6f6f6;">
    <div style="background-color: #3c3b37; color: white; padding: 5px 10px;">
        <span style="font-size: 14px;">Fichiers</span>
    </div>
    <div style="display: flex; background-color: #e4e4e4; border-bottom: 1px solid #d7d7d7; padding: 5px;">
        <div style="margin-right: 10px; cursor: pointer; padding: 5px 10px; background-color: #ffffff; border-radius: 5px 5px 0 0;">
            <span style="font-size: 12px;">Documents</span>
        </div>
        <div style="margin-right: 10px; cursor: pointer; padding: 5px 10px;">
            <span style="font-size: 12px;">Téléchargements</span>
        </div>
        <div style="cursor: pointer; padding: 5px 10px;">
            <span style="font-size: 12px;">+</span>
        </div>
    </div>
    <div style="display: flex; flex-grow: 1;">
        <div style="width: 200px; background-color: #f3f3f3; border-right: 1px solid #d7d7d7; padding: 10px;">
            <div style="margin-bottom: 10px; cursor: pointer;">
                <span style="font-size: 14px;">Dossiers</span>
            </div>
            <div style="margin-bottom: 5px; cursor: pointer;">
                <span style="font-size: 12px;">Documents</span>
            </div>
            <div style="margin-bottom: 5px; cursor: pointer;">
                <span style="font-size: 12px;">Téléchargements</span>
            </div>
            <div style="margin-bottom: 5px; cursor: pointer;">
                <span style="font-size: 12px;">Images</span>
            </div>
            <div style="margin-bottom: 5px; cursor: pointer;">
                <span style="font-size: 12px;">Musique</span>
            </div>
            <div style="cursor: pointer;">
                <span style="font-size: 12px;">Vidéos</span>
            </div>
        </div>
        <div style="flex-grow: 1; padding: 10px; display: flex; flex-wrap: wrap; align-content: flex-start;">
            <div style="width: 100px; height: 100px; margin: 5px; text-align: center; cursor: pointer;">
                <div style="width: 64px; height: 64px; margin: 0 auto; background-color: #e4e4e4; border-radius: 5px;"></div>
                <span style="font-size: 12px;">Fichier 1</span>
            </div>
            <div style="width: 100px; height: 100px; margin: 5px; text-align: center; cursor: pointer;">
                <div style="width: 64px; height: 64px; margin: 0 auto; background-color: #e4e4e4; border-radius: 5px;"></div>
                <span style="font-size: 12px;">Fichier 2</span>
            </div>
            <div style="width: 100px; height: 100px; margin: 5px; text-align: center; cursor: pointer;">
                <div style="width: 64px; height: 64px; margin: 0 auto; background-color: #e4e4e4; border-radius: 5px;"></div>
                <span style="font-size: 12px;">Fichier 3</span>
            </div>
        </div>
    </div>
    <div style="position:absolute;bottom:0;width: 100%;background-color: #f3f3f3; border-top: 1px solid #d7d7d7; padding: 0px 0px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px;">3 éléments</span>
        <span style="font-size: 12px;">Espace libre : 50 Go</span>
    </div>

`;



exports
	.ajouterProgramme(
	"Nautilus", 
	{ x: 200, y: 100, width : 500, height: 350, 
	color: 'rgba(240, 240, 240, 1)', layer: 4, moveable: true, focusable:true}, 
	ProgramNautilus
);
