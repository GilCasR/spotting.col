import { Sequelize, Model, DataTypes } from "sequelize";
import { AircraftPhoto } from "../db"
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

interface Models {
    PhotoModel: typeof AircraftPhoto;
}


interface AircraftAttributes {
    id: string;
    registration: string;
    special_livery: boolean;
    type: string;
    aircraft_description: string;
}

interface AircraftCreationAttributes extends AircraftAttributes {}

class Aircraft extends Model<AircraftAttributes, AircraftCreationAttributes> implements AircraftAttributes {
    public id!: string;
    public registration!: string;
    public special_livery!: boolean;
    public type!: string;
    public aircraft_description!: string;

  
    // You can also define class methods and other properties here if needed
  
    // Define associations, validations, etc., if necessary

    static associate(models: Models) {
        // Define the one-to-many relationship
        Aircraft.hasMany(models.PhotoModel, { 
            foreignKey: 'aircraft_id' 
        }); // 'aircraft_id' should be the name of the foreign key column in the Photo table
    }
  
    // This static method initializes the model and defines the schema
    public static initialize(sequelize: Sequelize) {
        Aircraft.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },registration: {
            type: DataTypes.STRING,
            allowNull: false,
          },special_livery: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },type: {
            type: DataTypes.STRING,
            allowNull: false,
          },aircraft_description: {
            type: DataTypes.STRING,
            allowNull: false,
          } 
        },
        {
          sequelize,
          modelName: "Aircraft", // This should match the name you want for your table
          timestamps: false,
        }
      );
    }
  }
  
export default Aircraft;
