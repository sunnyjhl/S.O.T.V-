/**
 * Trajectory Model
 * Stores launch trajectory simulations and calculations
 */

const mongoose = require('mongoose');

const trajectoryPointSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  z: Number,
  timestamp: Date,
  altitude: Number,
  velocity: Number
});

const trajectorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  launchDate: {
    type: Date,
    default: Date.now
  },
  parameters: {
    launchLat: {
      type: Number,
      required: true,
      min: -90,
      max: 90
    },
    launchLong: {
      type: Number,
      required: true,
      min: -180,
      max: 180
    },
    targetAltitude: {
      type: Number,
      required: true,
      min: 100,
      max: 40000
    },
    inclination: {
      type: Number,
      required: true,
      min: 0,
      max: 180
    },
    deltaV: Number,
    launchAngle: Number,
    azimuth: Number
  },
  trajectoryPoints: [trajectoryPointSchema],
  status: {
    type: String,
    enum: ['PENDING', 'CALCULATING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
  results: {
    estimatedDuration: Number,  // in seconds
    maxVelocity: Number,       // km/s
    fuelRequired: Number,       // kg
    successProbability: Number  // percentage
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trajectory', trajectorySchema);

