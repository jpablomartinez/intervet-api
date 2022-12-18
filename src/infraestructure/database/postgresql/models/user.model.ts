import { DataTypes, Model } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import Address from '../../../../core/address/model';
import User from '../../../../core/user/model';
import { sequelize } from '../db_instance';

class UserModel extends Model<User> implements User {
  public user_id!: string;
  public name!: string;
  public last_name!: string;
  public rut!: string;
  public email!: string;
  public phone!: string;
  public address!: Json;
  public type!: number;
  public user_state!: number;

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
      defaultValue: ''
    },
    name: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.STRING,
      unique: false,
      defaultValue: ''
    },
    last_name: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
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
    email: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.STRING,
      unique: true,
      defaultValue: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
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
    },
    type: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.NUMBER,
      unique: false,
      defaultValue: 0
    },
    user_state: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.NUMBER,
      unique: false,
      defaultValue: 0
    }
  },
  {
    tableName: 'users',
    sequelize
  }
);

export default UserModel;
