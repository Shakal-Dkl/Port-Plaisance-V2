// =====================================================
// SERVICE RESERVATION
// Contient toute la logique métier pour les réservations
// =====================================================

const Reservation = require('../models/Reservation');

/**
 * Service pour gérer les réservations
 */
const reservationService = {
  /**
   * Créer une nouvelle réservation
   * @param {Object} reservationData - Données de la réservation
   * @returns {Promise<Object>} La réservation créée
   */
  async createReservation(reservationData) {
    const reservation = new Reservation(reservationData);
    return await reservation.save();
  },

  /**
   * Récupérer toutes les réservations
   * @returns {Promise<Array>} Liste des réservations
   */
  async getAllReservations() {
    return await Reservation.find().sort({ checkIn: -1 });
  },

  /**
   * Récupérer une réservation par son ID
   * @param {string} id - ID de la réservation
   * @returns {Promise<Object|null>} La réservation trouvée ou null
   */
  async getReservationById(id) {
    return await Reservation.findById(id);
  },

  /**
   * Récupérer les réservations d'un catway
   * @param {string} catwayNumber - Numéro du catway
   * @returns {Promise<Array>} Liste des réservations du catway
   */
  async getReservationsByCatway(catwayNumber) {
    return await Reservation.find({ catwayNumber }).sort({ checkIn: -1 });
  },

  /**
   * Mettre à jour une réservation
   * @param {string} id - ID de la réservation
   * @param {Object} reservationData - Nouvelles données
   * @returns {Promise<Object|null>} La réservation mise à jour ou null
   */
  async updateReservation(id, reservationData) {
    return await Reservation.findByIdAndUpdate(id, reservationData, { new: true });
  },

  /**
   * Supprimer une réservation
   * @param {string} id - ID de la réservation
   * @returns {Promise<Object|null>} La réservation supprimée ou null
   */
  async deleteReservation(id) {
    return await Reservation.findByIdAndDelete(id);
  }
};

module.exports = reservationService;
