/**
 * Trajectory Controller
 * Handles trajectory calculation and simulation requests
 */

const Trajectory = require('../models/Trajectory');
const orbitalCalcService = require('../services/orbitalCalcService');

/**
 * Calculate launch trajectory
 */
const calculateTrajectory = async (req, res) => {
  try {
    const {
      name,
      launchLat,
      launchLong,
      targetAltitude,
      inclination,
      azimuth
    } = req.body;

    // Validate required fields
    if (!launchLat || !launchLong || !targetAltitude || !inclination) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: launchLat, launchLong, targetAltitude, inclination'
      });
    }

    // Validate ranges
    if (launchLat < -90 || launchLat > 90) {
      return res.status(400).json({
        success: false,
        error: 'Latitude must be between -90 and 90'
      });
    }

    if (launchLong < -180 || launchLong > 180) {
      return res.status(400).json({
        success: false,
        error: 'Longitude must be between -180 and 180'
      });
    }

    if (targetAltitude < 100 || targetAltitude > 40000) {
      return res.status(400).json({
        success: false,
        error: 'Target altitude must be between 100 and 40000 km'
      });
    }

    // Calculate trajectory using orbital mechanics service
    const trajectoryParams = {
      launchLat,
      launchLong,
      targetAltitude,
      inclination,
      azimuth: azimuth || 90 // Default eastward launch
    };

    const result = orbitalCalcService.calculateLaunchTrajectory(trajectoryParams);

    // Save trajectory to database
    const trajectory = new Trajectory({
      name: name || `Trajectory ${new Date().toISOString()}`,
      launchDate: new Date(),
      parameters: {
        launchLat,
        launchLong,
        targetAltitude,
        inclination,
        azimuth: azimuth || 90,
        launchAngle: 45 // Typical launch angle
      },
      trajectoryPoints: result.trajectoryPoints,
      status: 'COMPLETED',
      results: result.results
    });

    await trajectory.save();

    res.json({
      success: true,
      data: {
        trajectory: trajectory.toObject(),
        calculated: result
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get all trajectories
 */
const getAllTrajectories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const trajectories = await Trajectory.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Trajectory.countDocuments();

    res.json({
      success: true,
      data: trajectories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get trajectory by ID
 */
const getTrajectoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const trajectory = await Trajectory.findById(id);

    if (!trajectory) {
      return res.status(404).json({
        success: false,
        error: 'Trajectory not found'
      });
    }

    res.json({
      success: true,
      data: trajectory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Delete trajectory
 */
const deleteTrajectory = async (req, res) => {
  try {
    const { id } = req.params;
    const trajectory = await Trajectory.findByIdAndDelete(id);

    if (!trajectory) {
      return res.status(404).json({
        success: false,
        error: 'Trajectory not found'
      });
    }

    res.json({
      success: true,
      message: 'Trajectory deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get trajectory visualization data (simplified for frontend)
 */
const getTrajectoryVisualization = async (req, res) => {
  try {
    const { id } = req.params;
    const trajectory = await Trajectory.findById(id);

    if (!trajectory) {
      return res.status(404).json({
        success: false,
        error: 'Trajectory not found'
      });
    }

    // Extract just the coordinates for visualization
    const points = trajectory.trajectoryPoints.map(point => ({
      x: point.x,
      y: point.y,
      z: point.z,
      altitude: point.altitude,
      velocity: point.velocity
    }));

    res.json({
      success: true,
      data: {
        id: trajectory._id,
        name: trajectory.name,
        parameters: trajectory.parameters,
        results: trajectory.results,
        points
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  calculateTrajectory,
  getAllTrajectories,
  getTrajectoryById,
  deleteTrajectory,
  getTrajectoryVisualization
};

