const pool = require('../config');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

exports.getUsers = async () => {
    const result = await pool.query('SELECT id, username, email, created_at FROM users');
    return result.rows;
};

//N'est pas utiliser
exports.addUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
        [username, email, hashedPassword]
    );
    return result.rows[0];
};

exports.modifyUser = async (id, updates) => {
    const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = [...Object.values(updates), id];
    const result = await pool.query(
        `UPDATE users SET ${fields} WHERE id = $${values.length} RETURNING id, username, email, created_at`,
        values
    );
    return result.rows[0];
};

exports.removeUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
};


// Récupérer un utilisateur par email
exports.getUserByEmail = async (email) => {
    console.log(email);
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}
/*
// Insérer un nouvel utilisateur (inscription)
exports.createUser = async (infos) => {
    const userPath = `USERDATA/thisuser`;
    const result = await pool.query(/*
        'INSERT INTO users (username, email, password_hash, theme, language, created_at, last_login) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *',
        [username, email, passwordHash, "light_c", "fr"]
        endcomment/
        'INSERT INTO users (username, email, password_hash, theme, "language", created_at, last_login, path) VALUES($1, $2, $3, $4, $5, NOW(), NOW());',
        [infos.username, infos.email, infos.passwordHash, 'light', 'en', userPath]
    );
    return result.rows[0];
}*/
// Insérer un nouvel utilisateur (inscription)
exports.createUser = async (infos) => {
    // Générer le chemin utilisateur basé sur un hash des informations uniques
    const userHash = crypto.createHash('md5').update(infos.username + infos.email).digest('hex');
    const userPath = `public/USERDATA/${userHash}`;
    const userPathDB= `${userHash}`;
    // Créer le dossier utilisateur si nécessaire
    if (!fs.existsSync(userPath)) {
        fs.mkdirSync(userPath, { recursive: true }); // Crée le dossier, y compris les parents manquants
    }

    // Insérer les informations dans la base de données
    const result = await pool.query(
        'INSERT INTO users (username, email, password_hash, theme, "language", created_at, last_login, path) VALUES($1, $2, $3, $4, $5, NOW(), NOW(), $6) RETURNING *',
        [infos.username, infos.email, infos.passwordHash, 'light', 'en', userPathDB]
    );

    return result.rows[0];
};

// Récupérer un utilisateur par email
exports.getUserById = async (userId) => {
    console.log(userId);
    const result = await pool.query('SELECT * FROM users WHERE id = $1', 
    [userId]);
    return result.rows[0];
};