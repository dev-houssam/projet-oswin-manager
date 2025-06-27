#!/bin/bash

# npm start &
pm2 start src/app.js --name oswin-manager

# Redémarrage entière du logiciel oswin-manager
pm2 restart oswin-manager

# Rechargement de la configuration de oswin-manager
pm2 reload oswin-manager

#Arreter temporairement l'execution de oswin-manager
pm2 stop oswin-manager

#Supprimer définitivement la gestion de oswin-manager
pm2 delete oswin-manager
