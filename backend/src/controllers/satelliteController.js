/**
 * Satellite Controller
 * Handles HTTP requests for satellite data
 */

const Satellite = require('../models/Satellite');
const orbitalCalcService = require('../services/orbitalCalcService');
const sampleSatellites = require('../data/sampleSatellites');

/**
 * Get all satellites with pagination
 */
const getAllSatellites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const satellites = await Satellite.find()
      .skip(skip)
      .limit(limit)
      .sort({ noradId: 1 });

    const total = await Satellite.countDocuments();

    res.json({
      success: true,
      data: satellites,
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
 * Get satellite by NORAD ID
 */
const getSatelliteByNoradId = async (req, res) => {
  try {
    const { noradId } = req.params;
    const satellite = await Satellite.findOne({ noradId: parseInt(noradId) });

    if (!satellite) {
      return res.status(404).json({
        success: false,
        error: 'Satellite not found'
      });
    }

    // Calculate current position
    const orbitalElements = {
      semiMajorAxis: satellite.details.semiMajorAxis,
      eccentricity: satellite.details.eccentricity,
      inclination: satellite.details.inclination,
      raan: satellite.details.raan,
      argumentOfPerigee: satellite.details.argumentOfPerigee,
      meanAnomaly: satellite.details.meanAnomaly
    };

    // Get current time offset (simulate real-time)
    const now = new Date();
    const timeOffsetMinutes = (now.getTime() - new Date(satellite.updatedAt).getTime()) / 60000;
    
    const position = orbitalCalcService.calculatePosition(orbitalElements, timeOffsetMinutes);
    const orbitPath = orbitalCalcService.calculateOrbitPath(orbitalElements);

    res.json({
      success: true,
      data: {
        ...satellite.toObject(),
        currentPosition: position,
        orbitPath
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
 * Get satellites by orbit type
 */
const getSatellitesByOrbitType = async (req, res) => {
  try {
    const { orbitType } = req.params;
    
    const validTypes = ['LEO', 'MEO', 'GEO', 'POLAR', 'SUN_SYNCHRONOUS', 'ELLIPTICAL'];
    if (!validTypes.includes(orbitType.toUpperCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid orbit type'
      });
    }

    const satellites = await Satellite.find({ 
      orbitType: orbitType.toUpperCase() 
    });

    res.json({
      success: true,
      data: satellites,
      count: satellites.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Search satellites
 */
const searchSatellites = async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const satellites = await Satellite.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { noradId: { $regex: query } }
      ]
    }).limit(50);

    res.json({
      success: true,
      data: satellites,
      count: satellites.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Seed database with sample satellites
 */
const seedSatellites = async (req, res) => {
  try {
    // Clear existing data
    await Satellite.deleteMany({});

    // Insert sample satellites
    await Satellite.insertMany(sampleSatellites);

    res.json({
      success: true,
      message: `Successfully seeded ${sampleSatellites.length} satellites`,
      count: sampleSatellites.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get all satellites with orbit paths (for 3D visualization)
 */
const getSatellitesForVisualization = async (req, res) => {
  try {
    const { orbitTypes } = req.query;
    
    let filter = {};
    if (orbitTypes) {
      const types = orbitTypes.split(',');
      filter = { orbitType: { $in: types } };
    }

    const satellites = await Satellite.find(filter);

    // Calculate orbit paths for each satellite
    const satellitesWithPaths = satellites.map(satellite => {
      const orbitalElements = {
        semiMajorAxis: satellite.details.semiMajorAxis,
        eccentricity: satellite.details.eccentricity,
        inclination: satellite.details.inclination,
        raan: satellite.details.raan,
        argumentOfPerigee: satellite.details.argumentOfPerigee,
        meanAnomaly: satellite.details.meanAnomaly
      };

      const orbitPath = orbitalCalcService.calculateOrbitPath(orbitalElements);
      
      // Calculate initial position
      const position = orbitalCalcService.calculatePosition(orbitalElements, 0);

      return {
        id: satellite._id,
        noradId: satellite.noradId,
        name: satellite.name,
        orbitType: satellite.orbitType,
        category: satellite.category,
        country: satellite.country,
        details: satellite.details,
        orbitPath,
        currentPosition: position
      };
    });

    res.json({
      success: true,
      data: satellitesWithPaths,
      count: satellitesWithPaths.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get orbital elements for a satellite
 */
const getOrbitalElements = async (req, res) => {
  try {
    const { noradId } = req.params;
    const satellite = await Satellite.findOne({ noradId: parseInt(noradId) });

    if (!satellite) {
      return res.status(404).json({
        success: false,
        error: 'Satellite not found'
      });
    }

    const orbitalElements = {
      semiMajorAxis: satellite.details.semiMajorAxis,
      eccentricity: satellite.details.eccentricity,
      inclination: satellite.details.inclination,
      raan: satellite.details.raan,
      argumentOfPerigee: satellite.details.argumentOfPerigee,
      meanAnomaly: satellite.details.meanAnomaly,
      period: satellite.details.period,
      altitude: satellite.details.altitude
    };

    res.json({
      success: true,
      data: orbitalElements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllSatellites,
  getSatelliteByNoradId,
  getSatellitesByOrbitType,
  searchSatellites,
  seedSatellites,
  getSatellitesForVisualization,
  getOrbitalElements
};

