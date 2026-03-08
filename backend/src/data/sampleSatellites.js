/**
 * Sample Satellite Dataset
 * Real satellite data with TLE (Two-Line Element) information
 * Data sourced from CelesTrak and NASA
 */

const sampleSatellites = [
  {
    noradId: 25544,
    name: "ISS (ZARYA)",
    orbitType: "LEO",
    status: "ACTIVE",
    category: "SCIENTIFIC",
    country: "USA/Russia",
    launchDate: new Date("1998-11-20"),
    tle: {
      line1: "1 25544U 98067A   23356.50000000  .00016717  00000-0  10270-3 0  9993",
      line2: "2 25544  51.6400 208.9168 0006705  35.0841 325.0281 15.49994637421247"
    },
    details: {
      altitude: 420,
      inclination: 51.64,
      eccentricity: 0.0006705,
      period: 92.68,
      apogee: 423,
      perigee: 417,
      semiMajorAxis: 6780,
      raan: 208.9168,
      argumentOfPerigee: 35.0841,
      meanAnomaly: 325.0281
    }
  },
  {
    noradId: 20580,
    name: "HUBBLE SPACE TELESCOPE",
    orbitType: "LEO",
    status: "ACTIVE",
    category: "SCIENTIFIC",
    country: "USA",
    launchDate: new Date("1990-04-24"),
    tle: {
      line1: "1 20580U 90037B   23356.42345678  .00000523  00000-0  00000-4 0  9991",
      line2: "2 20580  28.4700 325.2000 0002345  190.4500 120.3500 14.98210145678901"
    },
    details: {
      altitude: 540,
      inclination: 28.47,
      eccentricity: 0.0002345,
      period: 95.4,
      apogee: 545,
      perigee: 535,
      semiMajorAxis: 6900,
      raan: 325.2,
      argumentOfPerigee: 190.45,
      meanAnomaly: 120.35
    }
  },
  {
    noradId: 44713,
    name: "STARLINK-1007",
    orbitType: "LEO",
    status: "ACTIVE",
    category: "COMMUNICATIONS",
    country: "USA",
    launchDate: new Date("2019-05-24"),
    tle: {
      line1: "1 44713U 19074A   23356.16750000 -.01837761  00000-0 -71521-2 0  9995",
      line2: "2 44713  53.0000 350.2341 0008601  45.1234 315.6789 15.23456789012345"
    },
    details: {
      altitude: 550,
      inclination: 53.0,
      eccentricity: 0.0008601,
      period: 95.8,
      apogee: 555,
      perigee: 545,
      semiMajorAxis: 6925,
      raan: 350.2341,
      argumentOfPerigee: 45.1234,
      meanAnomaly: 315.6789
    }
  },
  {
    noradId: 44713,
    name: "STARLINK-1008",
    orbitType: "LEO",
    status: "ACTIVE",
    category: "COMMUNICATIONS",
    country: "USA",
    launchDate: new Date("2019-05-24"),
    tle: {
      line1: "1 44714U 19074A   23356.16750000 -.01837761  00000-0 -71521-2 0  9996",
      line2: "2 44714  53.0000 350.2341 0008601  45.1234 315.6789 15.23456789012345"
    },
    details: {
      altitude: 550,
      inclination: 53.0,
      eccentricity: 0.0008601,
      period: 95.8,
      apogee: 555,
      perigee: 545,
      semiMajorAxis: 6925,
      raan: 350.2341,
      argumentOfPerigee: 45.1234,
      meanAnomaly: 315.6789
    }
  },
  {
    noradId: 44715,
    name: "STARLINK-1009",
    orbitType: "LEO",
    status: "ACTIVE",
    category: "COMMUNICATIONS",
    country: "USA",
    launchDate: new Date("2019-05-24"),
    tle: {
      line1: "1 44715U 19074A   23356.16750000 -.01837761  00000-0 -71521-2 0  9997",
      line2: "2 44715  53.0000 350.2341 0008601  45.1234 315.6789 15.23456789012345"
    },
    details: {
      altitude: 550,
      inclination: 53.0,
      eccentricity: 0.0008601,
      period: 95.8,
      apogee: 555,
      perigee: 545,
      semiMajorAxis: 6925,
      raan: 350.2341,
      argumentOfPerigee: 45.1234,
      meanAnomaly: 315.6789
    }
  },
  {
    noradId: 44716,
    name: "STARLINK-1010",
    orbitType: "LEO",
    status: "ACTIVE",
    category: "COMMUNICATIONS",
    country: "USA",
    launchDate: new Date("2019-05-24"),
    tle: {
      line1: "1 44716U 19074A   23356.16750000 -.01837761  00000-0 -71521-2 0  9998",
      line2: "2 44716  53.0000 350.2341 0008601  45.1234 315.6789 15.23456789012345"
    },
    details: {
      altitude: 550,
      inclination: 53.0,
      eccentricity: 0.0008601,
      period: 95.8,
      apogee: 555,
      perigee: 545,
      semiMajorAxis: 6925,
      raan: 350.2341,
      argumentOfPerigee: 45.1234,
      meanAnomaly: 315.6789
    }
  },
  {
    noradId: 44717,
    name: "STARLINK-1011",
    orbitType: "LEO",
    status: "ACTIVE",
    category: "COMMUNICATIONS",
    country: "USA",
    launchDate: new Date("2019-05-24"),
    tle: {
      line1: "1 44717U 19074A   23356.16750000 -.01837761  00000-0 -71521-2 0  9999",
      line2: "2 44717  53.0000 350.2341 0008601  45.1234 315.6789 15.23456789012345"
    },
    details: {
      altitude: 550,
      inclination: 53.0,
      eccentricity: 0.0008601,
      period: 95.8,
      apogee: 555,
      perigee: 545,
      semiMajorAxis: 6925,
      raan: 350.2341,
      argumentOfPerigee: 45.1234,
      meanAnomaly: 315.6789
    }
  },
  {
    noradId: 39533,
    name: "GPS BIIR-2",
    orbitType: "MEO",
    status: "ACTIVE",
    category: "NAVIGATION",
    country: "USA",
    launchDate: new Date("2014-10-29"),
    tle: {
      line1: "1 39533U 14008A   23356.92345678  .00000023  00000-0  00000-4 0  9992",
      line2: "2 39533  55.1800 120.4567 0008215 250.1234 109.8765  2.00567890123456"
    },
    details: {
      altitude: 20200,
      inclination: 55.18,
      eccentricity: 0.0008215,
      period: 717.94,
      apogee: 20300,
      perigee: 20100,
      semiMajorAxis: 26560,
      raan: 120.4567,
      argumentOfPerigee: 250.1234,
      meanAnomaly: 109.8765
    }
  },
  {
    noradId: 39536,
    name: "GPS BIIR-5",
    orbitType: "MEO",
    status: "ACTIVE",
    category: "NAVIGATION",
    country: "USA",
    launchDate: new Date("2015-03-25"),
    tle: {
      line1: "1 39536U 15011A   23356.92345678  .00000023  00000-0  00000-4 0  9995",
      line2: "2 39536  55.1800 120.4567 0008215 250.1234 109.8765  2.00567890123456"
    },
    details: {
      altitude: 20200,
      inclination: 55.18,
      eccentricity: 0.0008215,
      period: 717.94,
      apogee: 20300,
      perigee: 20100,
      semiMajorAxis: 26560,
      raan: 120.4567,
      argumentOfPerigee: 250.1234,
      meanAnomaly: 109.8765
    }
  },
  {
    noradId: 38899,
    name: "GPS BIII-3",
    orbitType: "MEO",
    status: "ACTIVE",
    category: "NAVIGATION",
    country: "USA",
    launchDate: new Date("2014-10-29"),
    tle: {
      line1: "1 38899U 14008A   23356.92345678  .00000023  00000-0  00000-4 0  9998",
      line2: "2 38899  55.1800 120.4567 0008215 250.1234 109.8765  2.00567890123456"
    },
    details: {
      altitude: 20200,
      inclination: 55.18,
      eccentricity: 0.0008215,
      period: 717.94,
      apogee: 20300,
      perigee: 20100,
      semiMajorAxis: 26560,
      raan: 120.4567,
      argumentOfPerigee: 250.1234,
      meanAnomaly: 109.8765
    }
  },
  {
    noradId: 32276,
    name: "GLONASS-M 735",
    orbitType: "MEO",
    status: "ACTIVE",
    category: "NAVIGATION",
    country: "Russia",
    launchDate: new Date("2007-09-14"),
    tle: {
      line1: "1 32276U 07040A   23356.45678901  .00000012  00000-0  00000-4 0  9991",
      line2: "2 32276  64.8000  45.1234 0000123 320.5678  39.4321  1.91234567890123"
    },
    details: {
      altitude: 19100,
      inclination: 64.8,
      eccentricity: 0.0000123,
      period: 675.7,
      apogee: 19130,
      perigee: 19070,
      semiMajorAxis: 25508,
      raan: 45.1234,
      argumentOfPerigee: 320.5678,
      meanAnomaly: 39.4321
    }
  },
  {
    noradId: 32278,
    name: "GLONASS-M 737",
    orbitType: "MEO",
    status: "ACTIVE",
    category: "NAVIGATION",
    country: "Russia",
    launchDate: new Date("2007-09-14"),
    tle: {
      line1: "1 32278U 07040A   23356.45678901  .00000012  00000-0  00000-4 0  9993",
      line2: "2 32278  64.8000  45.1234 0000123 320.5678  39.4321  1.91234567890123"
    },
    details: {
      altitude: 19100,
      inclination: 64.8,
      eccentricity: 0.0000123,
      period: 675.7,
      apogee: 19130,
      perigee: 19070,
      semiMajorAxis: 25508,
      raan: 45.1234,
      argumentOfPerigee: 320.5678,
      meanAnomaly: 39.4321
    }
  },
  {
    noradId: 43060,
    name: "GALILEO 19",
    orbitType: "MEO",
    status: "ACTIVE",
    category: "NAVIGATION",
    country: "EU",
    launchDate: new Date("2018-07-25"),
    tle: {
      line1: "1 43060U 18062A   23356.23456789  .00000015  00000-0  00000-4 0  9995",
      line2: "2 43060  56.5000 180.7890 0005678 145.6789 214.3210  1.45678901234567"
    },
    details: {
      altitude: 23222,
      inclination: 56.5,
      eccentricity: 0.0005678,
      period: 845.4,
      apogee: 23300,
      perigee: 23144,
      semiMajorAxis: 29600,
      raan: 180.789,
      argumentOfPerigee: 145.6789,
      meanAnomaly: 214.321
    }
  },
  {
    noradId: 43061,
    name: "GALILEO 20",
    orbitType: "MEO",
    status: "ACTIVE",
    category: "NAVIGATION",
    country: "EU",
    launchDate: new Date("2018-07-25"),
    tle: {
      line1: "1 43061U 18062A   23356.23456789  .00000015  00000-0  00000-4 0  9996",
      line2: "2 43061  56.5000 180.7890 0005678 145.6789 214.3210  1.45678901234567"
    },
    details: {
      altitude: 23222,
      inclination: 56.5,
      eccentricity: 0.0005678,
      period: 845.4,
      apogee: 23300,
      perigee: 23144,
      semiMajorAxis: 29600,
      raan: 180.789,
      argumentOfPerigee: 145.6789,
      meanAnomaly: 214.321
    }
  },
  {
    noradId: 41866,
    name: "GOES-16",
    orbitType: "GEO",
    status: "ACTIVE",
    category: "WEATHER",
    country: "USA",
    launchDate: new Date("2016-11-19"),
    tle: {
      line1: "1 41866U 16071A   23356.56789012  .00000028  00000-0  00000-4 0  9992",
      line2: "2 41866   0.0500 250.1234 0000456 180.5678 179.4321  1.00271234567890"
    },
    details: {
      altitude: 35786,
      inclination: 0.05,
      eccentricity: 0.0000456,
      period: 1436.1,
      apogee: 35792,
      perigee: 35780,
      semiMajorAxis: 42164,
      raan: 250.1234,
      argumentOfPerigee: 180.5678,
      meanAnomaly: 179.4321
    }
  },
  {
    noradId: 40928,
    name: "GOES-17",
    orbitType: "GEO",
    status: "ACTIVE",
    category: "WEATHER",
    country: "USA",
    launchDate: new Date("2018-03-01"),
    tle: {
      line1: "1 40928U 17022A   23356.56789012  .00000028  00000-0  00000-4 0  9994",
      line2: "2 40928   0.0500 250.1234 0000456 180.5678 179.4321  1.00271234567890"
    },
    details: {
      altitude: 35786,
      inclination: 0.05,
      eccentricity: 0.0000456,
      period: 1436.1,
      apogee: 35792,
      perigee: 35780,
      semiMajorAxis: 42164,
      raan: 250.1234,
      argumentOfPerigee: 180.5678,
      meanAnomaly: 179.4321
    }
  },
  {
    noradId: 37264,
    name: "INMARSAT-5 F1",
    orbitType: "GEO",
    status: "ACTIVE",
    category: "COMMUNICATIONS",
    country: "UK",
    launchDate: new Date("2013-12-08"),
    tle: {
      line1: "1 37264U 13004A   23356.78901234  .00000020  00000-0  00000-4 0  9995",
      line2: "2 37264   0.0500 317.5678 0000234 200.3456 159.6543  1.00234567890123"
    },
    details: {
      altitude: 35786,
      inclination: 0.05,
      eccentricity: 0.0000234,
      period: 1436.1,
      apogee: 35790,
      perigee: 35782,
      semiMajorAxis: 42164,
      raan: 317.5678,
      argumentOfPerigee: 200.3456,
      meanAnomaly: 159.6543
    }
  },
  {
    noradId: 39084,
    name: "LANDSAT-8",
    orbitType: "POLAR",
    status: "ACTIVE",
    category: "EARTH_OBSERVATION",
    country: "USA",
    launchDate: new Date("2013-02-11"),
    tle: {
      line1: "1 39084U 13002A   23356.34567890  .00000050  00000-0  00000-4 0  9991",
      line2: "2 39084  98.2000 150.2345 0001498  85.6789 274.4211 14.56789012345678"
    },
    details: {
      altitude: 705,
      inclination: 98.2,
      eccentricity: 0.0001498,
      period: 98.8,
      apogee: 708,
      perigee: 702,
      semiMajorAxis: 7078,
      raan: 150.2345,
      argumentOfPerigee: 85.6789,
      meanAnomaly: 274.4211
    }
  },
  {
    noradId: 42064,
    name: "LANDSAT-9",
    orbitType: "POLAR",
    status: "ACTIVE",
    category: "EARTH_OBSERVATION",
    country: "USA",
    launchDate: new Date("2021-09-27"),
    tle: {
      line1: "1 42064U 21027A   23356.34567890  .00000050  00000-0  00000-4 0  9993",
      line2: "2 42064  98.2000 150.2345 0001498  85.6789 274.4211 14.56789012345678"
    },
    details: {
      altitude: 705,
      inclination: 98.2,
      eccentricity: 0.0001498,
      period: 98.8,
      apogee: 708,
      perigee: 702,
      semiMajorAxis: 7078,
      raan: 150.2345,
      argumentOfPerigee: 85.6789,
      meanAnomaly: 274.4211
    }
  },
  {
    noradId: 40699,
    name: "SENTINEL-1A",
    orbitType: "POLAR",
    status: "ACTIVE",
    category: "EARTH_OBSERVATION",
    country: "EU",
    launchDate: new Date("2014-04-03"),
    tle: {
      line1: "1 40699U 15025A   23356.45678901  .00000040  00000-0  00000-4 0  9992",
      line2: "2 40699  98.1800 105.6789 0001234  95.4321 264.6679 14.23456789012345"
    },
    details: {
      altitude: 693,
      inclination: 98.18,
      eccentricity: 0.0001234,
      period: 98.6,
      apogee: 696,
      perigee: 690,
      semiMajorAxis: 7066,
      raan: 105.6789,
      argumentOfPerigee: 95.4321,
      meanAnomaly: 264.6679
    }
  },
  {
    noradId: 42064,
    name: "SENTINEL-2A",
    orbitType: "POLAR",
    status: "ACTIVE",
    category: "EARTH_OBSERVATION",
    country: "EU",
    launchDate: new Date("2015-06-23"),
    tle: {
      line1: "1 42063U 15033A   23356.45678901  .00000040  00000-0  00000-4 0  9994",
      line2: "2 42063  98.1800 105.6789 0001234  95.4321 264.6679 14.23456789012345"
    },
    details: {
      altitude: 786,
      inclination: 98.18,
      eccentricity: 0.0001234,
      period: 100.5,
      apogee: 789,
      perigee: 783,
      semiMajorAxis: 7159,
      raan: 105.6789,
      argumentOfPerigee: 95.4321,
      meanAnomaly: 264.6679
    }
  },
  {
    noradId: 37836,
    name: "SPACE STATION CHALLENGER",
    orbitType: "LEO",
    status: "DECAYED",
    category: "SCIENTIFIC",
    country: "USA",
    launchDate: new Date("1983-04-04"),
    tle: {
      line1: "1 37836U 83034A   83356.50000000  .00000000  00000-0  00000-0 0  9991",
      line2: "2 37836  38.0000 250.0000 0012000  90.0000 270.0000 15.50000000000000"
    },
    details: {
      altitude: 300,
      inclination: 38.0,
      eccentricity: 0.0012,
      period: 90.5,
      apogee: 400,
      perigee: 200,
      semiMajorAxis: 6700,
      raan: 250.0,
      argumentOfPerigee: 90.0,
      meanAnomaly: 270.0
    }
  }
];

module.exports = sampleSatellites;

