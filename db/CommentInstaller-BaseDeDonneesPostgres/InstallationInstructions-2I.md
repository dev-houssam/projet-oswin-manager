# Auteur
Houssam BACAR
--
Ce fichier est un script bash qui configure et initialise une base de données PostgreSQL dans un conteneur Docker. Bref !
--
Voici une explication détaillée de son contenu:

## Étapes principales

1. Téléchargement de l'image PostgreSQL
2. Lancement du conteneur PostgreSQL
3. Création d'un dossier dans le conteneur
4. Copie d'un fichier SQL dans le conteneur
5. Connexion à la base de données
6. Instructions pour créer et initialiser la base de données
7. Configuration du serveur Node.js

## Détails des commandes

```bash
# Téléchargement de l'image PostgreSQL
docker pull postgres

# Lancement du conteneur PostgreSQL
docker run --name my-postgres -e POSTGRES_PASSWORD=SimpleASWater456 -p 5432:5432 -d postgres
```
Cette commande crée un conteneur nommé "my-postgres", définit le mot de passe, mappe le port 5432 et exécute le conteneur en arrière-plan[1][2].

```bash
# Création d'un dossier dans le conteneur
docker exec -it my-postgres bash
mkdir /home/winmanager
exit
```
Ces commandes ouvrent un shell interactif dans le conteneur, créent un dossier "winmanager", puis quittent le shell[2].

```bash
# Copie d'un fichier SQL dans le conteneur
docker cp ./dbwin.sql my-postgres:/home/winmanager/dbwin.sql
```
Cette commande copie un fichier SQL local dans le dossier créé précédemment dans le conteneur[2].

```bash
# Connexion à la base de données
docker exec -it my-postgres psql -U postgres
```
Cette commande ouvre une session interactive PostgreSQL dans le conteneur[2][4].

## Instructions pour l'initialisation de la base de données

Le script inclut des commentaires pour créer et initialiser la base de données "winmanager":

```sql
CREATE DATABASE winmanager;
\c winmanager
\i /home/winmanager/dbwin.sql
```

## Configuration du serveur Node.js

Le script se termine par des instructions pour configurer un serveur Node.js:

```bash
npm init -y
npm install
npm start
```

Enfin, il mentionne que l'interface d'administration est accessible à l'adresse `localhost:3000/_a`.
