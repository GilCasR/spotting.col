import { Sequelize, Model, DataTypes } from "sequelize";
import { 
  Photo,
  Airline
} from "../db";


interface Runways {
  length_ft: number;
  length_m: number;
  nameA: string;
  nameB: string;    
}

interface Models {
  PhotoModel: typeof Photo
  AirlineModel: typeof Airline
}

interface AirportAttributes {
    id: string;
    name: string;
    code: string;
    elevation: number;
    latitud: number;
    longitude: number;
    country: string;
    countryCode: string;
    runways: Runways[];
    region: string;
    city: string;
}

interface AirportCreationAttributes extends AirportAttributes {}

class Airport extends Model<AirportAttributes, AirportCreationAttributes> implements AirportAttributes {
  public id!: string;
  public name!: string;
  public code!: string;
  public elevation!: number;
  public latitud!: number;
  public longitude!: number;
  public country!: string;
  public countryCode!: string;
  public runways!: Runways[];
  public region!: string;
  public city!: string

  static associate(models: Models) {
    // Define the association here
    Airport.hasMany(models.PhotoModel, {
        foreignKey: 'airport_id', // Foreign key in the PhotoModel
    });
    Airport.belongsToMany(models.AirlineModel, {
      through: "AirlineAirport",
      foreignKey: "airport_id",
    });
  }
  


  public static initialize(sequelize: Sequelize) {
    Airport.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        elevation: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        latitud: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        longitude: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },country: {
          type: DataTypes.STRING,
          allowNull: false,
        },countryCode: {
          type: DataTypes.STRING,
          allowNull: false,
        },runways: {
          type: DataTypes.ARRAY(DataTypes.JSONB),
          allowNull: false
        },region: {
          type: DataTypes.STRING,
          allowNull: false
        },city: {
          type: DataTypes.STRING,
          allowNull: false
        }          
      },
      {
        sequelize,
        modelName: "Airport", // This should match the name you want for your table
        timestamps: false,
      }
    );
  }
}
  
export default Airport;
