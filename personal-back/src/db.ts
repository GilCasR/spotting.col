import { Sequelize } from 'sequelize';
import config from '../config';
const fs = require('fs');
const path = require('path');
import Airport from './models/Airport';

const sequelize = new Sequelize(`postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/spotting`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

Airport.initialize(sequelize);

export {
  Airport,
  sequelize as conn,
}

