const express = require('express');
const router = express.Router();
const {
    viewUsers,
    viewApps,
    viewLogs,
    viewUserApps,
    viewOpenWindows,
    viewUserDataStructure,
    removeUser
} = require('../controllers/adminController');

// Récupérer les utilisateurs
router.get('/users', viewUsers);

// Récupérer les applications
router.get('/apps', viewApps);

// Récupérer les logs
router.get('/logs', viewLogs);

// Récupérer les installations d'applications par utilisateur
router.get('/user_installed_apps', viewUserApps);

// Récupérer les fenêtres ouvertes
router.get('/open_windows', viewOpenWindows);

// Récupérer la structure du dossier USERDATA
router.get('/userdata/justview', viewUserDataStructure);

// Supprimer un utilisateur
router.delete('/users/delete', removeUser);

module.exports = router;
