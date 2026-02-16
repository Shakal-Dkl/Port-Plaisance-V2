// =====================================================
// TESTS UNITAIRES POUR LES RÉSERVATIONS
// Teste la création, suppression et liste des réservations
// =====================================================

const { expect } = require('chai');
const mongoose = require('mongoose');
const reservationService = require('../services/reservationService');
require('dotenv').config();

// =====================================================
// CONFIGURATION DES TESTS
// =====================================================
describe('Tests Réservations', function() {
  let createdReservationId = null; // Pour stocker l'ID de la réservation créée

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

  // Après tous les tests: fermer la connexion si c'est le dernier suite de tests
  after(async function() {
    // Ne pas fermer ici, les autres tests peuvent avoir besoin de la connexion
  });

  // =====================================================
  // TEST 1: CRÉER UNE RÉSERVATION
  // =====================================================
  it('devrait créer une nouvelle réservation', async function() {
    // Préparer les données de la réservation
    const reservationData = {
      catwayNumber: 1,
      clientName: 'Test Client',
      boatName: 'Test Boat',
      checkIn: new Date('2024-06-01'),
      checkOut: new Date('2024-06-10')
    };

    // Créer la réservation via le service
    const reservation = await reservationService.createReservation(reservationData);

    // Sauvegarder l'ID pour les autres tests
    createdReservationId = reservation._id;

    // Vérifications
    expect(reservation).to.have.property('_id'); // Doit avoir un ID
    expect(Number(reservation.catwayNumber)).to.equal(1); // Le numéro doit correspondre
    expect(reservation.clientName).to.equal('Test Client');
    expect(reservation.boatName).to.equal('Test Boat');

    console.log('✅ Test création réservation réussi');
  });

  // =====================================================
  // TEST 2: LISTER TOUTES LES RÉSERVATIONS
  // =====================================================
  it('devrait récupérer la liste de toutes les réservations', async function() {
    // Récupérer toutes les réservations
    const reservations = await reservationService.getAllReservations();

    // Vérifications
    expect(reservations).to.be.an('array'); // Doit être un tableau
    expect(reservations.length).to.be.greaterThan(0); // Doit contenir au moins 1 réservation

    // Vérifier que notre réservation créée est dans la liste
    const foundReservation = reservations.find(r => 
      r.clientName === 'Test Client' && r.boatName === 'Test Boat'
    );
    expect(foundReservation).to.exist; // Elle doit être trouvée

    console.log('✅ Test liste réservations réussi');
  });

  // =====================================================
  // TEST 3: SUPPRIMER UNE RÉSERVATION
  // =====================================================
  it('devrait supprimer la réservation créée', async function() {
    // Supprimer la réservation via le service
    const deletedReservation = await reservationService.deleteReservation(createdReservationId);

    // Vérifications
    expect(deletedReservation).to.not.be.null; // La réservation doit avoir été trouvée
    expect(deletedReservation._id.toString()).to.equal(createdReservationId.toString());

    // Vérifier qu'elle n'existe plus
    const reservation = await reservationService.getReservationById(createdReservationId);
    expect(reservation).to.be.null; // Elle ne doit plus exister

    console.log('✅ Test suppression réservation réussi');
  });
});
