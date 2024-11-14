  class WHCIVM {
            constructor(memorySize = 20) {
                this.memory = [];
                this.memorySize = memorySize;
                this.env = new Environnement();
                this.htmlId = null; 
            }

            createBlock(x, y, w, h, color = 'rgb(0, 0, 0)', layer = 0, isMovable = false, events = {}, containerId = "whcivm-container") {
                if (this.memory.length >= this.memorySize) {
                    console.log("Mémoire pleine !");
                    return;
                }
                this.htmlId = containerId;
                const bloc = new Bloc(x, y, w, h, color, layer, isMovable, events);
                this.memory.push(bloc);
                bloc.createElement(containerId);
                return bloc;
            }
            
            createBlockTest(program, events = {}, containerId = "whcivm-container") {
                if (this.memory.length >= this.memorySize) {
                    console.log("Mémoire pleine !");
                    return;
                }
                if (!program || !program.configuration) {
                    console.error("Le programme ou sa configuration est manquant");
                    return;
                }
                const x = program.configuration.x;
                const y = program.configuration.y;
                const w = program.configuration.width;
                const h = program.configuration.height;
                const color = program.configuration.color;
                const isMovable = program.configuration.moveable;
                const isFocusable = program.configuration.focusable;
                const layer = program.configuration.layer;
                const bloc = new Bloc(x, y, w, h, color, layer, isMovable, isFocusable, events);
                this.memory.push(bloc);
                bloc.createElementTest(containerId, program.codeSource);
                return bloc;
            }

            init(id) {
                const container = document.createElement("div");
                container.id = id;
                container.style.position = 'relative';
                container.style.width = '100vw';
                container.style.height = '100vh';
                document.body.appendChild(container);

                window.addEventListener('resize', () => {
                    this.adjustBlocks();
                });
            }

            adjustBlocks() {
                const ratio = this.env.getResizeRatio();
                this.memory.forEach(block => {
                    block.x *= ratio.x;
                    block.y *= ratio.y;
                    block.w *= ratio.x;
                    block.h *= ratio.y;
                    block.resizeTo(block.w, block.h);
                    block.moveTo(block.x, block.y);
                });
            }

            addNestedVM(blockId) {
                const nestedVM = new WHCIVM(10);
                nestedVM.init(blockId);

                // Ajouter un exemple de bloc dans la VM interne
                nestedVM.createBlock(10, 10, 100, 100, 'rgba(0, 255, 0, 0.5)', 1, true, {
                    click: () => alert("Bloc interne cliqué !")
                });
                return nestedVM;
            }
        }


