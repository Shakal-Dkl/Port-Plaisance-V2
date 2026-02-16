# Guide d'installation - Port de Plaisance

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- Node.js (version 14 ou supérieure)
- MongoDB (version 4.4 ou supérieure)
- npm (généralement installé avec Node.js)

## Installation étape par étape

### 1. Vérifier que MongoDB est installé et démarré

```powershell
# Vérifier si MongoDB est installé
mongod --version

# Démarrer MongoDB (si ce n'est pas déjà fait)
# Option 1: Via les services Windows
net start MongoDB

# Option 2: Manuellement
mongod
```

### 2. Installer les dépendances du projet

Ouvrez PowerShell dans le dossier du projet et exécutez :

```powershell
npm install
```

### 3. Vérifier le fichier .env

Le fichier `.env` a déjà été créé avec les configurations par défaut :
- Port: 3000
- MongoDB URI: mongodb://localhost:27017/port_plaisance
- Session secret: à changer en production

### 4. Initialiser la base de données

Cette commande va créer un utilisateur administrateur et quelques données de test :

```powershell
npm run seed
```

Vous verrez un message de confirmation avec les identifiants :
- Email: admin@port.com
- Mot de passe: admin123

### 5. Démarrer l'application

```powershell
# Mode développement (avec rechargement automatique)
npm run dev

# OU mode production
npm start
```

### 6. Accéder à l'application

Ouvrez votre navigateur et accédez à :
```
http://localhost:3000
```

### 7. Se connecter

Utilisez les identifiants créés lors du seed :
- Email: `admin@port.com`
- Mot de passe: `admin123`

⚠️ **Important** : Changez ce mot de passe dès votre première connexion en production !

## Structure de la base de données

L'application utilise MongoDB avec 3 collections principales :

### Users (Utilisateurs)
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashé),
  createdAt: Date,
  updatedAt: Date
}
```

### Catways (Pontons)
```javascript
{
  catwayNumber: String (unique),
  type: String (enum: 'long', 'short'),
  catwayState: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Reservations
```javascript
{
  catwayNumber: String,
  clientName: String,
  boatName: String,
  checkIn: Date,
  checkOut: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Commandes disponibles

```powershell
# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start

# Réinitialiser la base de données
npm run seed
```

## Accès aux fonctionnalités

Une fois connecté, vous aurez accès à :

1. **Tableau de bord** (`/dashboard`)
   - Statistiques
   - Formulaires de gestion (utilisateurs, catways, réservations)

2. **Liste des catways** (`/dashboard/catways`)
   - Affichage de tous les catways
   - Détails de chaque catway

3. **Liste des réservations** (`/dashboard/reservations`)
   - Affichage de toutes les réservations
   - Détails de chaque réservation

4. **Documentation API** (`/dashboard/documentation`)
   - Documentation complète de l'API REST

## API REST

Tous les endpoints API sont disponibles sous `/api/` :
- `/api/users` - Gestion des utilisateurs
- `/api/catways` - Gestion des catways
- `/api/reservations` - Gestion des réservations

Consultez `/dashboard/documentation` pour la documentation complète.

## Dépannage

### MongoDB ne démarre pas
```powershell
# Vérifier le statut du service
Get-Service MongoDB

# Démarrer le service
Start-Service MongoDB
```

### Port 3000 déjà utilisé
Modifiez le port dans le fichier `.env` :
```
PORT=3001
```

### Erreur de connexion à MongoDB
Vérifiez que MongoDB est bien démarré et que l'URI dans `.env` est correct :
```
MONGODB_URI=mongodb://localhost:27017/port_plaisance
```

## Déploiement

Pour déployer sur Heroku ou un autre service :

1. Assurez-vous d'avoir un service MongoDB cloud (MongoDB Atlas recommandé)
2. Mettez à jour `MONGODB_URI` avec votre URI de connexion
3. Changez `SESSION_SECRET` avec une valeur aléatoire sécurisée
4. Définissez `NODE_ENV=production`

## Support

Pour toute question ou problème, consultez la documentation dans l'application ou vérifiez les logs de l'application.
