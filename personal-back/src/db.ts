import { Sequelize } from 'sequelize';
import config from '../config';
import Airport from './models/Airport';
import AircraftType from './models/AircraftType'
import Aircraft from './models/Aircraft';
import Photo from './models/Photo';
//import AircraftPhoto from './models/AircraftPhoto';
import Airline from './models/Airline';

const sequelize: Sequelize = new Sequelize(`postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/spotting`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

Airport.initialize(sequelize);
AircraftType.initialize(sequelize);
Aircraft.initialize(sequelize);
Photo.initialize(sequelize);
//AircraftPhoto.initialize(sequelize);
Airline.initialize(sequelize);

Aircraft.hasMany(Photo, { foreignKey: 'aircraft_Id' });
Photo.belongsTo(Aircraft, { foreignKey: 'aircraft_Id' });

AircraftType.hasMany(Aircraft, { foreignKey: 'aircraft_type_id' });
Aircraft.belongsTo(AircraftType, { foreignKey: 'aircraft_type_id' });

Airline.hasMany(Aircraft, { foreignKey: 'airline_id' });
Aircraft.belongsTo(Airline, { foreignKey: 'airline_id' });

Airport.hasMany(Photo, { foreignKey: 'airport_id' });
Photo.belongsTo(Airport, { foreignKey: 'airport_id' });

export {
  Photo,
  Airline,
  Airport,
  Aircraft,
  AircraftType,
  //AircraftPhoto,
  sequelize as conn,
}

