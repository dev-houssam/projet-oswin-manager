const express = require('express');
const { getAllUsers, createUser, 
        updateUser, deleteUser, 
        login, register, 
        getProfile } = require('../controllers/userController');
const router = express.Router();

const {authenticate} = require('../middlewares/authenticate');
// GET ROUTES
router.get('/', getAllUsers);

// Route pour la connexion
router.get('/profil', authenticate, getProfile);


router.post('/', createUser);

// Route pour la connexion
router.post('/login', login);



// Route pour l'inscription
router.post('/register', register);


router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
