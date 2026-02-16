/**
 * @file Modèle Catway pour gérer les pontons
 * @module models/Catway
 * @description Définit la structure d'un catway (ponton) dans MongoDB
 */

const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour les catways
 * @typedef {Object} CatwaySchema
 * @property {string} catwayNumber - Numéro unique du catway (ex: A1, B2)
 * @property {string} type - Type du catway (long ou short)
 * @property {string} catwayState - État actuel du catway
 * @property {Date} createdAt - Date de création (ajouté automatiquement)
 * @property {Date} updatedAt - Date de dernière modification (ajouté automatiquement)
 */

// Créer le schéma (structure des données)
const catwaySchema = new mongoose.Schema({
  // Numéro du catway (A1, B2, etc.)
  catwayNumber: {
    type: String,
    required: true,  // Champ obligatoire
    unique: true     // Doit être unique (pas de doublon)
  },
  // Type du catway
  type: {
    type: String,
    required: true,
    enum: ['long', 'short'],  // Valeurs autorisées
    default: 'long'
  },
  // État du catway
  catwayState: {
    type: String,
    required: true,
    default: 'Bon état'
  }
}, {
  timestamps: true  // Ajoute automatiquement createdAt et updatedAt
});

// Exporter le modèle pour l'utiliser dans les routes
module.exports = mongoose.model('Catway', catwaySchema);
