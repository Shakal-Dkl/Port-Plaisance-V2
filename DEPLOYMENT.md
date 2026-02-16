# Guide de déploiement sur Render.com

## 📋 Prérequis

1. **Compte GitHub** : Pour héberger votre code
2. **Compte Render** : Créer un compte sur https://render.com (gratuit)
3. **MongoDB Atlas** : Déjà configuré ✅

## 🚀 Étapes de déploiement

### Étape 1 : Préparer le code (FAIT ✅)

Tous les fichiers nécessaires sont déjà créés :
- ✅ `package.json` avec le script `"start": "node server.js"`
- ✅ `.env` avec `MONGODB_URI` configuré
- ✅ Structure de projet correcte

### Étape 2 : Créer un dépôt GitHub

```bash
# Dans PowerShell, à la racine du projet

# 1. Initialiser git (si pas déjà fait)
git init

# 2. Créer un fichier .gitignore (important !)
# Le fichier .gitignore est déjà créé avec ce guide

# 3. Ajouter tous les fichiers
git add .

# 4. Faire le premier commit
git commit -m "Initial commit - Application port de plaisance"

# 5. Se connecter à GitHub et créer un nouveau dépôt
# Rendez-vous sur https://github.com/new
# Nommez-le "port-plaisance"
# NE PAS initialiser avec README, .gitignore ou licence

# 6. Connecter et pousser vers GitHub (remplacer USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/port-plaisance.git
git branch -M main
git push -u origin main
```

### Étape 3 : Déployer sur Render

1. **Se connecter à Render**
   - Allez sur https://render.com
   - Cliquez sur "Get Started for Free"
   - Connectez-vous avec GitHub

2. **Créer un nouveau Web Service**
   - Cliquez sur "New +" → "Web Service"
   - Sélectionnez votre dépôt `port-plaisance`
   - Cliquez sur "Connect"

3. **Configurer le service**
   ```
   Name: port-plaisance
   Region: Frankfurt (Europe) ou Oregon (US)
   Branch: main
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Ajouter les variables d'environnement**
   - Cliquez sur "Advanced" → "Add Environment Variable"
   - Ajoutez :
     ```
     Clé: MONGODB_URI
     Valeur: mongodb+srv://darkless_db:password@cluster0.xxxxx.mongodb.net/port_plaisance
     
     Clé: PORT
     Valeur: 10000
     
     Clé: NODE_ENV
     Valeur: production
     ```
   - ⚠️ Copiez votre vraie URI MongoDB depuis votre fichier `.env`

5. **Cliquer sur "Create Web Service"**
   - Render va :
     - Installer les dépendances
     - Lancer les tests
     - Démarrer le serveur
   - Cela prend environ 2-3 minutes

6. **Votre application sera accessible à** :
   ```
   https://port-plaisance.onrender.com
   ```

## ⚙️ Configuration MongoDB Atlas pour Render

1. Aller sur MongoDB Atlas : https://cloud.mongodb.com
2. Cliquer sur "Network Access" (dans le menu de gauche)
3. Cliquer sur "Add IP Address"
4. Sélectionner "Allow Access from Anywhere" (0.0.0.0/0)
5. Cliquer sur "Confirm"

⚠️ **Important** : Cela permet à Render de se connecter à votre base de données.

## 🔄 Déploiement automatique

Chaque fois que vous poussez du code sur GitHub, Render redéploie automatiquement :

```bash
git add .
git commit -m "Ajout de nouvelles fonctionnalités"
git push
```

Render détecte le push et redéploie en quelques minutes.

## 🐛 Dépannage

### Erreur : "Application failed to start"
- Vérifiez que `MONGODB_URI` est bien configuré dans les variables d'environnement
- Vérifiez les logs dans Render : "Logs" → "Deploy Logs"

### Erreur : "MongoNetworkError"
- Vérifiez que MongoDB Atlas autorise l'IP 0.0.0.0/0 (tous les IPs)
- Allez dans MongoDB Atlas → Network Access

### Le site est lent au premier chargement
- Normal avec le plan gratuit : Render met le service en veille après 15 minutes d'inactivité
- Premier chargement prend 30-60 secondes pour réveiller le service

## 📊 Limites du plan gratuit Render

- ✅ 750 heures/mois (suffisant pour 1 projet)
- ⏸️ Mise en veille après 15 minutes d'inactivité
- 🐌 Réveil en 30-60 secondes
- 💾 512 MB RAM
- 🔄 Builds illimités

## 🎉 Alternatives si Render ne convient pas

1. **Railway.app** : Similaire à Render, $5/mois après essai gratuit
2. **Fly.io** : Gratuit avec limites généreuses
3. **DigitalOcean App Platform** : $5/mois
4. **Heroku** : Plus de plan gratuit depuis novembre 2022

## 🔐 Sécurité

N'oubliez pas de :
- ✅ Ne JAMAIS commiter le fichier `.env` (déjà dans .gitignore)
- ✅ Utiliser des variables d'environnement sur Render
- ✅ Changer le `secret` de session dans la production

---

**Besoin d'aide ?** Consultez la documentation Render : https://render.com/docs
