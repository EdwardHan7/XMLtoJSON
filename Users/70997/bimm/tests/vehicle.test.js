// tests/vehicle.test.js
const Vehicle = require('../models/vehicle');

describe('Vehicle Model', () => {
  it('should be invalid if makeId is empty', done => {
    const vehicle = new Vehicle();

    vehicle.validate(err => {
      expect(err.errors.makeId).toBeTruthy();
      done();
    });
  });

  it('should correctly convert XML data to JSON', done => {
    const xmlData = '<Make_ID>441</Make_ID><Make_Name>Aston Martin</Make_Name>';
    const expectedJson = { makeId: '441', makeName: 'Aston Martin' };
    expect(convertXmlToJson(xmlData)).toEqual(expectedJson);
    done();
  });

  it('should save data to database', async done => {
    const data = { makeId: '441', makeName: 'Aston Martin' };
    const vehicle = new Vehicle(data);
    await vehicle.save();
  
    const foundVehicle = await Vehicle.findOne(data);
    expect(foundVehicle).toBeTruthy();
    expect(foundVehicle.makeId).toBe(data.makeId);
    expect(foundVehicle.makeName).toBe(data.makeName);
  
    done();
  });
});
