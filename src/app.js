require('dotenv').config();
const express = require('express');
const app = express();
//const cors = require('cors');



// Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const timeRoutes = require('./routes/timeRoutes');
const appRoutes = require('./routes/appRoutes');
const openWindowRoutes = require('./routes/openWindowRoutes');
const logRoutes = require('./routes/logRoutes');
const settingsRoutes = require('./routes/settingsRoutes');


const errorHandler = require('./middlewares/errorHandler');



// Middleware global
app.use(express.json());
app.use(express.static('public'));
/*
Cors permet de regler les probleme de routage mais malheureusement, il est inutile pour l'instant
const corsOptions = {
  origin: 'http://localhost:3000', // Autorise uniquement ce domaine
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
*/
// Routes
app.use('/_a/administrateur', adminRoutes);
app.use('/time', timeRoutes);
app.use('/users', userRoutes);
app.use('/apps', appRoutes);
app.use('/openwindows', openWindowRoutes);
app.use('/logs', logRoutes);
app.use('/settings', settingsRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue dans l\'API WinManager !');
});

// Gestion des erreurs
app.use(errorHandler);
/*  '192.168.254.200' */
const PORT = process.env.PORT || 3000;
app.listen( PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
