const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUsers, addUser, modifyUser, removeUser, getUserByEmail, createUser, getUserById } = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};


exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        const newUser = await addUser(username, email, password);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedUser = await modifyUser(id, updates);
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await removeUser(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

/*
// Contrôleur pour la connexion
exports.login =  async (req, res) => {
    const { email, password } = req.body;
    console.log("::");
    console.log(email);
    console.log(password);
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé.' });
        }

        console.log(user);

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
        }

        const token = jwt.sign({ userId: user.id }, 'WINMANAGER-456', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error.message);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}*/

// Contrôleur pour la connexion
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("::");
    console.log(email);
    console.log(password);
    try {
        // Récupérer l'utilisateur par email
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé.' });
        }

        console.log(user);

        // Comparer le mot de passe avec le hash
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
        }

        // Créer le token JWT
        const token = jwt.sign({ userId: user.id }, 'WINMANAGER-456', { expiresIn: '1h' });

        // Récupérer le chemin de l'utilisateur
        const userPath = user.path || '/default/path'; // Assurez-vous que la colonne 'path' existe dans la table 'users'

        // Répondre avec le token et le chemin
        res.json({
            token,
            path: userPath
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error.message);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}


// Contrôleur pour l'inscription
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await createUser({ username, email, passwordHash });

        res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error.message);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}

exports.getProfile = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const user = await getUserById(13);
        if(!user){
            return res.status(404).json({
                message : 'Utilisateur non trouvé'
            });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message : 'Erreur Serveur'
        });
    }
};