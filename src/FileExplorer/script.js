// script.js

// Fonction pour récupérer les fichiers depuis l'API
async function fetchFiles() {
    try {
        const response = await fetch('/server/files/getfiles');
        const files = await response.json();

        displayFiles(files);
    } catch (error) {
        console.error("Erreur lors de la récupération des fichiers :", error);
    }
}

// Fonction pour afficher les fichiers
function displayFiles(files) {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';  // Réinitialise la liste

    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');

        const fileName = document.createElement('span');
        fileName.classList.add('file-name');
        fileName.textContent = file.name;

        const fileSize = document.createElement('span');
        fileSize.textContent = formatFileSize(file.size);

        fileItem.appendChild(fileName);
        fileItem.appendChild(fileSize);
        fileList.appendChild(fileItem);

        // Ajout d'un événement clic pour interagir avec le fichier
        fileItem.addEventListener('click', () => {
            alert(`File selected: ${file.name}`);
            // Vous pouvez ajouter ici une logique pour afficher le fichier ou d'autres actions
        });
    });
}

// Fonction pour formater la taille des fichiers
function formatFileSize(size) {
    if (size < 1024) return `${size} B`;
    else if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
    else if (size < 1073741824) return `${(size / 1048576).toFixed(1)} MB`;
    else return `${(size / 1073741824).toFixed(1)} GB`;
}

// Appeler la fonction fetchFiles pour récupérer et afficher les fichiers
fetchFiles();
