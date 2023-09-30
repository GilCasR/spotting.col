import { Sequelize, Model, DataTypes } from "sequelize";
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

interface AircraftTypeAttributes {
    id: string;
    model: string;
    max_speed_knots: number;
    ceiling_ft: number;
    gross_weight_lbs: number;
    length_ft: number; 
    height_ft: number;
    wing_span_ft: number;
    range_nautical_miles: number;
}

interface AircraftCreationAttributes extends AircraftTypeAttributes {}

class AircraftType extends Model<AircraftTypeAttributes, AircraftCreationAttributes> implements AircraftTypeAttributes {
    public id!: string;
    public model!: string;
    public max_speed_knots!: number;
    public ceiling_ft!: number;
    public gross_weight_lbs!: number;
    public length_ft!: number;
    public height_ft!: number;
    public wing_span_ft!: number;
    public range_nautical_miles!: number;

  
    // You can also define class methods and other properties here if needed
  
    // Define associations, validations, etc., if necessary
  
    // This static method initializes the model and defines the schema
    public static initialize(sequelize: Sequelize) {
        AircraftType.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          model: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          max_speed_knots: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          ceiling_ft: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          gross_weight_lbs: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          length_ft: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },height_ft: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },wing_span_ft: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },range_nautical_miles: {
            type: DataTypes.INTEGER,
            allowNull: false
          }        
        },
        {
          sequelize,
          modelName: "AircraftType", // This should match the name you want for your table
          timestamps: false,
        }
      );
    }
  }
  
export default AircraftType;
