/**
 * @file Fichier principal de l'application
 * @description Point d'entrée de l'application Express pour la gestion du port de plaisance.
 * Configure le serveur, la base de données MongoDB, les middlewares et les routes.
 * @module server
 * @requires express
 * @requires mongoose
 * @requires express-session
 * @requires dotenv
 */

// 1. Charger les variables d'environnement (fichier .env)
require('dotenv').config();

// 2. Importer les modules nécessaires (bibliothèques)
const express = require('express');  // Framework web
const mongoose = require('mongoose'); // Pour se connecter à MongoDB
const session = require('express-session'); // Pour gérer les sessions (connexion utilisateur)
const path = require('path'); // Pour gérer les chemins de fichiers

// 3. Créer l'application Express
const app = express();

// =====================================================
// CONNEXION À LA BASE DE DONNÉES MONGODB
// =====================================================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connecté avec succès'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

// =====================================================
// CONFIGURATION DE L'APPLICATION
// =====================================================

// Dire à Express d'utiliser EJS pour les pages HTML
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Permettre à Express de lire les données des formulaires
app.use(express.urlencoded({ extended: true }));
// Permettre à Express de lire les données JSON (pour l'API)
app.use(express.json());
// Permettre d'accéder aux fichiers CSS et JS dans le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des sessions (pour savoir qui est connecté)
app.use(session({
  secret: 'mon_secret_123',  // Clé secrète pour sécuriser les sessions
  resave: false,
  saveUninitialized: false
}));

// Rendre la variable 'user' disponible dans toutes les vues
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success_msg = '';
  res.locals.error_msg = '';
  res.locals.error = '';
  next();
});

// =====================================================
// ROUTES DE L'APPLICATION
// =====================================================
app.use('/', require('./routes/index'));           // Page d'accueil et connexion
app.use('/auth', require('./routes/auth'));         // Routes d'authentification
app.use('/dashboard', require('./routes/dashboard')); // Tableau de bord
app.use('/api/users', require('./routes/api/users'));         // API pour les utilisateurs
app.use('/api/catways', require('./routes/api/catways'));     // API pour les catways
app.use('/api/reservations', require('./routes/api/reservations')); // API pour les réservations

// =====================================================
// DÉMARRER LE SERVEUR
// =====================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
