const ProgramSpaceInvaders = `
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; background-color: #000; color: #fff; height: 100vh; display: flex; flex-direction: column; overflow: hidden;">
    <div style="background-color: #333; padding: 5px 10px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #ff5f56; margin-right: 8px;"></div>
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #ffbd2e; margin-right: 8px;"></div>
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #27c93f;"></div>
        </div>
        <span style="font-size: 14px;">Space Invaders</span>
        <div style="width: 60px;"></div>
    </div>
    <div style="flex-grow: 1; display: flex; justify-content: center; align-items: center; position: relative; background-color: #000;">
        <div style="position: absolute; top: 250px; width: 50px; height: 30px; background-color: #0f0; animation: move-cannon 4s infinite alternate;">
        </div>
                <div style="position: absolute; top: 220px; width: 5px; height: 5px; background-color: #000; animation: move-bullet 1s infinite alternate;">
                </div>
                <div style="position: absolute; top: 200px; width: 10px; height: 10px; background-color: #000; animation: move-bullet 1s infinite alternate;">
                </div>
        <div style="display: flex; justify-content: space-around; width: 100%; position: absolute; top: 50px; animation: move-invaders 2s infinite alternate;">
            <div style="width: 40px; height: 40px; background-color: #f00; clip-path: polygon(0% 20%, 20% 20%, 20% 40%, 40% 40%, 40% 60%, 20% 60%, 20% 80%, 80% 80%, 80% 60%, 60% 60%, 60% 40%, 80% 40%, 80% 20%, 100% 20%, 100% 100%, 0% 100%);"></div>
            <div style="width: 40px; height: 40px; background-color: #2f9; clip-path: polygon(0% 20%, 20% 20%, 20% 40%, 40% 40%, 40% 60%, 20% 60%, 20% 80%, 80% 80%, 80% 60%, 60% 60%, 60% 40%, 80% 40%, 80% 20%, 100% 20%, 100% 100%, 0% 100%);"></div>
            <div style="width: 40px; height: 40px; background-color: #00f; clip-path: polygon(0% 20%, 20% 20%, 20% 40%, 40% 40%, 40% 60%, 20% 60%, 20% 80%, 80% 80%, 80% 60%, 60% 60%, 60% 40%, 80% 40%, 80% 20%, 100% 20%, 100% 100%, 0% 100%);"></div>
        </div>
    </div>
    <div style="background-color: #333; padding: 10px; text-align: center; font-size: 14px;">
        Score: 0 | Vies: 3 | Niveau: 1
    </div>
    <style>
        @keyframes move-cannon {
            0% { transform: translateX(-100px); }
            100% { transform: translateX(100px); }
        }
        @keyframes move-invaders {
            0% { transform: translateX(-20px); }
            100% { transform: translateX(20px); }
        }
        @keyframes move-bullet {
            0% { transform: translateY(-70px); }
            25%{transform: translateX(0px);}
            75%{transform: translateX(5px);}
            100% { transform: translateY(30px); }
        }
    </style>



`;


/*
exports
	.ajouterProgramme(
	"SpaceInvaders", 
	{ x: 800, y: 100, width : 500, height: 350, 
	color: 'rgba(20, 20, 20, 1)', layer: 4, moveable: true,  focusable:true}, 
	ProgramSpaceInvaders
);
*/
