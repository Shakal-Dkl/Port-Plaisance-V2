// =====================================================
// API REST POUR LES CATWAYS (PONTONS)
// Un API REST permet de créer, lire, modifier et supprimer des données
// =====================================================

const express = require('express');
const router = express.Router();
const catwayService = require('../../services/catwayService');
const reservationService = require('../../services/reservationService');
const { isAuthenticated } = require('../../middleware/auth');

// =====================================================
// CRÉER UN NOUVEAU CATWAY (POST)
// URL: POST /api/catways
// =====================================================
router.post('/', isAuthenticated, async (req, res) => {
  try {
    // Récupérer les données envoyées dans le formulaire
    const { catwayNumber, type, catwayState } = req.body;

    // Créer le catway via le service
    const catway = await catwayService.createCatway({ 
      catwayNumber, 
      type, 
      catwayState 
    });

    // Envoyer une réponse de succès
    res.status(201).json({ 
      success: true, 
      message: 'Catway créé avec succès',
      data: catway 
    });
  } catch (error) {
    // En cas d'erreur (exemple: numéro déjà existant)
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la création',
      error: error.message 
    });
  }
});

// =====================================================
// RÉCUPÉRER TOUS LES CATWAYS (GET)
// URL: GET /api/catways
// =====================================================
router.get('/', isAuthenticated, async (req, res) => {
  try {
    // Récupérer tous les catways via le service
    const catways = await catwayService.getAllCatways();
    
    // Envoyer la liste des catways
    res.json({ 
      success: true, 
      data: catways 
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
// RÉCUPÉRER UN CATWAY PAR SON ID (GET)
// URL: GET /api/catways/:id
// =====================================================
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    // Récupérer le catway via le service
    const catway = await catwayService.getCatwayById(req.params.id);
    
    // Si le catway n'existe pas
    if (!catway) {
      return res.status(404).json({ 
        success: false, 
        message: 'Catway non trouvé' 
      });
    }
    
    // Envoyer le catway trouvé
    res.json({ 
      success: true, 
      data: catway 
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
// METTRE À JOUR UN CATWAY (PUT)
// URL: PUT /api/catways/:id
// =====================================================
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    // Récupérer les nouvelles données
    const { catwayNumber, type, catwayState } = req.body;

    // Mettre à jour le catway via le service
    const catway = await catwayService.updateCatway(
      req.params.id,
      { catwayNumber, type, catwayState }
    );

    // Si le catway n'existe pas
    if (!catway) {
      return res.status(404).json({ 
        success: false, 
        message: 'Catway non trouvé' 
      });
    }

    // Envoyer le catway mis à jour
    res.json({ 
      success: true, 
      message: 'Catway mis à jour',
      data: catway 
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
// SUPPRIMER UN CATWAY (DELETE)
// URL: DELETE /api/catways/:id
// =====================================================
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    // Supprimer le catway via le service
    const catway = await catwayService.deleteCatway(req.params.id);
    
    // Si le catway n'existe pas
    if (!catway) {
      return res.status(404).json({ 
        success: false, 
        message: 'Catway non trouvé' 
      });
    }
    
    // Envoyer une confirmation de suppression
    res.json({ 
      success: true, 
      message: 'Catway supprimé avec succès' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la suppression',
      error: error.message 
    });
  }
});

// =====================================================
// METTRE À JOUR PARTIELLEMENT UN CATWAY (PATCH)
// URL: PATCH /api/catways/:id
// =====================================================
router.patch('/:id', isAuthenticated, async (req, res) => {
  try {
    // Récupérer seulement les champs fournis
    const updates = {};
    if (req.body.catwayNumber) updates.catwayNumber = req.body.catwayNumber;
    if (req.body.type) updates.type = req.body.type;
    if (req.body.catwayState) updates.catwayState = req.body.catwayState;

    // Mettre à jour via le service
    const catway = await catwayService.patchCatway(req.params.id, updates);

    if (!catway) {
      return res.status(404).json({ 
        success: false, 
        message: 'Catway non trouvé' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Catway mis à jour partiellement',
      data: catway 
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
// ROUTES POUR LES RÉSERVATIONS (SOUS-RESSOURCE)
// =====================================================

// =====================================================
// CRÉER UNE RÉSERVATION POUR UN CATWAY (POST)
// URL: POST /api/catways/:id/reservations
// =====================================================
router.post('/:id/reservations', isAuthenticated, async (req, res) => {
  try {
    // Vérifier que le catway existe via le service
    const catway = await catwayService.getCatwayById(req.params.id);
    if (!catway) {
      return res.status(404).json({ 
        success: false, 
        message: 'Catway non trouvé' 
      });
    }

    // Créer la réservation via le service
    const { clientName, boatName, checkIn, checkOut } = req.body;
    const reservation = await reservationService.createReservation({ 
      catwayNumber: catway.catwayNumber,
      clientName, 
      boatName, 
      checkIn, 
      checkOut 
    });

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
// RÉCUPÉRER TOUTES LES RÉSERVATIONS D'UN CATWAY (GET)
// URL: GET /api/catways/:id/reservations
// =====================================================
router.get('/:id/reservations', isAuthenticated, async (req, res) => {
  try {
    // Vérifier que le catway existe via le service
    const catway = await catwayService.getCatwayById(req.params.id);
    if (!catway) {
      return res.status(404).json({ 
        success: false, 
        message: 'Catway non trouvé' 
      });
    }

    // Récupérer toutes les réservations de ce catway via le service
    const reservations = await reservationService.getReservationsByCatway(catway.catwayNumber);
    
    res.json({ 
      success: true, 
      count: reservations.length,
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
// RÉCUPÉRER UNE RÉSERVATION SPÉCIFIQUE D'UN CATWAY (GET)
// URL: GET /api/catways/:id/reservations/:idReservation
// =====================================================
router.get('/:id/reservations/:idReservation', isAuthenticated, async (req, res) => {
  try {
    // Vérifier que le catway existe via le service
    const catway = await catwayService.getCatwayById(req.params.id);
    if (!catway) {
      return res.status(404).json({ 
        success: false, 
        message: 'Catway non trouvé' 
      });
    }

    // Récupérer la réservation via le service
    const reservation = await reservationService.getReservationById(req.params.idReservation);
    if (!reservation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Réservation non trouvée' 
      });
    }

    // Vérifier que la réservation appartient bien à ce catway
    if (reservation.catwayNumber !== catway.catwayNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cette réservation n\'appartient pas à ce catway' 
      });
    }
    
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
// SUPPRIMER UNE RÉSERVATION D'UN CATWAY (DELETE)
// URL: DELETE /api/catways/:id/reservations/:idReservation
// =====================================================
router.delete('/:id/reservations/:idReservation', isAuthenticated, async (req, res) => {
  try {
    // Vérifier que le catway existe via le service
    const catway = await catwayService.getCatwayById(req.params.id);
    if (!catway) {
      return res.status(404).json({ 
        success: false, 
        message: 'Catway non trouvé' 
      });
    }

    // Supprimer la réservation via le service
    const reservation = await reservationService.deleteReservation(req.params.idReservation);
    if (!reservation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Réservation non trouvée' 
      });
    }
    
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

// Exporter le router pour l'utiliser dans server.js
module.exports = router;
