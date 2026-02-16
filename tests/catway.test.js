// =====================================================
// TESTS UNITAIRES POUR LES CATWAYS
// Teste la création, suppression et liste des catways
// =====================================================

const { expect } = require('chai');
const mongoose = require('mongoose');
const catwayService = require('../services/catwayService');
require('dotenv').config();

// =====================================================
// CONFIGURATION DES TESTS
// =====================================================
describe('Tests Catways', function() {
  let createdCatwayId = null; // Pour stocker l'ID du catway créé

  // Avant tous les tests: se connecter à MongoDB
  before(async function() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB connecté pour les tests');
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
  // TEST 1: CRÉER UN CATWAY
  // =====================================================
  it('devrait créer un nouveau catway', async function() {
    // Préparer les données du catway
    const catwayData = {
      catwayNumber: 999,
      type: 'long',
      catwayState: 'Bon état'
    };

    // Créer le catway via le service
    const catway = await catwayService.createCatway(catwayData);

    // Sauvegarder l'ID pour les autres tests
    createdCatwayId = catway._id;

    // Vérifications
    expect(catway).to.have.property('_id'); // Doit avoir un ID
    expect(Number(catway.catwayNumber)).to.equal(999); // Le numéro doit correspondre
    expect(catway.type).to.equal('long'); // Le type doit correspondre
    expect(catway.catwayState).to.equal('Bon état'); // L'état doit correspondre

    console.log('✅ Test création catway réussi');
  });

  // =====================================================
  // TEST 2: LISTER TOUS LES CATWAYS
  // =====================================================
  it('devrait récupérer la liste de tous les catways', async function() {
    // Récupérer tous les catways
    const catways = await catwayService.getAllCatways();

    // Vérifications
    expect(catways).to.be.an('array'); // Doit être un tableau
    expect(catways.length).to.be.greaterThan(0); // Doit contenir au moins 1 catway

    // Vérifier que notre catway créé est dans la liste
    const foundCatway = catways.find(c => Number(c.catwayNumber) === 999);
    expect(foundCatway).to.exist; // Il doit être trouvé

    console.log('✅ Test liste catways réussi');
  });

  // =====================================================
  // TEST 3: SUPPRIMER UN CATWAY
  // =====================================================
  it('devrait supprimer le catway créé', async function() {
    // Supprimer le catway via le service
    const deletedCatway = await catwayService.deleteCatway(createdCatwayId);

    // Vérifications
    expect(deletedCatway).to.not.be.null; // Le catway doit avoir été trouvé
    expect(deletedCatway._id.toString()).to.equal(createdCatwayId.toString());

    // Vérifier qu'il n'existe plus
    const catway = await catwayService.getCatwayById(createdCatwayId);
    expect(catway).to.be.null; // Il ne doit plus exister

    console.log('✅ Test suppression catway réussi');
  });
});
