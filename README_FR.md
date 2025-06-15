# 📝 Application Todo Simple - Démo

Une application web de liste de tâches simple construite avec Node.js, Express et Redis, conteneurisée avec Docker.

![Interface principale](screenshots/main-interface.png)
*Interface principale de l'application todo*

## 🌟 Fonctionnalités

- ✅ Ajouter de nouvelles tâches
- ❌ Supprimer des tâches
- 📊 Compteur de tâches
- 🔄 Vérification de santé en temps réel
- 🐳 Entièrement conteneurisé avec Docker
- 📱 Design responsive

![Fonctionnalités](screenshots/features-demo.png)
*Démonstration des fonctionnalités principales*

## 🏗️ Architecture

Cette démo se compose de **2 services Docker** :

### 1. Application Web (service `web`)
- Serveur Node.js/Express
- Sert les fichiers statiques et les endpoints API
- Se connecte à Redis pour le stockage des données

### 2. Base de données Redis (service `redis`)
- Image Redis 7 Alpine
- Stockage de données persistant
- Utilisé comme base de données backend

![Architecture](screenshots/architecture-diagram.png)
*Diagramme d'architecture des services*

## 🚀 Démarrage Rapide

### Prérequis
- Docker
- Docker Compose

### Lancement de l'Application

1. **Cloner et naviguer vers le projet :**
   ```bash
   cd /chemin/vers/ce/repertoire
   ```

2. **Démarrer l'application :**
   ```bash
   docker-compose up --build
   ```
   
   ![Docker Build](screenshots/docker-build.png)
   *Processus de construction Docker*

3. **Accéder à l'application :**
   - Ouvrez votre navigateur et allez à : http://localhost:3000
   - L'application devrait fonctionner avec une belle interface todo

   ![Application Running](screenshots/app-running.png)
   *Application en cours d'exécution*

4. **Arrêter l'application :**
   ```bash
   docker-compose down
   ```

### Mode Développement

Si vous voulez exécuter en mode développement avec rechargement automatique :

1. **Installer les dépendances localement :**
   ```bash
   npm install
   ```

2. **Démarrer Redis uniquement :**
   ```bash
   docker-compose up redis -d
   ```

3. **Exécuter l'app en mode développement :**
   ```bash
   npm run dev
   ```

![Dev Mode](screenshots/dev-mode.png)
*Mode développement avec rechargement automatique*

## 📱 Captures d'Écran

### Interface Desktop
![Desktop Interface](screenshots/desktop-view.png)
*Vue desktop de l'application*

### Interface Mobile
![Mobile Interface](screenshots/mobile-view.png)
*Vue mobile responsive*

### Ajout de Tâches
![Adding Todo](screenshots/adding-todo.png)
*Processus d'ajout d'une nouvelle tâche*

### Suppression de Tâches
![Deleting Todo](screenshots/deleting-todo.png)
*Suppression d'une tâche existante*

### Statut de Santé
![Health Status](screenshots/health-status.png)
*Indicateur de statut de connexion Redis*

## 🔌 Endpoints API

- `GET /` - Servir l'application principale
- `GET /api/todos` - Obtenir toutes les tâches
- `POST /api/todos` - Ajouter une nouvelle tâche
- `DELETE /api/todos/:id` - Supprimer une tâche
- `GET /health` - Endpoint de vérification de santé

![API Testing](screenshots/api-testing.png)
*Test des endpoints API avec curl ou Postman*

## 📁 Structure du Projet

```
.
├── app.js              # Serveur Express
├── package.json        # Dépendances Node.js
├── Dockerfile          # Définition du conteneur web
├── docker-compose.yml  # Orchestration multi-services
├── .dockerignore       # Fichier d'ignore Docker
├── public/
│   ├── index.html      # HTML frontend
│   ├── style.css       # Styles CSS
│   └── script.js       # JavaScript frontend
├── README.md           # Documentation anglaise
└── README_FR.md        # Cette documentation
```

## 🛠️ Technologies Utilisées

- **Backend :** Node.js, Express.js
- **Base de données :** Redis
- **Frontend :** HTML, CSS, JavaScript vanilla
- **Conteneurisation :** Docker, Docker Compose

![Tech Stack](screenshots/tech-stack.png)
*Stack technologique utilisé*

## 🐳 Commandes Docker Utiles

### Voir les logs
```bash
# Logs de tous les services
docker-compose logs

# Logs du service web uniquement
docker-compose logs web

# Logs en temps réel
docker-compose logs -f
```

### Gestion des conteneurs
```bash
# Lister les conteneurs en cours
docker-compose ps

# Redémarrer un service
docker-compose restart web

# Reconstruire sans cache
docker-compose build --no-cache
```

![Docker Commands](screenshots/docker-commands.png)
*Exemples de commandes Docker en action*

## 🔧 Dépannage

### Problèmes Courants

1. **Port 3000 déjà utilisé**
   ```bash
   # Changer le port dans docker-compose.yml
   ports:
     - "3001:3000"  # Utiliser le port 3001 à la place
   ```

2. **Redis ne se connecte pas**
   ```bash
   # Vérifier les logs Redis
   docker-compose logs redis
   ```

3. **Problèmes de permissions**
   ```bash
   # Nettoyer et reconstruire
   docker-compose down -v
   docker-compose up --build
   ```

![Troubleshooting](screenshots/troubleshooting.png)
*Interface de dépannage et logs*

## 📝 Notes Importantes

- Les données Redis sont persistées en utilisant les volumes Docker
- L'application inclut des vérifications de santé pour la connectivité Redis
- Les deux services sont connectés via un réseau Docker personnalisé
- L'application web se reconnecte automatiquement à Redis si la connexion est perdue

## 🤝 Contribution

Pour contribuer à ce projet :

1. Forkez le repository
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

*Créé comme application de démonstration pour illustrer l'utilisation de Docker Compose avec plusieurs services.*
