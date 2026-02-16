/**
 * @file Modèle Reservation pour gérer les réservations
 * @module models/Reservation
 * @description Définit la structure d'une réservation de catway dans MongoDB
 */

const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour les réservations
 * @typedef {Object} ReservationSchema
 * @property {string} catwayNumber - Numéro du catway réservé
 * @property {string} clientName - Nom du client
 * @property {string} boatName - Nom du bateau
 * @property {Date} checkIn - Date d'arrivée
 * @property {Date} checkOut - Date de départ
 * @property {Date} createdAt - Date de création (ajouté automatiquement)
 * @property {Date} updatedAt - Date de dernière modification (ajouté automatiquement)
 */

// Créer le schéma (structure des données)
const reservationSchema = new mongoose.Schema({
  // Numéro du catway réservé
  catwayNumber: {
    type: String,
    required: true
  },
  // Nom du client
  clientName: {
    type: String,
    required: true
  },
  // Nom du bateau
  boatName: {
    type: String,
    required: true
  },
  // Date d'arrivée
  checkIn: {
    type: Date,
    required: true
  },
  // Date de départ
  checkOut: {
    type: Date,
    required: true
  }
}, {
  timestamps: true  // Ajoute automatiquement createdAt et updatedAt
});

// Exporter le modèle
module.exports = mongoose.model('Reservation', reservationSchema);
