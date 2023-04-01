import { DataTypes, Model } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import Auth from '../../../../core/auth/model';
import { UserState } from '../../../../utils/user_state';
import { UserTypes } from '../../../../utils/user_types';
import { sequelize } from '../db_instance';

class AuthModel extends Model<Auth> implements Auth {
  public auth_id?: string;
  public email!: string;
  public password!: string;
  public user_type!: UserTypes;
  public user_state!: UserState;
  public user_id!: string;
  public refresh_token!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AuthModel.init(
  {
    auth_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV1
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_type: {
      allowNull: false,
      type: DataTypes.ENUM({
        values: ['PetOwner', 'Veterinary', 'Admin']
      })
    },
    user_state: {
      allowNull: false,
      type: DataTypes.ENUM({
        values: ['ToValidated', 'Active', 'Suspended', 'Deleted']
      })
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
      unique: true      
    },
    refresh_token: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: ''
    }
  },
  {
    tableName: 'auth',
    sequelize
  }
);

export default AuthModel;
