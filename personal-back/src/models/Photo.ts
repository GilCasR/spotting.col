import { Sequelize, Model, DataTypes } from "sequelize";
import { HasMany, BelongsTo } from 'sequelize-typescript';
import { 
    Aircraft,
    Airport
} from "../db"; // Adjust the path to match your project structure

interface Models {
    AircraftModel: typeof Aircraft;
    AirportModel: typeof Airport;
}

interface PhotoAttributtes {
    id: string;
    photo_date: Date;
    views: number;
    likes: number;
    photo_description: string;
    link: string
}



class Photo extends Model<PhotoAttributtes> implements PhotoAttributtes{
    public id!: string;
    public photo_date!: Date;
    public views!: number;
    public likes!: number;
    public photo_description!: string
    public link!: string




    static associate(models: Models) {
        // Define the association here
        Photo.belongsTo(models.AircraftModel, {
            foreignKey: 'aircraft_id', // Foreign key in the PhotoModel
            as: 'Aircraft'
        });
        Photo.belongsTo(models.AirportModel, {
            foreignKey: 'airport_id', // Foreign key in the PhotoModel
        });
    }
    

    public static initialize(sequelize: Sequelize) {
        Photo.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },photo_date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },views: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },likes: {
                type: DataTypes.INTEGER,
                allowNull: false
            },photo_description: {
                type: DataTypes.STRING,
                allowNull: false
            },link: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
          sequelize,
          modelName: "Photo", // This should match the name you want for your table
          timestamps: false,
        }
        )
    }
} 

export default Photo