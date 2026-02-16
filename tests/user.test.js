// =====================================================
// TESTS UNITAIRES POUR LES UTILISATEURS
// Teste la création, suppression et liste des utilisateurs
// =====================================================

const { expect } = require('chai');
const mongoose = require('mongoose');
const userService = require('../services/userService');
require('dotenv').config();

// =====================================================
// CONFIGURATION DES TESTS
// =====================================================
describe('Tests Utilisateurs', function() {
  let createdUserId = null; // Pour stocker l'ID de l'utilisateur créé

  // Avant tous les tests: se connecter à MongoDB
  before(async function() {
    try {
      // Si déjà connecté, ne pas reconnecter
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connecté pour les tests');
      }
    } catch (error) {
      console.error('❌ Erreur connexion MongoDB:', error);
      throw error;
    }
  });

  // Après tous les tests: fermer la connexion MongoDB
  after(async function() {
    await mongoose.connection.close();
    console.log('🔌 MongoDB déconnecté');
  });

  // =====================================================
  // TEST 1: CRÉER UN UTILISATEUR
  // =====================================================
  it('devrait créer un nouvel utilisateur', async function() {
    // Préparer les données de l'utilisateur
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    // Créer l'utilisateur via le service
    const user = await userService.createUser(userData);

    // Sauvegarder l'ID pour les autres tests
    createdUserId = user._id;

    // Vérifications
    expect(user).to.have.property('_id'); // Doit avoir un ID
    expect(user.name).to.equal('Test User'); // Le nom doit correspondre
    expect(user.email).to.equal('test@example.com'); // L'email doit correspondre
    expect(user.password).to.not.equal('password123'); // Le mot de passe doit être hashé

    console.log('✅ Test création utilisateur réussi');
  });

  // =====================================================
  // TEST 2: LISTER TOUS LES UTILISATEURS
  // =====================================================
  it('devrait récupérer la liste de tous les utilisateurs', async function() {
    // Récupérer tous les utilisateurs
    const users = await userService.getAllUsers();

    // Vérifications
    expect(users).to.be.an('array'); // Doit être un tableau
    expect(users.length).to.be.greaterThan(0); // Doit contenir au moins 1 utilisateur

    // Vérifier que notre utilisateur créé est dans la liste
    const foundUser = users.find(u => u.email === 'test@example.com');
    expect(foundUser).to.exist; // Il doit être trouvé
    // Note: le mot de passe est normalement exclu par le service

    console.log('✅ Test liste utilisateurs réussi');
  });

  // =====================================================
  // TEST 3: SUPPRIMER UN UTILISATEUR
  // =====================================================
  it('devrait supprimer l\'utilisateur créé', async function() {
    // Supprimer l'utilisateur via le service
    const deletedUser = await userService.deleteUser(createdUserId);

    // Vérifications
    expect(deletedUser).to.not.be.null; // L'utilisateur doit avoir été trouvé
    expect(deletedUser._id.toString()).to.equal(createdUserId.toString());

    // Vérifier qu'il n'existe plus
    const user = await userService.getUserById(createdUserId);
    expect(user).to.be.null; // Il ne doit plus exister

    console.log('✅ Test suppression utilisateur réussi');
  });
});
