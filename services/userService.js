// =====================================================
// SERVICE USER
// Contient toute la logique métier pour les utilisateurs
// =====================================================

const User = require('../models/User');

/**
 * Service pour gérer les utilisateurs
 */
const userService = {
  /**
   * Créer un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} L'utilisateur créé
   */
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  },

  /**
   * Récupérer tous les utilisateurs
   * @returns {Promise<Array>} Liste des utilisateurs (sans mots de passe)
   */
  async getAllUsers() {
    return await User.find().select('-password');
  },

  /**
   * Récupérer un utilisateur par son ID
   * @param {string} id - ID de l'utilisateur
   * @returns {Promise<Object|null>} L'utilisateur trouvé ou null  (sans mot de passe)
   */
  async getUserById(id) {
    return await User.findById(id).select('-password');
  },

  /**
   * Récupérer un utilisateur par email (pour la connexion)
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise<Object|null>} L'utilisateur trouvé ou null (avec mot de passe)
   */
  async getUserByEmail(email) {
    return await User.findOne({ email });
  },

  /**
   * Mettre à jour un utilisateur
   * @param {string} id - ID de l'utilisateur
   * @param {Object} userData - Nouvelles données
   * @returns {Promise<Object|null>} L'utilisateur mis à jour ou null (sans mot de passe)
   */
  async updateUser(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true }).select('-password');
  },

  /**
   * Supprimer un utilisateur
   * @param {string} id - ID de l'utilisateur
   * @returns {Promise<Object|null>} L'utilisateur supprimé ou null
   */
  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
};

module.exports = userService;
