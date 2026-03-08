/**
 * Satellite Routes
 * API routes for satellite-related endpoints
 */

const express = require('express');
const router = express.Router();
const satelliteController = require('../controllers/satelliteController');

/**
 * @route   GET /api/satellites
 * @desc    Get all satellites with pagination
 * @access  Public
 */
router.get('/', satelliteController.getAllSatellites);

/**
 * @route   GET /api/satellites/visualization
 * @desc    Get satellites with orbit paths for 3D visualization
 * @access  Public
 */
router.get('/visualization', satelliteController.getSatellitesForVisualization);

/**
 * @route   GET /api/satellites/orbit/:orbitType
 * @desc    Get satellites by orbit type
 * @access  Public
 */
router.get('/orbit/:orbitType', satelliteController.getSatellitesByOrbitType);

/**
 * @route   POST /api/satellites/search
 * @desc    Search satellites by name or NORAD ID
 * @access  Public
 */
router.post('/search', satelliteController.searchSatellites);

/**
 * @route   GET /api/satellites/:noradId
 * @desc    Get satellite by NORAD ID
 * @access  Public
 */
router.get('/:noradId', satelliteController.getSatelliteByNoradId);

/**
 * @route   GET /api/satellites/orbital-elements/:noradId
 * @desc    Get orbital elements for a satellite
 * @access  Public
 */
router.get('/orbital-elements/:noradId', satelliteController.getOrbitalElements);

/**
 * @route   POST /api/satellites/seed
 * @desc    Seed database with sample satellites
 * @access  Public (for development)
 */
router.post('/seed', satelliteController.seedSatellites);

module.exports = router;

