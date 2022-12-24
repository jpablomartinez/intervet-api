import { DataTypes, Model } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import Veterinary from '../../../../core/veterinary/model';
import { sequelize } from '../db_instance';

class VeterinaryModel extends Model<Veterinary> implements Veterinary {
  public vet_id!: string;
  public contact_method!: number;
  public work_phone!: string;
  public rating!: number;
  public about_me!: string;
  public to_home_value!: number;
  public po_to_home_value!: number;
  public favorites_amount!: number;
  public calculate_rating!: number;
  public best_comment!: string;
  public is_validated!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

VeterinaryModel.init(
  {
    vet_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    contact_method: {
      allowNull: false,
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    work_phone: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: ''
    },
    rating: {
      allowNull: true,
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    about_me: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    to_home_value: {
      allowNull: false,
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    po_to_home_value: {
      allowNull: false,
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    favorites_amount: {
      allowNull: true,
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    calculate_rating: {
      allowNull: true,
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    best_comment: {
      allowNull: true,
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    is_validated: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: 'vets',
    sequelize
  }
);

export default VeterinaryModel;
