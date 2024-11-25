class Thread {
    // Attribut statique pour compter le nombre de threads créés
    static threadCounter = 0;

    // Méthode pour récupérer le prochain ID unique
    static getNextId() {
        this.threadCounter += 1; // Incrémente le compteur à chaque appel
        return `thread-${this.threadCounter}`; // Retourne l'ID unique
    }
}
Thread.getNextId();