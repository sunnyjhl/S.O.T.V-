/**
 * Database Seed Script
 * Seeds the database with sample satellite data
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Satellite = require('../models/Satellite');
const sampleSatellites = require('./sampleSatellites');

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Satellite.deleteMany({});
    console.log('Cleared existing satellite data');

    // Insert sample satellites
    await Satellite.insertMany(sampleSatellites);
    console.log(`Successfully seeded ${sampleSatellites.length} satellites`);

    // Display summary
    const leoCount = await Satellite.countDocuments({ orbitType: 'LEO' });
    const meoCount = await Satellite.countDocuments({ orbitType: 'MEO' });
    const geoCount = await Satellite.countDocuments({ orbitType: 'GEO' });
    const polarCount = await Satellite.countDocuments({ orbitType: 'POLAR' });

    console.log('\nSatellite Summary:');
    console.log(`  LEO: ${leoCount}`);
    console.log(`  MEO: ${meoCount}`);
    console.log(`  GEO: ${geoCount}`);
    console.log(`  Polar: ${polarCount}`);
    console.log(`  Total: ${await Satellite.countDocuments()}`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

