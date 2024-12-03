require('dotenv').config();
const express = require('express');
const app = express();

// Routes
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

// Routes
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
