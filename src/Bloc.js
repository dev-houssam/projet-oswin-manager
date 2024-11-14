 class Bloc {
 	    static compteurIDBlock = 0;
            constructor(x, y, w, h, color, layer, isMovable = false, isFocusable = false, events = {}) {
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
                this.color = color;
                this.layer = layer;
                this.isMovable = isMovable;  // Définir si le bloc est déplaçable
                this.isFocusable = isFocusable;
                this.events = events;
                this.element = null;
                Bloc.compteurIDBlock += 1;
            }

            createElement(containerId, program="Non définit") {
                const container = document.getElementById(containerId);
                this.element = document.createElement("div");
                this.element.classList.add("block");
                //this.element.id= "widget";
                this.element.style.left = `${this.x}px`;
                this.element.style.top = `${this.y}px`;
                this.element.style.width = `${this.w}px`;
                this.element.style.height = `${this.h}px`;
                this.element.style.backgroundColor = this.color;
		this.element.style.zIndex = this.layer;
		this.element.style.border = "solid 2px black";
		//alert();
		this.element.addEventListener("click", function(event) {
		    alert(this.id); // ou toute autre propriété que vous voulez afficher
		    this.style.zIndex = 100;
		}.bind(this));

                this.element.onmouseout = function(){
                	this.element.style.zIndex = 10;
                };

                if (this.events) {
                    for (let event in this.events) {
                        this.element.addEventListener(event, (e) => {
                            this.events[event](this, e);
                        });
                    }
                }

                // Activer le glissement si le bloc est déplaçable
                if (this.isMovable) {
                    this.makeDraggable();
                }
		//this.element.innerHTML = program;
               // container.appendChild(this.element);
            }
            
            changeStack(newLayer = 5) {
		    // Assurez-vous que newLayer est un nombre
		    const layer = Number(100);
		    alert(newLayer);
		    alert(layer);
		    // Vérifiez si la conversion a réussi
		    if (!isNaN(layer)) {
			this.layer = layer;
			this.element.style.zIndex = layer;
		    } else {
			console.warn('Invalid zIndex value provided');
		    }
		}

            
              createElementTest(containerId, program="Rien") {
                const container = document.getElementById(containerId);
                this.element = document.createElement("div");
                this.element.classList.add("block");
                this.element.style.left = `${this.x}px`;
                this.element.style.top = `${this.y}px`;
                this.element.style.width = `${this.w}px`;
                this.element.style.height = `${this.h}px`;
                this.element.style.backgroundColor = this.color;
                this.element.style.zIndex = this.layer;
		
		this.element.style.border = "solid 2px black";
		//alert();
		//this.element.addEventListener("click", this.changeStack, 100, 100);

			if (this.isFocusable) {
			    const id = `element_${Bloc.compteurIDBlock}`;
			    this.element.id = id;

			    // Ajouter le style dans une balise style existante ou en créer une nouvelle
			    const style = document.createElement('style');
			    style.textContent = `#${id} { z-index: 3; }`;
			    document.head.appendChild(style);

			    // Utiliser addEventListener au lieu de setAttribute pour les événements
			    this.element.addEventListener('click', () => {
				document.getElementById(id).style.zIndex = '100';
			    });

			    this.element.addEventListener('mouseleave', () => {
				// Vérifier si le curseur est toujours dans la fenêtre
				if (!event.relatedTarget) {
				    document.getElementById(id).style.zIndex = '4';
				}
			    });
			}


		if(this.isFocusable){
			this.element.setAttribute("id", "element_" + Bloc.compteurIDBlock);
			this.element.innerHTML += "<style>#element_"+Bloc.compteurIDBlock+"{z-index:3;}";
			this.element.setAttribute("onclick", "document.getElementById('element_"+ Bloc.compteurIDBlock +"').style.zIndex=100;");
			this.element.setAttribute("onmouseleave", "document.getElementById('element_"+ Bloc.compteurIDBlock +"').style.zIndex=4;");
		}
		
		
		
		
                if (this.events) {
                    for (let event in this.events) {
                        this.element.addEventListener(event, (e) => {
                            this.events[event](this, e);
                        });
                    }
                }

                // Activer le glissement si le bloc est déplaçable
                if (this.isMovable) {
                    this.makeDraggable();
                }
		this.element.innerHTML = program;
                container.appendChild(this.element);
            }

            makeDraggable() {
                let offsetX, offsetY;
                const onMouseDown = (e) => {
                    offsetX = e.clientX - this.x;
                    offsetY = e.clientY - this.y;
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                };

                const onMouseMove = (e) => {
                    this.moveTo(e.clientX - offsetX, e.clientY - offsetY);
                };

                const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };

                this.element.addEventListener('mousedown', onMouseDown);
            }

            resizeTo(w, h) {
                this.w = w;
                this.h = h;
                this.element.style.width = `${this.w}px`;
                this.element.style.height = `${this.h}px`;
            }

            moveTo(x, y) {
                this.x = x;
                this.y = y;
                this.element.style.left = `${this.x}px`;
                this.element.style.top = `${this.y}px`;
            }

            innerHTML(content) {
                this.element.innerHTML = content;
            }
        }

