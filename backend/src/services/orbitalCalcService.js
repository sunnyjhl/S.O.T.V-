/**
 * Orbital Calculation Service
 * Implements orbital mechanics calculations based on Kepler's Laws
 * and SGP4 simplified perturbation model concepts
 */

// Physical constants
const EARTH_RADIUS_KM = 6371;          // Earth's average radius in km
const EARTH_MASS_KG = 5.972e24;        // Earth's mass in kg
const GRAVITATIONAL_CONSTANT = 6.67430e-11;  // Gravitational constant (m³/kg/s²)
const MU = 3.986004418e14;             // Standard gravitational parameter (m³/s²)
const MU_KM = 3.986004418e5;           // Standard gravitational parameter (km³/s²)
const SECONDS_PER_DAY = 86400;

/**
 * Calculate orbital period from semi-major axis
 * Based on Kepler's Third Law: T = 2π√(a³/μ)
 * @param {number} semiMajorAxis - Semi-major axis in km
 * @returns {number} Orbital period in minutes
 */
function calculateOrbitalPeriod(semiMajorAxis) {
  // T = 2π√(a³/μ) where μ = 398600.4418 km³/s²
  const periodSeconds = 2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / MU_KM);
  return periodSeconds / 60; // Convert to minutes
}

/**
 * Calculate orbital velocity at a given altitude
 * Vis-viva equation: v = √(μ(2/r - 1/a))
 * @param {number} altitude - Altitude above Earth in km
 * @param {number} semiMajorAxis - Semi-major axis in km
 * @returns {number} Velocity in km/s
 */
function calculateVelocity(altitude, semiMajorAxis) {
  const r = EARTH_RADIUS_KM + altitude;  // Distance from Earth's center
  const velocity = Math.sqrt(MU_KM * (2 / r - 1 / semiMajorAxis));
  return velocity;
}

/**
 * Calculate altitude from orbital period
 * @param {number} periodMinutes - Orbital period in minutes
 * @returns {number} Semi-major axis in km
 */
function calculateSemiMajorAxisFromPeriod(periodMinutes) {
  const periodSeconds = periodMinutes * 60;
  // a = (μ * T² / (4π²))^(1/3)
  const semiMajorAxis = Math.pow(MU_KM * Math.pow(periodSeconds, 2) / (4 * Math.PI * Math.PI), 1/3);
  return semiMajorAxis;
}

/**
 * Calculate altitude from semi-major axis
 * @param {number} semiMajorAxis - Semi-major axis in km
 * @returns {number} Altitude in km (assuming circular orbit)
 */
function calculateAltitude(semiMajorAxis) {
  return semiMajorAxis - EARTH_RADIUS_KM;
}

/**
 * Calculate semi-major axis from altitude
 * @param {number} altitude - Altitude in km
 * @returns {number} Semi-major axis in km
 */
function calculateSemiMajorAxisFromAltitude(altitude) {
  return EARTH_RADIUS_KM + altitude;
}

/**
 * Determine orbit type based on altitude
 * LEO: 200-2000 km
 * MEO: 2000-35786 km
 * GEO: ~35786 km
 * @param {number} altitude - Altitude in km
 * @returns {string} Orbit type
 */
function determineOrbitType(altitude) {
  if (altitude < 2000) {
    return 'LEO';
  } else if (altitude < 35786) {
    return 'MEO';
  } else if (Math.abs(altitude - 35786) < 500) {
    return 'GEO';
  } else {
    return 'MEO'; // Default for higher orbits
  }
}

/**
 * Classify orbit based on inclination
 * Polar: inclination > 80°
 * Sun-synchronous: specific inclinations for particular altitudes
 * @param {number} inclination - Inclination in degrees
 * @param {number} altitude - Altitude in km
 * @returns {string} Orbit classification
 */
function classifyOrbit(inclination, altitude) {
  if (inclination > 80 && inclination < 100) {
    return 'POLAR';
  }
  
  // Check for sun-synchronous orbit conditions
  if (altitude > 500 && altitude < 1000) {
    const sunSyncInclination = 90 + (0.9856 * altitude) / 100;
    if (Math.abs(inclination - sunSyncInclination) < 5) {
      return 'SUN_SYNCHRONOUS';
    }
  }
  
  return determineOrbitType(altitude);
}

