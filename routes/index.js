// =====================================================
// ROUTES DE LA PAGE D'ACCUEIL
// =====================================================

const express = require('express');
const router = express.Router();

// Page d'accueil avec formulaire de connexion
router.get('/', (req, res) => {
  let error_msg = '';

  if (req.query.error === 'credentials') {
    error_msg = 'Email ou mot de passe incorrect.';
  } else if (req.query.error === 'server') {
    error_msg = 'Erreur serveur lors de la connexion. Réessayez dans quelques instants.';
  }

  res.render('index', {
    title: 'Accueil - Port de Plaisance',
    error_msg
  });
});

module.exports = router;
