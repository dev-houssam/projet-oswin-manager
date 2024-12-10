const pool = require('../config');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const fswp = require('fs');
const path = require('path');
const random = require('random');

exports.getAllApps = async () => {
  const result = await pool.query('SELECT * FROM apps');
  return result.rows;
};

exports.getAppById = async (id) => {
  const result = await pool.query('SELECT * FROM apps WHERE id = $1', [id]);
  return result.rows[0];
};

exports.getAppsForUserId = async (userId) => {
  const oldQuery = `
  SELECT apps.*
  FROM apps
  JOIN user_installed_apps ON user_installed_apps.app_id = apps.id
  WHERE user_installed_apps.user_id = $1;
  
  `;

  const query = `
  SELECT apps.*
  FROM apps
  JOIN user_installed_apps ON user_installed_apps.app_id = apps.id
  WHERE user_installed_apps.user_id = $1

UNION

SELECT apps.*
  FROM apps
  JOIN user_installed_apps ON user_installed_apps.app_id = apps.id
  WHERE user_installed_apps.user_id = 24;

  
  `;

  //console.log("="+userId);
  const result = await pool.query(query, [userId]);
  return result.rows; // Retourne toutes les applications liées à l'utilisateur
};


exports.getAppsMetaForUserId = async (userId) => {
  const query = `
  SELECT apps.id, apps.name, apps.icon, apps.description, apps.category, apps.type, apps.created_at 
  FROM apps
  JOIN user_installed_apps ON user_installed_apps.app_id = apps.id
  WHERE user_installed_apps.user_id = $1;
  `;

  //console.log("="+userId);
  const result = await pool.query(query, [userId]);
  return result.rows; // Retourne toutes les applications liées à l'utilisateur
};

/*
exports.createApp = async (userId, nom, programContent, jsProgram, icon, description, category ) => {
  const result = await pool.query(
    'INSERT INTO apps (name, icon, content, description, category, developer, version, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
    [nom,  icon, programContent, description, category, 'developer', '1.0.0' ]
  );

  // jsProgram : sauver dans un fichier
    //Creation du fichier de script s'il n'existe pas

  return result.rows[0];
};*/




exports.createApp = async (userId, nom, programContent, jsProgram, icon, description, category) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // 1. Récupérer le chemin utilisateur
    const userPathResult = await client.query('SELECT path FROM users WHERE id = $1', [userId]);
    if (userPathResult.rowCount === 0) {
      throw new Error("Utilisateur non trouvé.");
    }
    const userPath = userPathResult.rows[0].path;
    
    // Construire le chemin utilisateur complet
    const fullUserPath = path.join(__dirname, "../../public/USERDATA", userPath);

    // Vérifier si le répertoire utilisateur existe, sinon le créer
    try {
      await fs.access(fullUserPath); // Vérifie l'existence
    } catch {
      await fs.mkdir(fullUserPath, { recursive: true }); // Crée le dossier si nécessaire
    }

    // 2. Capitaliser la première lettre du nom
    const capitalizedNom = nom.charAt(0).toUpperCase() + nom.slice(1);

    // 3. Créer le fichier JavaScript
    const fileName = `${capitalizedNom}.js`;
    const filePath = path.join(fullUserPath, fileName);
    const nomprog = `prg_${capitalizedNom[random.int(0, capitalizedNom.length - 1)]}_func_${random.int(100, 999)}`;

    const jsContent = `
{
  function ${nomprog}(numThreads = 0) {
      ${jsProgram}
      console.log('PID ' + numThreads);
  }
  env.addUtility('${capitalizedNom}', '${nomprog}', ${nomprog});
}`;

    await fs.writeFile(filePath, jsContent);

    // 4. Insérer l'application dans la table `apps`
    const appResult = await client.query(
      'INSERT INTO apps (name, icon, content, description, category, developer, version, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), \'user\') RETURNING *',
      [capitalizedNom, icon, programContent, description, category, 'developer', '1.0.0']
    );

    const newApp = appResult.rows[0];

    // 5. Créer le lien entre l'utilisateur et l'application
    await client.query(
      'INSERT INTO user_installed_apps (user_id, app_id) VALUES ($1, $2)',
      [userId, newApp.id]
    );

    await client.query('COMMIT');
    return newApp;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};


