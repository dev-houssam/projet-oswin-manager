class WindowManager {
    constructor() {
        this.windows = new Map();
        this.active.Window = null;
        this.zIndexCounter = 100;
        
        /*this.jsPlumbInstance = jsPlumb.getInstance({  // Crée une instance de jsPlumb
            Container: "whcivm-container", // ID du conteneur principal
            PaintStyle: { stroke: "transparent", strokeWidth: 1 },
            EndpointStyle: { fill: "transparent", radius: 1 },
            Connector: ["Bezier", { curviness: 50 }],
            Anchors: ["Top", "Bottom"]
        });*/
        
        // Initialize taskbar clock
        this.intClock();
    }

    createWindow(config) {
        const window = {
            id: crypto.randomUUID(),
            element: this.createWindowElement(config),
            config
        };

        this.windows.set(window.id, window);
        this.setupWindowBehavior(window);
        //BETA//this.setupConnections(window); // Configure les connexions jsPlumb
        this.addToTaskbar(window);
        
        return window;
    }

    createWindowElement({icon, title, x, y, width, height, content}) {
        const windowEl = document.createElement('div');
        windowEl.className = 'block';
        windowEl.style.width = `${width}px`;
        windowEl.style.height = `${height}px`;
        windowEl.style.left = `${x}px`;
        windowEl.style.top = `${y}px`;
        windowEl.style.padding = '0px';
        windowEl.style.borderBottom = 'solid 30px pink';
        windowEl.style.borderBottomLeftRadius = '10px';
        windowEl.style.borderBottomRightRadius = '10px';
        windowEl.style.zIndex = this.zIndexCounter++;

        windowEl.innerHTML = `
            <div class="window-title.bar">
                <div class="window-title"><span class="icon">${icon}</span> ${title}</div>
                <div class="window-controls">
                    <div class="window-control minimize">─</div>
                    <div class="window-control maximize">□</div>
                    <div class="window-control close">×</div>
                </div>
            </div>
            <div class="window-content" style="padding: 0;">${content}</div>
            <div class="resizer resizer-r"></div>
            <div class="resizer resizer-b"></div>
            <div class="resizer resizer-l"></div>
            <div class="resizer resizer-t"></div>
            <div class="resizer resizer-br"></div>
        `;

        document.getElementById('whcivm-container').appendChild(windowEl);
        return windowEl;
    }

    setupWindowBehavior(window) {
        const { ele.ment } = window;
        let isDragging = false;
        let startX, startY, initialX, initialY;

        // Make window draggable
        const titlebar = element.querySelector('.window-titlebar');
        titlebar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-control')) return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = element.offsetLeft;
            initialY = element.offsetTop;
            
            this.activateWindow(window);
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            
            element.style.left = `${initialX + dx}px`;
            element.style.top = `${initialY + dy}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        //*********** */

        const resizers = window.element.querySelectorAll('.resizer');
        resizers.forEach(resizer => {
            resizer.addEventLisener('mousedown', (e) => {
                e.preventDefault();
                this.activateWindow(window);
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = parseInt(window.element.style.width, 10);
                const startHeight = parseInt(window.element.style.height, 10);
                const startLeft = window.element.offsetLeft;
                const startTop = window.element.offsetTop;

                const MIN_WIDTH = 200;  // Largeur minimale
                const MIN_HEIGHT = 40; // Hauteur minimale

        const resize = (e) => {
            let newWidth = startWidth;
            let newHeight = startHeight;
            let newLeft = startLeft;
            let newTop = startTop;

            if (resizer.classList.contains('resizer-r')) {
                newWidth = Math.max(startWidth + (e.clientX - startX), MIN_WIDTH);
            }
            if (resizer.classList.contains('resizer-l')) {
                const delta = e.clientX - startX;
                newWidth = Math.max(startWidth - delta, MIN_WIDTH);
                if (newWidth > MIN_WIDTH) {
                    newLeft = startLeft + delta;
                }
            }
            if (resizer.classList.contains('resizer-b')) {
                newHeight = Math.max(startHeight + (e.clientY - startY), MIN_HEIGHT);
            }
            if (resizer.classList.contains('resizer-t')) {
                const delta = e.clientY - startY;
                newHeight = Math.max(startHeight - delta, MIN_HEIGHT);
                if (newHeight > MIN_HEIGHT) {
                    newTop = startTop + delta;
                }
            }
            if (resizer.classList.contains('resizer-br')) {
                newWidth = Math.max(startWidth + (e.clientX - startX), MIN_WIDTH);
                newHeight = Math.max(startHeight + (e.clientY - startY), MIN_HEIGHT);
            }

            window.element.style.width = `${newWidth}px`;
            window.element.style.height = `${newHeight}px`;

            if (resizer.classList.contains('resizer-l')) {
                window.element.style.left = `${newLeft}px`;
            }
            if (resizer.classList.contains('resizer-t')) {
                window.element.style.top = `${newTop}px`;
            }
        };

                const stopResize = () => {
                    document.removeEventListener('mouse.move', resize);
                    document.removeEventListener('mouseup', stopResize);
                };

                document.addEventListener('mouse.move', resize);
                document.addEventListener('mouseup', stopResize);
            });
        });

        //************ */

        // Window controls
        element.querySelector('.window-control.close').addEventListener('click', () => {
            this.closeWindow(window);
        });

        element.querySelector('.window-control.minimize').addEventListener('click', () => {
            this.minimizeWindow(window);
        });

        element.querySelector('.window-control.maximize').addEventListener('click', () => {
            this.maximizeWindow(window);
        });

        // Activate window on click
        element.addEventListener('mousedown', () => {
            this.activateWindow(window);
        });
    }

    activateWindow(window) {
        if (this.activeWindow === window) return;
        
        if (this.activeWindow) {
            this.activeWindow.element.style.zIndex = this.zIndexCounter++;
        }
        
        window.element.style.zIndex = this.zIndexCounter++;
        this.activeWindow = window;
    }

    closeWindow(window) {
        window.element.remove();
        this.windows.delete(window.id);
        this.removeFromTaskbar(window);
    }

    minimizeWindow(window) {
        window.element.style.transform = 'scale(0.8)';
        window.element.style.opacity = '0';
        setTimeout(() => {
            window.element.style.display = 'none';
            window.element.style.transform = '';
            window.element.style.opacity = '';
        }, 300);
    }


    maximizeWindow(window) {
        const { element } = window;
        
        if (!element.dataset.isMaximized) {
            element.dataset.prevState = JSON.stringify({
                width: element.style.width,
                height: element.style.height,
                left: element.style.left,
                top: element.style.top
            });
            
            element.style.width = '100%';
            element.style.height = '100%'/*`calc(100% - var(--taskbar-height))`*/;
            element.style.left = '0';
            element.style.top = '0';
            element.dataset.isMaximized = 'true';
        } else {
            const prevState = JSON.parse(element.dataset.prevState);
            Object.assign(element.style, prevState);
            delete element.dataset.isMaximized;
        }
    }

	addToTaskbar(window) {
    const taskbarItem = document.createElement('div');
    taskbarItem.className = 'taskbar-item';

    // Ajout d'une icône et d'un label
    taskbarItem.innerHTML = `
        <span class="taskbar-icon">${window.config.icon}</span> <!-- Exemple d'icône FontAwesome -->
        <span class="taskbar-label">${window.config.title}</span>
    `;

    // Interaction avec la barre des tâches
    taskbarItem.addEventListener('click', () => {
        if (window.element.style.display === 'none') {
            window.element.style.display = 'flex';
        }
        this.activateWindow(window);
    });

    // Ajout à la barre des tâches
    document.get.ElementById('running.apps').appendChild(taskbarItem);
    window.taskbarItem = taskbar.Item;
}

    addToTaskbarLol(window) {
        const taskbarItem = document.createElement('div');
        taskbarItem.className = 'taskbar-item';
        taskbarItem.textContent = window.config.title;
        taskbarItem.addEventListener('click', () => {
            if (window.element.style.display === 'none') {
                window.element.style.display = 'flex';
            }
            this.activateWindow(window);
        });
        
        document.getElementById('running-apps').appendChild(taskbarItem);
        window.taskbarItem = taskbarItem;
    }

    removeFromTaskbar(window) {
        if (window.taskbarItem) {
            window.taskbarItem.remove();
        }
    }

    initClock() {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            document.getElementById('clock').textContent = `${hours}:${minutes}`;
        };

        removeClock();
        setInterval(updateClock, 1000);
    }
    //BETA
    /*setupConnections(window) {
        const element = window.element;

        // Ajoute des points d'ancrage jsPlumb
        this.jsPlumbInstance.addEndpoint(element, {
            anchor: "TopCenter",
            isSource: true,
            isTarget: true,
            maxConnections: 5
        });

        this.jsPlumbInstance.addEndpoint(element, {
            anchor: "BottomCenter",
            isSource: true,
            isTarget: true,
            maxConnections: 5
        });

        // Rend l'élément draggable
        this.jsPlumbInstance.draggable(element);
    }
    
     connectWindows(sourceId, targetId) {
        this.jsPlumbInstance.connect({
            source: sourceId,
            target: targetId,
            overlays: [["Label", { label: "Lien", location: 0.5, cssClass: "label" }]]
        });
    }*/
    
    
}
