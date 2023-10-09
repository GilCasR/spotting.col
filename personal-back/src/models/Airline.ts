import { Sequelize, Model, DataTypes } from "sequelize";
//import { AircraftPhoto } from "../db"; // Adjust the path to match your project structure


interface AirlineAttributtes {
    id: string;
    name: string;
    foundation: number;
    skyTrax_rating: number;
    iata_code: string;
    main_office: string;
    country: string;
    country_code: string;
    logo: string;
}

class Airline extends Model<AirlineAttributtes> implements AirlineAttributtes{
    public id!: string;
    public name!: string;
    public foundation!: number;
    public skyTrax_rating!: number;
    public iata_code!: string;
    public main_office!: string;
    public country!: string;
    public country_code!: string;
    public logo!: string;

    // static associate(models: Models) {
    // }

    public static initialize(sequelize: Sequelize) {
        Airline.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },name: {
                type: DataTypes.STRING,
                allowNull: false
            },foundation: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },skyTrax_rating: {
                type: DataTypes.INTEGER,
                allowNull: false
            },iata_code: {
                type: DataTypes.STRING,
                allowNull: false
            },main_office: {
                type: DataTypes.STRING,
                allowNull: false
            },country: {
                type: DataTypes.STRING,
                allowNull: false
            },country_code: {
                type: DataTypes.STRING,
                allowNull: false
            },logo: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
          sequelize,
          modelName: "Airline", // This should match the name you want for your table
          timestamps: false,
        }
        )
    }
} 

export default Airline