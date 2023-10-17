import { Sequelize, Model, DataTypes } from "sequelize";

interface UserAttributtes {
    id: string;
    user_name: string;
    user_password: string;
    user_email: string;
    user_image: string;
    role: string;
    is_active: boolean
}



class User extends Model<UserAttributtes> implements UserAttributtes{

    public id!: string;
    public user_name!: string;
    public user_password!: string;
    public user_email!: string;
    public user_image!: string;
    public role!: string;
    is_active!: boolean;




    // static associate(models: Models) {
    //     // Define the association here
    // }
    

    public static initialize(sequelize: Sequelize) {
        User.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },user_name: {
                type: DataTypes.STRING,
                allowNull: false
            },user_password: {
                type: DataTypes.STRING,
                allowNull: false
            },user_email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },user_image: {
                type: DataTypes.STRING,
                allowNull: false,
            },role: {
                type: DataTypes.STRING,
                allowNull: false
            },is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
          sequelize,
          modelName: "User", // This should match the name you want for your table
          timestamps: false,
        }
        )
    }
} 

export default User