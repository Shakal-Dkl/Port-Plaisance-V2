// =====================================================
// ROUTES DU TABLEAU DE BORD
// Pages web pour gérer catways et réservations
// =====================================================

const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');

// =====================================================
// PAGE PRINCIPALE DU TABLEAU DE BORD
// URL: GET /dashboard
// =====================================================
router.get('/', isAuthenticated, async (req, res) => {
  try {
    // Récupérer tous les catways et réservations
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    const reservations = await Reservation.find().sort({ checkIn: -1 });
    
    // Afficher la page
    res.render('dashboard', { 
      title: 'Tableau de bord',
      catways,
      reservations
    });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// =====================================================
// PAGE LISTE DES CATWAYS
// URL: GET /dashboard/catways
// =====================================================
router.get('/catways', isAuthenticated, async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('catways/list', { 
      title: 'Liste des catways',
      catways
    });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
});

// =====================================================
// PAGE DÉTAILS D'UN CATWAY
// URL: GET /dashboard/catways/:id
// =====================================================
router.get('/catways/:id', isAuthenticated, async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.redirect('/dashboard/catways');
    }
    res.render('catways/details', { 
      title: `Catway ${catway.catwayNumber}`,
      catway
    });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard/catways');
  }
});

// =====================================================
// PAGE LISTE DES RÉSERVATIONS
// URL: GET /dashboard/reservations
// =====================================================
router.get('/reservations', isAuthenticated, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ checkIn: -1 });
    res.render('reservations/list', { 
      title: 'Liste des réservations',
      reservations
    });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
});

// =====================================================
// PAGE DÉTAILS D'UNE RÉSERVATION
// URL: GET /dashboard/reservations/:id
// =====================================================
router.get('/reservations/:id', isAuthenticated, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.redirect('/dashboard/reservations');
    }
    res.render('reservations/details', { 
      title: `Réservation ${reservation.clientName}`,
      reservation
    });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard/reservations');
  }
});

// =====================================================
// PAGE DOCUMENTATION API
// URL: GET /dashboard/documentation
// =====================================================
router.get('/documentation', isAuthenticated, (req, res) => {
  res.render('documentation', { title: 'Documentation API' });
});

module.exports = router;
