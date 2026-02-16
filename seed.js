// =====================================================
// SCRIPT D'INITIALISATION DE LA BASE DE DONNÉES
// Ce fichier crée des données de test pour démarrer
// =====================================================

// Charger les variables d'environnement
require('dotenv').config();

// Importer les modules nécessaires
const mongoose = require('mongoose');
const User = require('./models/User');
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');

// Fonction principale pour initialiser la base de données
async function seedDatabase() {
  try {
    // 1. Se connecter à MongoDB
    console.log('📡 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connecté à MongoDB');

    // 2. Nettoyer la base de données (supprimer toutes les données)
    console.log('🧹 Nettoyage de la base de données...');
    await User.deleteMany({});
    await Catway.deleteMany({});
    await Reservation.deleteMany({});
    console.log('✓ Base de données nettoyée');

    // 3. Créer un utilisateur administrateur
    console.log('👤 Création de l\'utilisateur admin...');
    const user = await User.create({
      name: 'Administrateur',
      email: 'admin@port.com',
      password: 'admin123'  // Le mot de passe sera automatiquement hashé
    });
    console.log('✓ Utilisateur créé:', user.email);

    // 4. Créer des catways (pontons) de test
    console.log('⚓ Création des catways...');
    const catways = await Catway.insertMany([
      { catwayNumber: 'A1', type: 'long', catwayState: 'Bon état' },
      { catwayNumber: 'A2', type: 'long', catwayState: 'Bon état' },
      { catwayNumber: 'A3', type: 'short', catwayState: 'En maintenance' },
      { catwayNumber: 'B1', type: 'long', catwayState: 'Bon état' },
      { catwayNumber: 'B2', type: 'short', catwayState: 'Bon état' },
      { catwayNumber: 'C1', type: 'long', catwayState: 'Bon état' }
    ]);
    console.log(`✓ ${catways.length} catways créés`);

    // 5. Créer des réservations de test
    console.log('📅 Création des réservations...');
    
    // Calculer les dates
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const reservations = await Reservation.insertMany([
      {
        catwayNumber: 'A1',
        clientName: 'Jean Dupont',
        boatName: 'Sea Breeze',
        checkIn: today,
        checkOut: nextWeek
      },
      {
        catwayNumber: 'B1',
        clientName: 'Marie Martin',
        boatName: 'Ocean Dream',
        checkIn: today,
        checkOut: nextWeek
      },
      {
        catwayNumber: 'C1',
        clientName: 'Pierre Durand',
        boatName: 'Wind Rider',
        checkIn: today,
        checkOut: nextWeek
      }
    ]);
    console.log(`✓ ${reservations.length} réservations créées`);

    // 6. Afficher les informations de connexion
    console.log('\n✅ Base de données initialisée avec succès!');
    console.log('\n📋 Compte administrateur:');
    console.log('   Email: admin@port.com');
    console.log('   Mot de passe: admin123');
    console.log('\n🚀 Vous pouvez maintenant lancer: npm run dev');

    // Fermer la connexion et terminer le script
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'initialisation:', error.message);
    process.exit(1);
  }
}

// Lancer la fonction
seedDatabase();
