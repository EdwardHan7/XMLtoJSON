// graphql/schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type VehicleType {
    typeId: String
    typeName: String
  }

  type Make {
    makeId: String
    makeName: String
    vehicleTypes: [VehicleType]
  }

  type Query {
    makes: [Make]
  }
`;

module.exports = typeDefs;
