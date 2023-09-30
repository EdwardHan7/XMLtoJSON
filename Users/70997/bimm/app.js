const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const Vehicle = require('./models/vehicle');
// connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');// Importing GraphQL schema from the schema file located in the graphql directory
const resolvers = require('./graphql/resolvers');// Importing resolvers for handling GraphQL queries from the resolvers file located in the graphql directory
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// Importing node-schedule module to schedule tasks
// const schedule = require('node-schedule');
// Here we're setting up a scheduled task to automatically fetch and process data
// This scheduled job is configured to run at 1:00 AM every day
// 'fetchDataAndProcess' is a function that will handle the data fetching and processing
// Make sure to define the 'fetchDataAndProcess' function before uncommenting and using this code
// schedule.scheduleJob('0 1 * * *', async function() {
//   await fetchDataAndProcess();
// });

// Fetch and process vehicle data from an XML API
app.get('/get-data', async (req, res) => {
  try {
    // Sending GET request to fetch vehicle data in XML format
    const makesResponse = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML');
    const makesJson = await xml2js.parseStringPromise(makesResponse.data);
    const makesData = makesJson.Response.Results[0].AllVehicleMakes;

    if (!Array.isArray(makesData)) {
      return res.status(500).send("Error parsing XML response");
    }

    // Processing the fetched vehicle data
    const makes = makesData.map(make => ({
      makeId: make.Make_ID[0],
      makeName: make.Make_Name[0],
    }));

    // Fetching vehicle types for each make and processing the data
    const promises = makes.slice(0, 10).map(async make => { //Use slice to limit the number of requests to prevent too many requests
      const typesResponse = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${make.makeId}?format=xml`);
      const typesJson = await xml2js.parseStringPromise(typesResponse.data);

      if (typesJson.Response.Results) {
        return {
          ...make,
          vehicleTypes: typesJson.Response.Results[0].VehicleTypesForMakeIds.map(type => ({
            typeId: type.VehicleTypeId[0],
            typeName: type.VehicleTypeName[0],
          })),
        };
      } else {
        return {
          ...make,
          vehicleTypes: []
        };
      }
    });

    // Saving processed data to the database
    const results = await Promise.all(promises);
    for (let data of results) {
      const vehicle = new Vehicle(data);
      await vehicle.save(); 
    }
    res.json(results);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
