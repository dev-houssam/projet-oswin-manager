    const ProgramBureau = `

    <div style="background: url(./raw.jpeg) #ffffff; margin-left: 0px; position: absolute; z-index: 50; width: 90%; background-repeat: no-repeat; background-size: 100% 900pt   ;; border-bottom: 1px solid #d7d7d7; padding: 0px; cursor: default; user-select: none;" id="bureau_container">
        <div >
           <img src="./raw.jpe6g" style='width:100%; user-select: none;' /> 
        </div>

    </div>
 
    `;
  

    
    

export_program
	.ajouterProgramme(
	"Bureau", 
	{ x: 0, y: 0, width : window.innerWidth+250, height: window.innerHeight, color: 'rgba(240, 24, 240, 1)', layer: 4, moveable: false, }, 
	ProgramBureau);

    console.log("ouaiiiiiisss Bureau");

//export_program.ajouterProgramme("Bureau", { x: 10, y: 10, width: 100, height: 100, color: "rgba(200, 200, 200, 0.8)", moveable: , layer: 1 }, "<h1>Contenu Bureau</h1>");

