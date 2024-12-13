const pool = require('../config');
const fsp = require('fs').promises; // Pour gérer les opérations sur le système de fichiers
//const path = require('path');
const fs = require('fs');
const path = require('path');

// Récupérer tous les utilisateurs
exports.getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

// Récupérer toutes les applications
exports.getAllApps = async () => {
    const result = await pool.query('SELECT * FROM apps');
    return result.rows;
};

// Récupérer tous les logs
exports.getAllLogs = async () => {
    const result = await pool.query('SELECT * FROM logs');
    return result.rows;
};

// Récupérer toutes les installations d'applications par utilisateur
exports.getAllUserApps = async () => {
    const result = await pool.query('SELECT * FROM user_installed_apps');
    return result.rows;
};

// Récupérer toutes les fenêtres ouvertes
exports.getAllOpenWindows = async () => {
    const result = await pool.query('SELECT * FROM open_windows');
    return result.rows;
};

// Récupérer la structure arborescente du dossier USERDATA


exports.getUserDataStructure = async () => {
    const userDataDir = path.join(__dirname, '../../public/USERDATA');
    const usersDirs = fs.readdirSync(userDataDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const structure = usersDirs.map(userDir => {
        const userPath = path.join(userDataDir, userDir);
        const files = fs.readdirSync(userPath);
        return { userDir, files };
    });

    return structure;
};

exports.deleteUser = async (userId) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN'); // Démarre une transaction

        // 1. Récupérer le chemin du dossier utilisateur
        const userResult = await client.query('SELECT path FROM users WHERE id = $1', [userId]);

        if (userResult.rows.length === 0) {
            throw new Error('Utilisateur non trouvé.');
        }

        const userDir = userResult.rows[0].path; // Le dossier associé à l'utilisateur
        const fullUserPath = path.join(__dirname, "../../public/USERDATA", userDir);

        // 2. Récupérer les applications de l'utilisateur
        const appResult = await client.query(`
            SELECT a.id, a.name 
            FROM apps a
            JOIN user_installed_apps uia ON uia.app_id = a.id
            WHERE uia.user_id = $1
        `, [userId]);

        const appIds = appResult.rows.map(app => app.id);
        const appNames = appResult.rows.map(app => app.name);

        // 3. Supprimer les liens dans `user_installed_apps`
        await client.query('DELETE FROM user_installed_apps WHERE user_id = $1', [userId]);

        // 4. Supprimer les applications de la table `apps`
        if (appIds.length > 0) {
            console.log(appIds);
            await client.query('DELETE FROM apps WHERE id = ANY($1::int[])', [appIds]);
        }

        // 5. Supprimer les fichiers des applications
        try {
            for (const appName of appNames) {
                const appFilePath = path.join(fullUserPath, `${appName}.js`);
                await fsp.rm(appFilePath, { force: true }); // Supprime chaque fichier d'application
            }
        } catch (err) {
            console.warn(`Erreur lors de la suppression des fichiers d'applications :`, err.message);
        }

        // 6. Supprimer l'utilisateur
        const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);

        // 7. Supprimer le dossier utilisateur
        try {
            await fsp.rm(fullUserPath, { recursive: true, force: true }); // Supprime récursivement le dossier
            console.log(`Le dossier utilisateur ${fullUserPath} a été supprimé.`);
        } catch (err) {
            console.warn(`Impossible de supprimer le dossier ${fullUserPath}:`, err.message);
        }

        await client.query('COMMIT'); // Confirme la transaction
        return result.rows[0]; // Retourne l'utilisateur supprimé
    } catch (error) {
        await client.query('ROLLBACK'); // Annule la transaction en cas d'erreur
        throw error;
    } finally {
        client.release();
    }
};
