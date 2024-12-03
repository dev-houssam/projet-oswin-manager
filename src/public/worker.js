// Worker : Simule un chargement progressif
// Processus en arriere plan !
self.onmessage = (event) => {
    const { action } = event.data;

    if (action === "start") {
        let progression = 0;

        const interval = setInterval(() => {
            progression += 10;

            // Envoie la progression au fil principal
            self.postMessage({ type: "progress", value: progression });

            if (progression === 100) {
                clearInterval(interval);
                self.postMessage({ type: "complete", message: "Chargement terminé !" });
            }
        }, 200); // Simule une progression toutes les 500ms
    }
};
