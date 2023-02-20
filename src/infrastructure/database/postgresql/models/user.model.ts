import { DataTypes, Model } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import IUser from '../../../../core/user/interface';
import { sequelize } from '../db_instance';

class UserModel extends Model<IUser> implements IUser {
  public user_id: string | undefined;
  public name!: string;
  public last_name!: string;
  public rut!: string;
  public phone!: string;
  public address!: Json;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    user_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV1
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
      defaultValue: ''
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
      defaultValue: DataTypes.STRING
    },
    rut: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.STRING,
      unique: true,
      defaultValue: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
      defaultValue: DataTypes.STRING
    },
    address: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.JSON,
      unique: false,
      defaultValue: DataTypes.STRING
    }
  },
  {
    tableName: 'users',
    sequelize
  }
);

export default UserModel;
