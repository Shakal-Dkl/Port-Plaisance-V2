/**
 * @file Modèle User pour gérer les utilisateurs
 * @module models/User
 * @description Définit la structure d'un utilisateur dans MongoDB avec authentification
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schéma Mongoose pour les utilisateurs
 * @typedef {Object} UserSchema
 * @property {string} name - Nom de l'utilisateur
 * @property {string} email - Email unique de l'utilisateur (en minuscules)
 * @property {string} password - Mot de passe hashé de l'utilisateur
 * @property {Date} createdAt - Date de création (ajouté automatiquement)
 * @property {Date} updatedAt - Date de dernière modification (ajouté automatiquement)
 */

// Créer le schéma (structure des données)
const userSchema = new mongoose.Schema({
  // Nom de l'utilisateur
  name: {
    type: String,
    required: true
  },
  // Email (unique pour chaque utilisateur)
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true  // Convertir en minuscules
  },
  // Mot de passe (sera hashé automatiquement)
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true  // Ajoute automatiquement createdAt et updatedAt
});

/**
 * Middleware pre-save pour hasher le mot de passe avant de sauvegarder
 * @memberof UserSchema
 * @param {Function} next - Fonction callback pour continuer
 */
userSchema.pre('save', async function(next) {
  // Si le mot de passe n'a pas été modifié, continuer
  if (!this.isModified('password')) {
    return next();
  }
  // Hasher le mot de passe avec bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Comparer le mot de passe fourni avec le mot de passe hashé
 * @memberof UserSchema
 * @param {string} candidatePassword - Le mot de passe à vérifier
 * @returns {Promise<boolean>} True si le mot de passe correspond, false sinon
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exporter le modèle
module.exports = mongoose.model('User', userSchema);
