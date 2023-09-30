import { Sequelize, Model, DataTypes } from "sequelize";
import { Photo, Aircraft } from "../db";

interface AircraftPhotoAttributes {
    aircraft_id: string;
    photo_id: string;
}

class AircraftPhoto extends Model<AircraftPhotoAttributes> implements AircraftPhotoAttributes{
    public aircraft_id!: string;
    public photo_id!: string;

    public static initialize(sequelize: Sequelize) {
        AircraftPhoto.init({
            photo_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Photo,
                    key: "id"
                }
            },
            aircraft_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: Aircraft,
                    key: "id"
                }
            }
        },
        {
          sequelize,
          modelName: "AircraftPhoto", // This should match the name you want for your table
          timestamps: false,
        }
        )
    }
} 

export default AircraftPhoto