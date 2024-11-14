
class Environnement {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        });
    }

    getResizeRatio() {
        return {
            x: window.innerWidth / this.width,
            y: window.innerHeight / this.height
        };
    }
}

