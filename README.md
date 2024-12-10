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


# Fin du développement
## Version 0.0.1 (Release)
### Attention le developpement du programme a pris fin le 10 décembre 2024
Le développement de cette application IHM DeskTop était plutôt enrichissant.
Il s'agit plutôt de l'ouverture d'une porte vers l'IHACHEMISATION des bureau de 
OS vers le WEB.

Plus tard, on pourrait prévoir d'autres fonctionnalités intéressantes comme le loginage 
par IA ou la gestion de Terminal SSH...

### Perspectives futures : Regardons bien, voyons loin

#### Évolution vers le cloud
L'avenir de cette application pourrait s'orienter vers une intégration plus poussée avec les services cloud. Cela permettrait une synchronisation en temps réel des données et des paramètres utilisateur entre différents appareils, offrant ainsi une expérience utilisateur plus fluide et cohérente.

### Personnalisation avancée

Une fonctionnalité de personnalisation plus poussée pourrait être envisagée, permettant aux utilisateurs de créer leurs propres thèmes, widgets et raccourcis. Cela rendrait l'interface encore plus adaptable aux besoins spécifiques de chaque utilisateur.

### Intégration d'assistants IA

Au-delà du simple login par IA, l'intégration d'assistants IA plus sophistiqués pourrait révolutionner l'interaction avec le bureau. Ces assistants pourraient aider à la gestion des tâches, à l'organisation des fichiers, et même à l'optimisation de la productivité de l'utilisateur.

### Sécurité renforcée

Avec l'évolution constante des menaces en cybersécurité, une attention particulière pourrait être portée au renforcement de la sécurité. Cela pourrait inclure l'implémentation de nouvelles méthodes d'authentification biométrique ou l'intégration de protocoles de chiffrement avancés.

### Conclusion

Bien que le développement de cette version soit terminé, ce projet ouvre la voie à de nombreuses possibilités d'innovation dans le domaine des interfaces utilisateur. Il représente une étape importante dans l'évolution des environnements de bureau, fusionnant les fonctionnalités traditionnelles des OS avec la flexibilité et l'accessibilité du Web. 

La fin de ce développement n'est donc pas une fin en soi, mais plutôt le début d'une nouvelle ère dans la conception d'interfaces utilisateur, où les frontières entre le bureau traditionnel et le Web s'estompent progressivement.