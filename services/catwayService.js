// =====================================================
// SERVICE CATWAY
// Contient toute la logique métier pour les catways
// =====================================================

const Catway = require('../models/Catway');

/**
 * Service pour gérer les catways
 */
const catwayService = {
  /**
   * Créer un nouveau catway
   * @param {Object} catwayData - Données du catway
   * @returns {Promise<Object>} Le catway créé
   */
  async createCatway(catwayData) {
    const catway = new Catway(catwayData);
    return await catway.save();
  },

  /**
   * Récupérer tous les catways
   * @returns {Promise<Array>} Liste des catways
   */
  async getAllCatways() {
    return await Catway.find().sort({ catwayNumber: 1 });
  },

  /**
   * Récupérer un catway par son ID
   * @param {string} id - ID du catway
   * @returns {Promise<Object|null>} Le catway trouvé ou null
   */
  async getCatwayById(id) {
    return await Catway.findById(id);
  },

  /**
   * Mettre à jour un catway complètement (PUT)
   * @param {string} id - ID du catway
   * @param {Object} catwayData - Nouvelles données
   * @returns {Promise<Object|null>} Le catway mis à jour ou null
   */
  async updateCatway(id, catwayData) {
    return await Catway.findByIdAndUpdate(id, catwayData, { new: true });
  },

  /**
   * Mettre à jour un catway partiellement (PATCH)
   * @param {string} id - ID du catway
   * @param {Object} updates - Champs à mettre à jour
   * @returns {Promise<Object|null>} Le catway mis à jour ou null
   */
  async patchCatway(id, updates) {
    return await Catway.findByIdAndUpdate(id, updates, { new: true });
  },

  /**
   * Supprimer un catway
   * @param {string} id - ID du catway
   * @returns {Promise<Object|null>} Le catway supprimé ou null
   */
  async deleteCatway(id) {
    return await Catway.findByIdAndDelete(id);
  }
};

module.exports = catwayService;
