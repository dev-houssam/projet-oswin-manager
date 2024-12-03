# Utiliser l'image de base officielle de Nginx
FROM nginx:alpine

# Copier le contenu du répertoire frontend dans le répertoire où Nginx s'attend à trouver les fichiers
COPY frontend/ /usr/share/nginx/html/

# Exposer le port 80, utilisé par Nginx
EXPOSE 80

# Démarrer Nginx en mode non-daemon (en arrière-plan)
CMD ["nginx", "-g", "daemon off;"]
