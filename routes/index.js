// =====================================================
// ROUTES DE LA PAGE D'ACCUEIL
// =====================================================

const express = require('express');
const router = express.Router();

// Page d'accueil avec formulaire de connexion
router.get('/', (req, res) => {
  res.render('index', { title: 'Accueil - Port de Plaisance' });
});

module.exports = router;
