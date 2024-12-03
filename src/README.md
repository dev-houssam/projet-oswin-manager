# project

## Description
Un projet simple en architecture MVC avec Node.js, PostgreSQL et un frontend statique.

## Structure
- **src** : Contient la logique backend (routes, contrôleurs, modèles, middlewares).
- **public** : Contient les fichiers frontend statiques (HTML, CSS, JS).
- **db** : Contient les scripts SQL pour la base de données.

## Installation
1. Installez les dépendances :
    ```
    npm install
    ```

2. Configurez la base de données :
    ```
    psql -U postgres -f db/init.sql
    ```

3. Lancez l'application :
    ```
    npm run dev
    ```

## Fonctionnalités
- API RESTful avec les endpoints :
    - GET /users
    - POST /users
    - PUT /users/:id
    - DELETE /users/:id

- Frontend basique avec un formulaire CRUD pour les utilisateurs.

## Variables d'environnement
Créez un fichier `.env` avec les informations suivantes :
    ```
    DATABASE_URL=postgresql://username:password@localhost:5432/project_db
    PORT=3000
    ```
