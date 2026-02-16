/**
 * @file Middleware d'authentification
 * @module middleware/auth
 * @description Fonctions middleware pour vérifier l'authentification des utilisateurs
 */

/**
 * Middleware pour vérifier si l'utilisateur est authentifié
 * @function isAuthenticated
 * @param {Object} req - Objet requête Express contenant la session
 * @param {Object} res - Objet réponse Express
 * @param {Function} next - Fonction callback pour passer au middleware suivant
 * @returns {void} Redirige vers la page d'accueil si non authentifié, sinon continue
 * @example
 * // Utiliser le middleware dans une route
 * router.get('/dashboard', isAuthenticated, (req, res) => {
 *   res.render('dashboard');
 * });
 */
const isAuthenticated = (req, res, next) => {
  // On vérifie si la session existe ET si elle contient un utilisateur
  if (req.session && req.session.user) {
    // Si oui, on continue vers la route demandée
    return next();
  }
  // Si non, on redirige vers la page de connexion
  res.redirect('/');
};

// Exporter la fonction pour l'utiliser dans les autres fichiers
module.exports = {
  isAuthenticated
};
