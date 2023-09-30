import { Sequelize } from 'sequelize';
import config from '../config';
import Airport from './models/Airport';
import AircraftType from './models/AircraftType'
import Aircraft from './models/Aircraft';
import Photo from './models/Photo';
import AircraftPhoto from './models/AircraftPhoto';

const sequelize = new Sequelize(`postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/spotting`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

Airport.initialize(sequelize);
AircraftType.initialize(sequelize);
Aircraft.initialize(sequelize);
Photo.initialize(sequelize);
AircraftPhoto.initialize(sequelize);


export {
  Photo,
  Airport,
  Aircraft,
  AircraftType,
  AircraftPhoto,
  sequelize as conn,
}