/*
exports.createApp = async (userId, nom, programContent, jsProgram, icon, description, category) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Capitaliser la première lettre du nom
    const capitalizedNom = nom.charAt(0).toUpperCase() + nom.slice(1);
    
    // Créer le fichier JavaScript
    const fileName = `${capitalizedNom}.js`;
    const filePath = path.join(__dirname, "../../public/", fileName); // Assurez-vous que ce chemin existe
    const nomprog = 
    `prg_${capitalizedNom[random.int(0, capitalizedNom.length - 1)]}_func_${random.int(100, 999)}`;
    await fs.writeFile(filePath, 
      `
      {
        function ${nomprog}(numThreads=0) {
          ${jsProgram}
          console.log('PID ' + numThreads);
        }
        env.addUtility('${capitalizedNom}', '${nomprog}', ${nomprog});
      }
      
      `);

    // Insérer l'application
    const appResult = await client.query(
      'INSERT INTO apps (name, icon, content, description, category, developer, version, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
      [capitalizedNom, icon, programContent, description, category, 'developer', '1.0.0']
    );

    const newApp = appResult.rows[0];

    // Créer le lien entre l'utilisateur et l'application
    await client.query(
      'INSERT INTO user_installed_apps (user_id, app_id) VALUES ($1, $2)',
      [userId, newApp.id]
    );

    await client.query('COMMIT');

    return newApp;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};*/

/*
exports.createApp = async (userId, nom, programContent, jsProgram, icon, description, category) => {
  try {
    const result = await pool.query(`
      WITH new_app AS (
        INSERT INTO apps (name, icon, content, description, category, developer, version, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING *
      ), new_user_app AS (
        INSERT INTO user_apps (user_id, app_id)
        SELECT $8, id FROM new_app
        RETURNING *
      )
      SELECT * FROM new_app;
    `, [nom, icon, programContent, description, category, 'developer', '1.0.0', userId]);

    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la création de l\'application:', error);
    throw error;
  }
};*/





exports.updateApp = async (id, name, version) => {
  const result = await pool.query(
    'UPDATE apps SET name = $1, version = $2 WHERE id = $3 RETURNING *',
    [name, version, id]
  );
  return result.rows[0];
};

/*
// Fonction pour supprimer une application
exports.deleteApp = async (appName) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');  // Démarre une transaction

    // Supprimer les entrées associées dans user_installed_apps
    await client.query('DELETE FROM user_installed_apps WHERE name = $1', [appName]);

    // Supprimer l'application de la table apps
    const result = await client.query('DELETE FROM apps WHERE name = $1 RETURNING *', [appName]);

    //Supprimer aussi le fichier js associé


    if (result.rows.length === 0) {
      throw new Error('Application non trouvée');
    }

    await client.query('COMMIT');  // Confirmer la transaction
    return result.rows[0];  // Retourner l'application supprimée

  } catch (error) {
    await client.query('ROLLBACK');  // Annuler en cas d'erreur
    throw error;
  } finally {
    client.release();
  }
};*/

// Fonction pour supprimer une application
exports.deleteApp = async (appName) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');  // Démarre une transaction

    // 1. Récupérer l'ID de l'application et le chemin de l'utilisateur
    const appResult = await client.query(
      'SELECT a.id, u.path FROM apps a ' +
      'JOIN user_installed_apps ua ON ua.app_id = a.id ' +
      'JOIN users u ON u.id = ua.user_id ' +
      'WHERE a.name = $1',
      [appName]
    );
    console.log(appName);
    

    if (appResult.rows.length === 0) {
      throw new Error('Application non trouvée');
    }

    const { id, path: userPath } = appResult.rows[0];

    // 2. Supprimer les entrées associées dans user_installed_apps
    await client.query('DELETE FROM user_installed_apps WHERE app_id = $1', [id]);

    // 3. Supprimer l'application de la table apps
    await client.query('DELETE FROM apps WHERE id = $1', [id]);

    // 4. Supprimer le fichier JavaScript associé
    const filePath = path.join(process.cwd(), `public/USERDATA/${userPath}/${appName}.js`);    console.log(filePath);
    if (fswp.existsSync(filePath)) {
      fswp.unlinkSync(filePath);  // Supprimer le fichier
      console.log(`Le fichier ${appName}.js a été supprimé`);
    } else {
      console.log(`Le fichier ${appName}.js n'existe pas`);
    }

    await client.query('COMMIT');  // Confirmer la transaction

    return { message: 'Application supprimée avec succès' };

  } catch (error) {
    await client.query('ROLLBACK');  // Annuler en cas d'erreur
    throw error;
  } finally {
    client.release();
  }
};



// Ajouter d'autres fonctions (comme getAllApps, getAppById, etc.) si nécessaire

