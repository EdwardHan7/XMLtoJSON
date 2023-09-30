// Import the Mongoose model
const Vehicle = require('../models/vehicle');

// graphql/resolvers.js
const resolvers = {
  Query: {
    // Define a query named 'makes'
    makes: async () => {
      try {
        // Use the Mongoose model to fetch all vehicle makes from the database
        const vehicles = await Vehicle.find();
        return vehicles;
      } catch (error) {
        // Throw an error if fetching vehicles from database fails
        throw new Error('Error fetching vehicles from database.');
      }
    },
  },
};

module.exports = resolvers;
