import { DataTypes, Model } from 'sequelize';
import VetHistory from '../../../../core/vets_histories/model';
import { sequelize } from '../db_instance';
import VeterinaryModel from './veterinary.model';

class VetsHistoriesModel extends Model<VetHistory> implements VetHistory {
  public history_vet_id?: string | undefined;
  public vet_id!: string;
  public base_university!: string;
  public speciality!: string;
  public speciality_university!: string;
  public experience_years?: number;
  public work_history?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

VetsHistoriesModel.init(
  {
    history_vet_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV1
    },
    vet_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'vets',
        key: 'vet_id'
      },
      onDelete: 'cascade'
    },
    base_university: {
      allowNull: false,
      type: DataTypes.STRING
    },
    speciality_university: {
      allowNull: false,
      type: DataTypes.STRING
    },
    speciality: {
      allowNull: false,
      type: DataTypes.STRING
    },
    experience_years: {
      allowNull: true,
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    work_history: {
      allowNull: true,
      type: DataTypes.TEXT,
      defaultValue: ''
    }
  },
  {
    tableName: 'vets_histories',
    sequelize
  }
);

VetsHistoriesModel.hasOne(VeterinaryModel, {
  foreignKey: 'vet_id'
});

export default VetsHistoriesModel;
