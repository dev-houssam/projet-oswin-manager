class WindowManager {
    constructor() {
        this.windows = new Map();
        this.activeWindow = null;
        this.zIndexCounter = 100;
        
        // Initialize taskbar clock
        this.initClock();
    }

    createWindow(config) {
        const window = {
            id: crypto.randomUUID(),
            element: this.createWindowElement(config),
            config
        };

        this.windows.set(window.id, window);
        this.setupWindowBehavior(window);
        this.addToTaskbar(window);
        
        return window;
    }

    createWindowElement({ title, x, y, width, height, content }) {
        const windowEl = document.createElement('div');
        windowEl.className = 'block';
        windowEl.style.width = `${width}px`;
        windowEl.style.height = `${height}px`;
        windowEl.style.left = `${x}px`;
        windowEl.style.top = `${y}px`;
        windowEl.style.padding = '0px';
        windowEl.style.zIndex = this.zIndexCounter++;

        windowEl.innerHTML = `
            <div class="window-titlebar">
                <div class="window-title">${title}</div>
                <div class="window-controls">
                    <div class="window-control minimize">─</div>
                    <div class="window-control maximize">□</div>
                    <div class="window-control close">×</div>
                </div>
            </div>
            <div class="window-content" style="padding: 0;">${content}</div>
        `;

        document.getElementById('whcivm-container').appendChild(windowEl);
        return windowEl;
    }

    setupWindowBehavior(window) {
        const { element } = window;
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
        <span class="taskbar-icon">&#xf121;</span> <!-- Exemple d'icône FontAwesome -->
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
    document.getElementById('running-apps').appendChild(taskbarItem);
    window.taskbarItem = taskbarItem;
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

        updateClock();
        setInterval(updateClock, 1000);
    }
}