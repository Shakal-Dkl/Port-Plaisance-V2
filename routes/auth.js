// =====================================================
// ROUTES D'AUTHENTIFICATION
// Gestion de la connexion et déconnexion
// =====================================================

const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// =====================================================
// CONNEXION (POST)
// URL: POST /auth/login
// =====================================================
router.post('/login', async (req, res) => {
  try {
    // Récupérer les données du formulaire
    const { email, password } = req.body;

    // Rechercher l'utilisateur via le service
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.redirect('/?error=credentials');
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.redirect('/?error=credentials');
    }

    // Créer la session (enregistrer l'utilisateur connecté)
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    // Rediriger vers le tableau de bord
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/?error=server');
  }
});

// =====================================================
// DÉCONNEXION (GET)
// URL: GET /auth/logout
// =====================================================
router.get('/logout', (req, res) => {
  // Détruire la session (déconnecter l'utilisateur)
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
