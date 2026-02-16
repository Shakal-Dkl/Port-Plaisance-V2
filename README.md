# Port Plaisance - Application de gestion

Application web complète pour la gestion d'un port de plaisance avec gestion des catways (pontons) et des réservations.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express](https://img.shields.io/badge/Express-v4-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.4+-green)

## Fonctionnalités

✅ **Authentification sécurisée**
- Système de connexion/déconnexion
- Mots de passe hashés avec bcrypt
- Sessions sécurisées

✅ **Gestion des utilisateurs**
- Créer, modifier, supprimer des utilisateurs
- Profils utilisateurs

✅ **Gestion des catways (pontons)**
- Créer et modifier des catways
- Suivre l'état de chaque catway
- Types de catways (long/short)

✅ **Gestion des réservations**
- Enregistrer des réservations
- Suivre les dates d'arrivée/départ
- Informations sur les bateaux et clients

✅ **API REST complète**
- Endpoints pour toutes les entités
- Documentation détaillée
- Réponses JSON standardisées

✅ **Interface utilisateur moderne**
- Design responsive avec Bootstrap 5
- Interface intuitive
- Formulaires AJAX

## Installation rapide

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB (v4.4 ou supérieur)

### Étapes d'installation

1. **Installer les dépendances**
```powershell
npm install
```

2. **Démarrer MongoDB**
```powershell
net start MongoDB
```

3. **Initialiser la base de données**
```powershell
npm run seed
```
Cela créera un utilisateur admin (admin@port.com / admin123)

4. **Lancer l'application**
```powershell
npm run dev
```

5. **Accéder à l'application**
Ouvrez votre navigateur : http://localhost:3000

📖 **Pour plus de détails**, consultez [INSTALLATION.md](INSTALLATION.md)

## Structure du projet

```
port-plaisance/
├── models/              # Modèles Mongoose (User, Catway, Reservation)
├── routes/              # Routes Express
│   ├── api/            # Routes API REST
│   ├── auth.js         # Routes d'authentification
│   ├── dashboard.js    # Routes du tableau de bord
│   └── index.js        # Page d'accueil
├── views/               # Vues EJS
│   ├── partials/       # Composants réutilisables
│   ├── catways/        # Vues catways
│   ├── reservations/   # Vues réservations
│   └── ...
├── public/              # Fichiers statiques
│   └── js/             # Scripts JavaScript
├── middleware/          # Middlewares personnalisés
├── server.js           # Point d'entrée
├── seed.js             # Script d'initialisation
└── .env                # Configuration
```

## Utilisation

### Connexion
- Email: `admin@port.com`
- Mot de passe: `admin123`

⚠️ Changez ces identifiants en production !

### Pages disponibles

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Page de connexion |
| Tableau de bord | `/dashboard` | Gestion complète |
| Liste catways | `/dashboard/catways` | Tous les catways |
| Détails catway | `/dashboard/catways/:id` | Détails d'un catway |
| Liste réservations | `/dashboard/reservations` | Toutes les réservations |
| Détails réservation | `/dashboard/reservations/:id` | Détails d'une réservation |
| Documentation API | `/dashboard/documentation` | Documentation complète |

### API REST

Tous les endpoints nécessitent une authentification.

**Utilisateurs** (`/api/users`)
- `GET /api/users` - Liste des utilisateurs
- `POST /api/users` - Créer un utilisateur
- `GET /api/users/:id` - Détails d'un utilisateur
- `PUT /api/users/:id` - Modifier un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

**Catways** (`/api/catways`)
- `GET /api/catways` - Liste des catways
- `POST /api/catways` - Créer un catway
- `GET /api/catways/:id` - Détails d'un catway
- `PUT /api/catways/:id` - Modifier un catway
- `DELETE /api/catways/:id` - Supprimer un catway

**Réservations** (`/api/reservations`)
- `GET /api/reservations` - Liste des réservations
- `POST /api/reservations` - Créer une réservation
- `GET /api/reservations/:id` - Détails d'une réservation
- `PUT /api/reservations/:id` - Modifier une réservation
- `DELETE /api/reservations/:id` - Supprimer une réservation

## Technologies utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **bcryptjs** - Hashage des mots de passe
- **express-session** - Gestion des sessions

### Frontend
- **EJS** - Moteur de templates
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Icônes
- **JavaScript** - Interactivité

## Scripts disponibles

```powershell
# Démarrer en mode développement (avec rechargement auto)
npm run dev

# Démarrer en mode production
npm start

# Initialiser/réinitialiser la base de données
npm run seed
```

## Configuration

Les variables d'environnement sont dans le fichier `.env` :

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/port_plaisance
SESSION_SECRET=votre_secret_ici
NODE_ENV=development
```

## Déploiement

### 🚀 Render.com (Recommandé - GRATUIT)

Le moyen le plus simple de déployer cette application. Consultez le guide complet : **[DEPLOYMENT.md](DEPLOYMENT.md)**

**En bref :**
1. Créer un dépôt GitHub
2. Se connecter à [Render.com](https://render.com)
3. Connecter le dépôt GitHub
4. Configurer les variables d'environnement (MONGODB_URI)
5. Déployer !

Votre application sera accessible à : `https://port-plaisance.onrender.com`

### Autres plateformes

L'application peut être déployée sur :
- **Railway.app** : Similaire à Render
- **Fly.io** : Plan gratuit généreux
- **DigitalOcean** : $5/mois
- **Heroku** : Plus de plan gratuit

⚠️ **Netlify et Vercel ne sont PAS adaptés** pour cette application (serveur Express + sessions).

## Sécurité

- ✅ Mots de passe hashés avec bcrypt
- ✅ Sessions sécurisées
- ✅ Protection CSRF potentielle
- ✅ Validation des données
- ⚠️ En production, utilisez HTTPS
- ⚠️ Changez le SESSION_SECRET

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

## Licence

ISC

## Auteur

Projet créé pour la gestion d'un port de plaisance.

---

📖 **Documentation complète** : Consultez `/dashboard/documentation` dans l'application

🐛 **Problèmes ?** : Consultez [INSTALLATION.md](INSTALLATION.md) pour le dépannage

