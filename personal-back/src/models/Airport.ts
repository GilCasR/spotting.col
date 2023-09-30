import { Sequelize, Model, DataTypes } from "sequelize";
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
interface AirportAttributes {
    id: string;
    name: string;
    code: string;
}

interface AirportCreationAttributes extends AirportAttributes {}


class Airport extends Model<AirportAttributes, AirportCreationAttributes> implements AirportAttributes {
    public id!: string;
    public name!: string;
    public code!: string;
  
    // You can also define class methods and other properties here if needed
  
    // Define associations, validations, etc., if necessary
  
    // This static method initializes the model and defines the schema
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
          },
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