/**
 * Calculate orbit path points for visualization
 * @param {Object} orbitalElements - Object containing orbital parameters
 * @returns {Array} Array of [x, y, z] coordinates
 */
function calculateOrbitPath(orbitalElements) {
  const points = [];
  const numPoints = 360;
  
  const {
    semiMajorAxis,
    eccentricity,
    inclination = 0,
    raan = 0,
    argumentOfPerigee = 0
  } = orbitalElements;
  
  // Convert to radians
  const incRad = (inclination * Math.PI) / 180;
  const raanRad = (raan * Math.PI) / 180;
  const argPerigeeRad = (argumentOfPerigee * Math.PI) / 180;
  
  for (let i = 0; i <= numPoints; i++) {
    const trueAnomaly = (i * 2 * Math.PI) / numPoints;
    
    // Calculate radius at this point in the orbit
    const r = (semiMajorAxis * (1 - eccentricity * eccentricity)) / 
              (1 + eccentricity * Math.cos(trueAnomaly));
    
    // Position in orbital plane
    const xOrbital = r * Math.cos(trueAnomaly);
    const yOrbital = r * Math.sin(trueAnomaly);
    
    // Transform to ECI (Earth-Centered Inertial) coordinates
    // First apply argument of perigee rotation
    const x1 = xOrbital * Math.cos(argPerigeeRad) - yOrbital * Math.sin(argPerigeeRad);
    const y1 = xOrbital * Math.sin(argPerigeeRad) + yOrbital * Math.cos(argPerigeeRad);
    
    // Then apply inclination rotation
    const x2 = x1;
    const y2 = y1 * Math.cos(incRad);
    const z2 = y1 * Math.sin(incRad);
    
    // Finally apply RAAN rotation
    const x = x2 * Math.cos(raanRad) - y2 * Math.sin(raanRad);
    const y = x2 * Math.sin(raanRad) + y2 * Math.cos(raanRad);
    const z = z2;
    
    points.push([x, y, z]);
  }
  
  return points;
}

/**
 * Calculate satellite position at a given time
 * Simplified propagation (for visualization purposes)
 * @param {Object} orbitalElements - Orbital parameters
 * @param {number} timeOffsetMinutes - Time offset from epoch in minutes
 * @returns {Object} Position [x, y, z] and velocity
 */
function calculatePosition(orbitalElements, timeOffsetMinutes = 0) {
  const {
    semiMajorAxis,
    eccentricity,
    inclination = 0,
    raan = 0,
    argumentOfPerigee = 0,
    meanAnomaly = 0
  } = orbitalElements;
  
  // Calculate mean motion (radians per minute)
  const periodMinutes = calculateOrbitalPeriod(semiMajorAxis);
  const meanMotion = (2 * Math.PI) / periodMinutes;
  
  // Calculate current mean anomaly
  const currentMeanAnomaly = meanAnomaly + (meanMotion * timeOffsetMinutes);
  
  // Solve Kepler's equation for eccentric anomaly (simplified Newton-Raphson)
  let E = currentMeanAnomaly;
  for (let i = 0; i < 10; i++) {
    E = currentMeanAnomaly + eccentricity * Math.sin(E);
  }
  
  // Calculate true anomaly
  const trueAnomaly = 2 * Math.atan2(
    Math.sqrt(1 + eccentricity) * Math.sin(E / 2),
    Math.sqrt(1 - eccentricity) * Math.cos(E / 2)
  );
  
  // Calculate radius
  const r = (semiMajorAxis * (1 - eccentricity * eccentricity)) / 
            (1 + eccentricity * Math.cos(trueAnomaly));
  
  // Position in orbital plane
  const xOrbital = r * Math.cos(trueAnomaly);
  const yOrbital = r * Math.sin(trueAnomaly);
  
  // Convert to ECI coordinates
  const incRad = (inclination * Math.PI) / 180;
  const raanRad = (raan * Math.PI) / 180;
  const argPerigeeRad = (argumentOfPerigee * Math.PI) / 180;
  
  const x1 = xOrbital * Math.cos(argPerigeeRad) - yOrbital * Math.sin(argPerigeeRad);
  const y1 = xOrbital * Math.sin(argPerigeeRad) + yOrbital * Math.cos(argPerigeeRad);
  
  const x2 = x1;
  const y2 = y1 * Math.cos(incRad);
  const z2 = y1 * Math.sin(incRad);
  
  const x = x2 * Math.cos(raanRad) - y2 * Math.sin(raanRad);
  const y = x2 * Math.sin(raanRad) + y2 * Math.cos(raanRad);
  const z = z2;
  
  // Calculate velocity
  const velocity = calculateVelocity(r - EARTH_RADIUS_KM, semiMajorAxis);
  
  return {
    position: [x, y, z],
    velocity,
    altitude: r - EARTH_RADIUS_KM,
    trueAnomaly: (trueAnomaly * 180) / Math.PI
  };
}

