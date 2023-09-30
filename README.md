XML to JSON Converter

Project Overview
This project is a service created using Node.js that periodically fetches data from an XML API, transforms this data into JSON format, and stores this data in a MongoDB database. The service can also expose the data via a GraphQL endpoint for client querying.

Features
Regularly Fetch XML Data:

Utilizes the node-schedule module to periodically (e.g., daily at 1:00 AM) fetch XML data from a given API.
Convert XML Data to JSON:

Employs the xml2js module to convert the fetched XML data into JSON format.
Store Data in MongoDB:

Uses the mongoose module to store the JSON data in a MongoDB database.
Expose Data via a GraphQL Endpoint:

Uses apollo-server to create a GraphQL service, allowing clients to query data via GraphQL.

Structure
models/: Folder containing the database models.
graphql/: Folder containing the GraphQL schema and resolvers.
tests/: Folder containing the test files.
app.js: The main application file.
