# 🚀 Démarrage Rapide - Port de Plaisance

## Installation en 5 minutes

### 1️⃣ Installer les dépendances
```powershell
cd C:\Users\darkl\port-plaisance
npm install
```

### 2️⃣ Démarrer MongoDB
```powershell
# Vérifier si MongoDB est déjà démarré
Get-Service MongoDB

# Si nécessaire, démarrer MongoDB
net start MongoDB
```

### 3️⃣ Initialiser la base de données
```powershell
npm run seed
```

**Identifiants créés :**
- 📧 Email: `admin@port.com`
- 🔑 Mot de passe: `admin123`

### 4️⃣ Lancer l'application
```powershell
npm run dev
```

### 5️⃣ Ouvrir l'application
Ouvrez votre navigateur : **http://localhost:3000**

---

## 📝 Ce qui a été créé

### Utilisateur par défaut
- Email: admin@port.com
- Mot de passe: admin123

### 6 Catways
- A1, A2, B1, B2, C1 (type long)
- A3 (type short, en maintenance)

### 3 Réservations de test
- Jean Dupont - Catway A1
- Marie Martin - Catway B1
- Pierre Durand - Catway C1

---

## 🎯 Fonctionnalités principales

### Page d'accueil (/)
- Présentation de l'application
- Formulaire de connexion
- Lien vers la documentation API

### Tableau de bord (/dashboard)
**Formulaires disponibles :**
- ✅ Créer/Modifier/Supprimer un utilisateur
- ✅ Créer/Modifier/Supprimer un catway
- ✅ Afficher les détails d'un catway
- ✅ Créer/Supprimer une réservation
- ✅ Afficher les détails d'une réservation

**Liens rapides :**
- 📋 Liste des catways
- 📅 Liste des réservations

### Listes
- **Liste des catways** (/dashboard/catways)
- **Liste des réservations** (/dashboard/reservations)

### Pages de détails
- **Détails d'un catway** (/dashboard/catways/:id)
- **Détails d'une réservation** (/dashboard/reservations/:id)

### Documentation
- **Documentation complète de l'API** (/dashboard/documentation)

---

## 🔌 API REST

Tous les endpoints sont documentés dans l'application à `/dashboard/documentation`

### Endpoints disponibles

**Utilisateurs** - `/api/users`
- GET, POST, PUT, DELETE

**Catways** - `/api/catways`
- GET, POST, PUT, DELETE

**Réservations** - `/api/reservations`
- GET, POST, PUT, DELETE

---

## 🛠️ Commandes utiles

```powershell
# Démarrage en mode développement (recommandé)
npm run dev

# Démarrage en mode production
npm start

# Réinitialiser la base de données avec des données de test
npm run seed
```

---

## 📱 Tester l'application

### 1. Connexion
1. Allez sur http://localhost:3000
2. Connectez-vous avec admin@port.com / admin123

### 2. Créer un catway
1. Dans le tableau de bord, ouvrez "Créer un catway"
2. Remplissez le formulaire
3. Cliquez sur "Créer"

### 3. Créer une réservation
1. Ouvrez "Créer une réservation"
2. Remplissez tous les champs
3. Cliquez sur "Créer"

### 4. Voir les listes
- Cliquez sur "Liste des catways"
- Cliquez sur "Liste des réservations"

### 5. Tester l'API
1. Allez sur /dashboard/documentation
2. Consultez les exemples d'utilisation
3. Utilisez les formulaires AJAX du tableau de bord

---

## ⚠️ Important

### En développement
- Le mot de passe admin123 est OK
- MongoDB peut tourner en local
- Les logs d'erreur sont visibles

### En production
1. ✅ Changez le mot de passe admin
2. ✅ Utilisez MongoDB Atlas (cloud)
3. ✅ Changez SESSION_SECRET dans .env
4. ✅ Définissez NODE_ENV=production
5. ✅ Utilisez HTTPS

---

## 🐛 Problèmes courants

### MongoDB ne démarre pas
```powershell
# Vérifier le statut
Get-Service MongoDB

# Démarrer manuellement
Start-Service MongoDB
```

### Port 3000 déjà utilisé
Modifiez PORT dans .env :
```
PORT=3001
```

### Erreur "Cannot find module"
```powershell
npm install
```

---

## 📚 Documentation

- **README.md** - Vue d'ensemble
- **INSTALLATION.md** - Guide d'installation détaillé
- **/dashboard/documentation** - Documentation API dans l'app

---

## 🎉 C'est prêt !

L'application est maintenant fonctionnelle avec :
- ✅ Authentification complète
- ✅ Toutes les pages demandées
- ✅ API REST complète
- ✅ Documentation intégrée
- ✅ Données de test

Bon développement ! 🚀
