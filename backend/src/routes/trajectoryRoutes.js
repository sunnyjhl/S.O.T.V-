/**
 * Trajectory Routes
 * API routes for trajectory calculation endpoints
 */

const express = require('express');
const router = express.Router();
const trajectoryController = require('../controllers/trajectoryController');

/**
 * @route   POST /api/trajectory/calculate
 * @desc    Calculate launch trajectory
 * @access  Public
 */
router.post('/calculate', trajectoryController.calculateTrajectory);

/**
 * @route   GET /api/trajectory
 * @desc    Get all trajectories
 * @access  Public
 */
router.get('/', trajectoryController.getAllTrajectories);

/**
 * @route   GET /api/trajectory/:id
 * @desc    Get trajectory by ID
 * @access  Public
 */
router.get('/:id', trajectoryController.getTrajectoryById);

/**
 * @route   GET /api/trajectory/:id/visualization
 * @desc    Get trajectory visualization data
 * @access  Public
 */
router.get('/:id/visualization', trajectoryController.getTrajectoryVisualization);

/**
 * @route   DELETE /api/trajectory/:id
 * @desc    Delete trajectory
 * @access  Public
 */
router.delete('/:id', trajectoryController.deleteTrajectory);

module.exports = router;