/**
 * Calculate trajectory for launch simulation
 * @param {Object} params - Launch parameters
 * @returns {Object} Trajectory results
 */
function calculateLaunchTrajectory(params) {
  const {
    launchLat,
    launchLong,
    targetAltitude,
    inclination
  } = params;
  
  // Calculate required delta-V (simplified)
  // For circular orbit: Δv = √(μ/r1) * (√(2r2/(r1+r2)) - 1)
  const r1 = EARTH_RADIUS_KM + 0;  // Launch from surface
  const r2 = EARTH_RADIUS_KM + targetAltitude;
  
  // Initial circular orbit velocity at launch altitude (before thrust)
  const vCircular = Math.sqrt(MU_KM / r1);
  
  // Velocity needed for transfer orbit
  const vTransfer = Math.sqrt(MU_KM * (2 / r2 - 1 / ((r1 + r2) / 2)));
  
  // Delta-V for injection into transfer orbit
  const deltaVTransfer = vTransfer - vCircular;
  
  // Delta-V for circularization at target orbit
  const vTargetCircular = Math.sqrt(MU_KM / r2);
  const deltaVCircularize = vTargetCircular - vTransfer;
  
  const totalDeltaV = deltaVTransfer + deltaVCircularize;
  
  // Estimate duration
  // Hohmann transfer time: T = π√(a³/μ) where a = (r1 + r2) / 2
  const transferSemiMajor = (r1 + r2) / 2;
  const transferTimeSeconds = Math.PI * Math.sqrt(Math.pow(transferSemiMajor, 3) / MU_KM);
  const totalDuration = 2 * transferTimeSeconds;
  
  // Generate trajectory points
  const points = [];
  const numPoints = 50;
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const progressTime = t * totalDuration;
    
    // Simplified elliptical transfer orbit
    const r = r1 + (r2 - r1) * Math.sin((t * Math.PI) / 2);
    const angle = t * Math.PI * (1 + inclination / 180);
    
    points.push({
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
      altitude: r - EARTH_RADIUS_KM,
      velocity: vCircular + t * (vTargetCircular - vCircular),
      timestamp: new Date(Date.now() + progressTime * 1000)
    });
  }
  
  // Calculate fuel requirement (approximate)
  // Tsiolkovsky rocket equation: Δv = Isp * g0 * ln(m0/m1)
  const Isp = 350; // Specific impulse in seconds (typical upper stage)
  const g0 = 9.81;
  const massRatio = Math.exp(totalDeltaV / (Isp * g0));
  const fuelMass = 5000 * (massRatio - 1); // Assuming 5000 kg dry mass
  
  return {
    trajectoryPoints: points,
    results: {
      estimatedDuration: totalDuration,
      maxVelocity: vTargetCircular,
      fuelRequired: Math.max(0, fuelMass),
      successProbability: 95 - Math.abs(inclination - 90) * 0.5 // Simplified
    }
  };
}

