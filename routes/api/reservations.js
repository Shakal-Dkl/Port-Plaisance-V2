// =====================================================
// API REST POUR LES RÉSERVATIONS
// Permet de gérer les réservations de catways
// =====================================================

const express = require('express');
const router = express.Router();
const reservationService = require('../../services/reservationService');
const { isAuthenticated } = require('../../middleware/auth');

// =====================================================
// CRÉER UNE NOUVELLE RÉSERVATION (POST)
// URL: POST /api/reservations
// =====================================================
router.post('/', isAuthenticated, async (req, res) => {
  try {
    // Récupérer les données du formulaire
    const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;

    // Créer une nouvelle réservation via le service
    const reservation = await reservationService.createReservation({ 
      catwayNumber, 
      clientName, 
      boatName, 
      checkIn, 
      checkOut 
    });

    // Envoyer une réponse de succès
    res.status(201).json({ 
      success: true, 
      message: 'Réservation créée avec succès',
      data: reservation 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la création',
      error: error.message 
    });
  }
});

// =====================================================
// RÉCUPÉRER TOUTES LES RÉSERVATIONS (GET)
// URL: GET /api/reservations
// =====================================================
router.get('/', isAuthenticated, async (req, res) => {
  try {
    // Chercher toutes les réservations via le service
    const reservations = await reservationService.getAllReservations();
    
    // Envoyer la liste
    res.json({ 
      success: true, 
      data: reservations 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération',
      error: error.message 
    });
  }
});

// =====================================================
// RÉCUPÉRER UNE RÉSERVATION PAR SON ID (GET)
// URL: GET /api/reservations/:id
// =====================================================
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    // Chercher la réservation via le service
    const reservation = await reservationService.getReservationById(req.params.id);
    
    // Si la réservation n'existe pas
    if (!reservation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Réservation non trouvée' 
      });
    }
    
    // Envoyer la réservation
    res.json({ 
      success: true, 
      data: reservation 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération',
      error: error.message 
    });
  }
});

// =====================================================
// METTRE À JOUR UNE RÉSERVATION (PUT)
// URL: PUT /api/reservations/:id
// =====================================================
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    // Récupérer les nouvelles données
    const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;

    // Mettre à jour la réservation via le service
    const reservation = await reservationService.updateReservation(
      req.params.id,
      { catwayNumber, clientName, boatName, checkIn, checkOut }
    );

    // Si la réservation n'existe pas
    if (!reservation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Réservation non trouvée' 
      });
    }

    // Envoyer la réservation mise à jour
    res.json({ 
      success: true, 
      message: 'Réservation mise à jour',
      data: reservation 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la mise à jour',
      error: error.message 
    });
  }
});

// =====================================================
// SUPPRIMER UNE RÉSERVATION (DELETE)
// URL: DELETE /api/reservations/:id
// =====================================================
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    // Supprimer la réservation via le service
    const reservation = await reservationService.deleteReservation(req.params.id);
    
    // Si la réservation n'existe pas
    if (!reservation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Réservation non trouvée' 
      });
    }
    
    // Envoyer une confirmation
    res.json({ 
      success: true, 
      message: 'Réservation supprimée avec succès' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la suppression',
      error: error.message 
    });
  }
});

// Exporter le router
module.exports = router;
