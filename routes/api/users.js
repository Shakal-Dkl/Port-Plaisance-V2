// =====================================================
// API REST POUR LES UTILISATEURS
// Permet de gérer les comptes utilisateurs
// =====================================================

const express = require('express');
const router = express.Router();
const userService = require('../../services/userService');
const { isAuthenticated } = require('../../middleware/auth');

// =====================================================
// CRÉER UN NOUVEL UTILISATEUR (POST)
// URL: POST /api/users
// =====================================================
router.post('/', isAuthenticated, async (req, res) => {
  try {
    // Récupérer les données du formulaire
    const { name, email, password } = req.body;

    // Créer un nouvel utilisateur via le service
    const user = await userService.createUser({ name, email, password });

    // Envoyer une réponse de succès
    res.status(201).json({ 
      success: true, 
      message: 'Utilisateur créé avec succès',
      data: user 
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
// RÉCUPÉRER TOUS LES UTILISATEURS (GET)
// URL: GET /api/users
// =====================================================
router.get('/', isAuthenticated, async (req, res) => {
  try {
    // Chercher tous les utilisateurs via le service
    const users = await userService.getAllUsers();
    
    // Envoyer la liste
    res.json({ 
      success: true, 
      data: users 
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
// RÉCUPÉRER UN UTILISATEUR PAR SON ID (GET)
// URL: GET /api/users/:id
// =====================================================
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    // Chercher l'utilisateur via le service
    const user = await userService.getUserById(req.params.id);
    
    // Si l'utilisateur n'existe pas
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utilisateur non trouvé' 
      });
    }
    
    // Envoyer l'utilisateur
    res.json({ 
      success: true, 
      data: user 
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
// METTRE À JOUR UN UTILISATEUR (PUT)
// URL: PUT /api/users/:id
// =====================================================
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    // Récupérer les nouvelles données
    const { name, email, password } = req.body;

    // Mettre à jour l'utilisateur via le service
    const user = await userService.updateUser(
      req.params.id,
      { name, email, password }
    );

    // Si l'utilisateur n'existe pas
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utilisateur non trouvé' 
      });
    }

    // Envoyer l'utilisateur mis à jour
    res.json({ 
      success: true, 
      message: 'Utilisateur mis à jour',
      data: user 
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
// SUPPRIMER UN UTILISATEUR (DELETE)
// URL: DELETE /api/users/:id
// =====================================================
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    // Supprimer l'utilisateur via le service
    const user = await userService.deleteUser(req.params.id);
    
    // Si l'utilisateur n'existe pas
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utilisateur non trouvé' 
      });
    }
    
    // Envoyer une confirmation
    res.json({ 
      success: true, 
      message: 'Utilisateur supprimé avec succès' 
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