/**
 * Parse TLE (Two-Line Element) data
 * @param {string} line1 - TLE line 1
 * @param {string} line2 - TLE line 2
 * @returns {Object} Orbital elements
 */
function parseTLE(line1, line2) {
  try {
    // Extract inclination (degrees)
    const inclination = parseFloat(line2.substring(8, 16));
    
    // Extract RAAN (degrees)
    const raan = parseFloat(line2.substring(17, 25));
    
    // Extract eccentricity (remove decimal point)
    const eccentricity = parseFloat('0.' + line2.substring(26, 33));
    
    // Extract argument of perigee (degrees)
    const argumentOfPerigee = parseFloat(line2.substring(34, 42));
    
    // Extract mean anomaly (degrees)
    const meanAnomaly = parseFloat(line2.substring(43, 51));
    
    // Extract mean motion (revolutions per day)
    const meanMotion = parseFloat(line2.substring(52, 63));
    
    // Calculate semi-major axis from mean motion
    // n = √(μ/a³) where n is in rad/s
    const n = meanMotion * 2 * Math.PI / SECONDS_PER_DAY;
    const semiMajorAxis = Math.pow(MU_KM / (n * n), 1/3);
    
    // Calculate orbital period
    const period = 1440 / meanMotion; // minutes
    
    // Calculate altitude (assuming circular)
    const altitude = semiMajorAxis - EARTH_RADIUS_KM;
    
    return {
      inclination,
      raan,
      eccentricity,
      argumentOfPerigee,
      meanAnomaly,
      meanMotion,
      semiMajorAxis,
      period,
      altitude
    };
  } catch (error) {
    console.error('Error parsing TLE:', error);
    return null;
  }
}

/**
 * Convert geodetic coordinates to ECEF
 * @param {number} lat - Latitude in degrees
 * @param {number} lon - Longitude in degrees
 * @param {number} alt - Altitude in km
 * @returns {Array} [x, y, z] in km
 */
function geodeticToECEF(lat, lon, alt) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  
  // WGS84 ellipsoid parameters
  const a = 6378.137; // Semi-major axis in km
  const f = 1 / 298.257223563;
  const b = a * (1 - f); // Semi-minor axis
  const e2 = 1 - (b * b) / (a * a);
  
  const N = a / Math.sqrt(1 - e2 * Math.sin(latRad) * Math.sin(latRad));
  
  const x = (N + alt) * Math.cos(latRad) * Math.cos(lonRad);
  const y = (N + alt) * Math.cos(latRad) * Math.sin(lonRad);
  const z = (N * (1 - e2) + alt) * Math.sin(latRad);
  
  return [x, y, z];
}

/**
 * Convert ECEF to geodetic coordinates
 * @param {number} x - X coordinate in km
 * @param {number} y - Y coordinate in km
 * @param {number} z - Z coordinate in km
 * @returns {Object} {lat, lon, alt}
 */
function ecefToGeodetic(x, y, z) {
  const a = 6378.137;
  const f = 1 / 298.257223563;
  const e2 = 2 * f - f * f;
  
  const lon = Math.atan2(y, x);
  const p = Math.sqrt(x * x + y * y);
  
  let lat = Math.atan2(z, p * (1 - e2));
  let N;
  
  for (let i = 0; i < 5; i++) {
    N = a / Math.sqrt(1 - e2 * Math.sin(lat) * Math.sin(lat));
    lat = Math.atan2(z + e2 * N * Math.sin(lat), p);
  }
  
  const alt = p / Math.cos(lat) - N;
  
  return {
    lat: (lat * 180) / Math.PI,
    lon: (lon * 180) / Math.PI,
    alt
  };
}

module.exports = {
  calculateOrbitalPeriod,
  calculateVelocity,
  calculateSemiMajorAxisFromPeriod,
  calculateAltitude,
  calculateSemiMajorAxisFromAltitude,
  determineOrbitType,
  classifyOrbit,
  calculateOrbitPath,
  calculatePosition,
  calculateLaunchTrajectory,
  parseTLE,
  geodeticToECEF,
  ecefToGeodetic,
  EARTH_RADIUS_KM,
  MU_KM
};

