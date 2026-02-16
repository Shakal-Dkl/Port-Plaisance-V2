# 📚 Guide Débutant - Port de Plaisance

## 🎯 Ce qui a été simplifié

Ce projet a été simplifié pour être plus accessible aux débutants. Voici les changements :

### ✅ **Code simplifié et commenté**
- Tous les fichiers ont des commentaires explicatifs
- Code plus court et plus facile à comprendre
- Moins de validations complexes

### ✅ **Fonctionnalités retirées**
- ❌ Flash messages (messages de succès/erreur temporaires)
- ❌ Method-override (pour les formulaires DELETE/PUT)
- ❌ Validations complexes côté serveur
- ❌ Gestion d'erreurs avancée

### ✅ **Structure simplifiée**
- Code plus direct et lisible
- Moins de middlewares
- Réponses API standardisées

---

## 📖 Structure du Projet

```
port-plaisance/
│
├── server.js              # Point d'entrée (démarre le serveur)
├── seed.js               # Initialise la base de données
├── package.json          # Liste des dépendances
├── .env                  # Configuration (MongoDB, etc.)
│
├── models/               # Schémas de données MongoDB
│   ├── User.js          # Modèle utilisateur
│   ├── Catway.js        # Modèle catway (ponton)
│   └── Reservation.js   # Modèle réservation
│
├── routes/              # Routes de l'application
│   ├── index.js        # Page d'accueil
│   ├── auth.js         # Connexion/Déconnexion
│   ├── dashboard.js    # Tableau de bord
│   └── api/            # API REST
│       ├── users.js
│       ├── catways.js
│       └── reservations.js
│
├── middleware/          # Middlewares personnalisés
│   └── auth.js         # Vérification d'authentification
│
├── views/              # Pages HTML (EJS)
│   ├── index.ejs      # Page d'accueil
│   ├── dashboard.ejs  # Tableau de bord
│   └── ...
│
└── public/            # Fichiers statiques (CSS, JS)
    └── js/
        ├── main.js
        └── dashboard.js
```

---

## 🔍 Comment ça fonctionne ?

### 1️⃣ **Démarrage de l'application**

Fichier : [server.js](server.js)

```javascript
// 1. Charger les bibliothèques
const express = require('express');
const mongoose = require('mongoose');

// 2. Créer l'application Express
const app = express();

// 3. Se connecter à MongoDB
mongoose.connect(process.env.MONGODB_URI);

// 4. Configurer Express (lire les formulaires, etc.)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 5. Définir les routes
app.use('/', require('./routes/index'));
app.use('/api/catways', require('./routes/api/catways'));

// 6. Démarrer le serveur
app.listen(3000);
```

### 2️⃣ **Les Modèles (Models)**

Les modèles définissent la structure des données dans MongoDB.

**Exemple : Catway** ([models/Catway.js](models/Catway.js))
```javascript
const catwaySchema = new mongoose.Schema({
  catwayNumber: String,  // Numéro du catway (A1, B2, etc.)
  type: String,          // Type: 'long' ou 'short'
  catwayState: String    // État du catway
});
```

### 3️⃣ **Les Routes API**

Les routes API permettent de créer, lire, modifier et supprimer des données.

**Structure d'une Route** ([routes/api/catways.js](routes/api/catways.js))
```javascript
// GET - Récupérer tous les catways
router.get('/', async (req, res) => {
  const catways = await Catway.find();  // Chercher dans MongoDB
  res.json({ data: catways });          // Envoyer la réponse
});

// POST - Créer un nouveau catway
router.post('/', async (req, res) => {
  const catway = new Catway(req.body);  // Créer un nouveau catway
  await catway.save();                  // Enregistrer dans MongoDB
  res.json({ data: catway });           // Envoyer la réponse
});
```

### 4️⃣ **L'Authentification**

Fichier : [middleware/auth.js](middleware/auth.js)

```javascript
// Vérifier si l'utilisateur est connecté
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();  // Continuer vers la route
  } else {
    res.redirect('/');  // Rediriger vers la page de connexion
  }
};
```

---

## 🚀 Lancer le Projet

### 1. Installer les dépendances
```bash
npm install
```

### 2. Initialiser la base de données
```bash
npm run seed
```

### 3. Lancer l'application
```bash
npm run dev
```

### 4. Ouvrir dans le navigateur
http://localhost:3000

**Identifiants :** 
- Email: `admin@port.com`
- Mot de passe: `admin123`

---

## 📝 Concepts Clés à Comprendre

### 🔹 **Express.js**
Framework web pour Node.js qui permet de créer des serveurs web facilement.

### 🔹 **MongoDB & Mongoose**
- **MongoDB** : Base de données NoSQL (stocke des documents JSON)
- **Mongoose** : Bibliothèque pour interagir avec MongoDB

### 🔹 **API REST**
Interface qui permet de manipuler les données via HTTP :
- **GET** : Récupérer des données
- **POST** : Créer des données
- **PUT** : Modifier des données
- **DELETE** : Supprimer des données

### 🔹 **Sessions**
Permet de savoir qui est connecté. Une session stocke les informations de l'utilisateur.

### 🔹 **EJS (Templates)**
Permet de créer des pages HTML dynamiques avec du JavaScript.

### 🔹 **Middleware**
Fonction qui s'exécute avant les routes (exemple : vérifier si l'utilisateur est connecté).

---

## 🎓 Pour Aller Plus Loin

### Exercices Pratiques

1. **Ajouter un champ** : Ajouter un champ "capacité" aux catways
2. **Créer une nouvelle route** : Route pour chercher un catway par numéro
3. **Modifier une vue** : Personnaliser le dashboard avec votre style
4. **Ajouter une validation** : Vérifier que le numéro de catway est unique

### Ressources

- [Documentation Express.js](https://expressjs.com/)
- [Documentation Mongoose](https://mongoosejs.com/)
- [Documentation EJS](https://ejs.co/)
- [MongoDB University](https://university.mongodb.com/) - Cours gratuits

---

## ❓ Questions Fréquentes

### **Q: Où se trouvent les données ?**
Dans MongoDB Atlas (base de données cloud). Connexion configurée dans `.env`.

### **Q: Comment ajouter un nouveau champ ?**
1. Modifier le modèle (models/Catway.js)
2. Modifier la route API (routes/api/catways.js)
3. Modifier la vue (views/dashboard.ejs)

### **Q: Comment fonctionne l'authentification ?**
Les sessions stockent l'ID de l'utilisateur. Le middleware vérifie si la session existe.

### **Q: Pourquoi async/await ?**
MongoDB est asynchrone (il faut attendre la réponse). `async/await` permet d'attendre proprement.

---

## 💡 Conseils pour Débutants

1. **Lisez les commentaires** : Chaque fichier est commenté pour expliquer ce qu'il fait
2. **Testez le code** : Modifiez et voyez ce qui se passe
3. **Utilisez console.log()** : Pour afficher des valeurs et comprendre le code
4. **Regardez la console** : Les erreurs s'affichent dans le terminal
5. **Testez l'API** : Utilisez Postman ou Thunder Client pour tester les routes

---

## 🐛 Déboguer les Erreurs Courantes

### Erreur : "Cannot find module"
➡️ Lancez `npm install`

### Erreur : "Port 3000 is already in use"
➡️ Un serveur tourne déjà. Fermez-le avec `Ctrl+C`

### Erreur : "MongooseError: buffering timed out"
➡️ Vérifiez votre connexion MongoDB dans `.env`

### Erreur : "Cannot POST /api/catways"
➡️ Vérifiez que vous êtes connecté (middleware d'authentification)

---

**Bon apprentissage ! 🎉**
