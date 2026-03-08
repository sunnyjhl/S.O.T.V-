/**
 * Satellite Model
 * Mongoose schema for satellite data including TLE and orbital elements
 */

const mongoose = require('mongoose');

const satelliteSchema = new mongoose.Schema({
  noradId: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  tle: {
    line1: {
      type: String,
      required: true
    },
    line2: {
      type: String,
      required: true
    }
  },
  orbitType: {
    type: String,
    enum: ['LEO', 'MEO', 'GEO', 'POLAR', 'SUN_SYNCHRONOUS', 'ELLIPTICAL'],
    required: true,
    index: true
  },
  launchDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'DECAYED', 'PAYLOAD', 'ROCKET BODY', 'UNKNOWN'],
    default: 'ACTIVE'
  },
  details: {
    altitude: Number,        // Current altitude in km
    inclination: Number,     // Orbital inclination in degrees
    eccentricity: Number,   // Orbital eccentricity
    period: Number,          // Orbital period in minutes
    apogee: Number,          // Apogee altitude in km
    perigee: Number,         // Perigee altitude in km
    semiMajorAxis: Number,   // Semi-major axis in km
    raan: Number,            // Right Ascension of Ascending Node (degrees)
    argumentOfPerigee: Number,
    meanAnomaly: Number
  },
  category: {
    type: String,
    enum: ['COMMUNICATIONS', 'EARTH_OBSERVATION', 'SCIENTIFIC', 'NAVIGATION', 'WEATHER', 'MILITARY', 'AMATEUR', 'OTHER'],
    default: 'OTHER'
  },
  country: {
    type: String,
    default: 'Unknown'
  }
}, {
  timestamps: true
});

// Text index for search
satelliteSchema.index({ name: 'text', noradId: 'text' });

// Virtual for calculating current position
satelliteSchema.virtual('position').get(function() {
  return this.details;
});

module.exports = mongoose.model('Satellite', satelliteSchema);

